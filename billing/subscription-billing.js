const User = require('./models/user')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const base64 = require('base-64')
const mailchimp = require('@mailchimp/mailchimp_marketing')
const md5 = require("md5")
const Mailchimp = require('mailchimp-api-v3')
const fs = require('fs')

const {
	mongoUri,
	citrusWalletId,
	mangoPayApiUrl,
	mangoPayClientId,
	mangoPayApiKey,
	mailchimpApiKey,
	mailchimpListId
} = require('.././config')

const {
	addAccountToAudience,
	updateMemberTag
} = require('.././services/mailchimp')

const mailchimpApi = new Mailchimp(mailchimpApiKey)
mailchimp.setConfig({
	apiKey: mailchimpApiKey,
	server: 'us2'
})

mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	// useCreateIndex: true,
	useUnifiedTopology: true
})

const today = new Date().getDate()
const lastBillingMonth = new Date().getMonth() - 1

console.log('Today is : ', today)
console.log('last billing month was : ', lastBillingMonth)

const billUsers = async () => {

	try {
		// Fetch all users to bill today
		const usersToBill = await User.find({
			billingDate: today,
			lastBillingMonth
		})
		console.log('')
		console.log('Number of users to bill today : ', usersToBill.length)
		console.log('')

		// Loop on theses users and apply logic
		usersToBill.forEach(async(user) => {
			const credits = await returnUserCredits(user.MPUserId)
			console.log('')
			console.log('user to bill username, email, and id : ', user.userName, user.email, user._id)
			console.log('')
			console.log('')
			console.log('user subscription : ', user.subscription)
			console.log('')
			console.log('')
			console.log('user credits : ', credits)
			console.log('')
			if(user.subscription) {
				handleSubscription(
					user,
					credits
				)
			}
		})
	} catch (e) {
		console.log('')
		console.log('e : ', e)
		console.log('')
		throw e
	}
}

const handleSubscription = async (
	user,
	credits
) => {

	const {
		subscription,
		MPUserId,
		email,
		MPRecurringPayinRegistrationId
	} = user

	// Step 1 : process lost credits and credits roll over
	// Sending lost credits to Citrus and applying roll over according to subscription plan
	if(subscription == 20 || subscription == 30) {
		let rollOverAmount
		if (subscription == 30) {
			rollOverAmount = 10 // 30 credits per month subscription has a 10 credits roll over feature
		} else {
			rollOverAmount = 5 // 20 credits per month subscription has a 5 credits roll over feature
		}

		if (credits > rollOverAmount) {
			transferFundsBetweenWallets(
				MPUserId,
				credits - rollOverAmount
			)
				.then(res => {
					console.log('')
					console.log('Transfer funds between wallets status : ', res.Status)
					console.log('')
					if (res && res.errors) {
						console.log('')
						console.log('Transfer funds between wallets error : ', res.errors)
						console.log('')
						// Write error details in a local JSON file
						const newError = {
							date: new Date(),
							user_id: user._id,
							MPUserId,
							subscription,
							email,
							MPRecurringPayinRegistrationId,
							credits,
							errors: JSON.stringify(res.errors)
						}
						fs.readFile('subscription_billing_errors.json', function (err, data) {
							const json = JSON.parse(data)
							json.transfer_errors.push(newError)

							fs.writeFile('subscription_billing_errors.json', JSON.stringify(json), function (err, result) {
								if (err) console.log('error', err)
								if (err) console.log('file written', result)
							})
						})
					}
				})
				.catch(e => {
					console.log('')
					console.log('Transfer funds between wallets error : ', e)
					console.log('')
					// Write error details in a local JSON file
					const newError = {
						date: new Date(),
						user_id: user._id,
						MPUserId,
						subscription,
						email,
						MPRecurringPayinRegistrationId,
						credits,
						errors: JSON.stringify(e)
					}
					fs.readFile('subscription_billing_errors.json', function (err, data) {
						const json = JSON.parse(data)
						json.transfer_errors.push(newError)

						fs.writeFile('subscription_billing_errors.json', JSON.stringify(json), function (err, result) {
							if (err) console.log('error', err)
							if (err) console.log('file written', result)
						})
					})
				})
		}

	} else {
		// 10 credits per month subscription has a no credits roll over feature
		if(credits > 0) {
			transferFundsBetweenWallets(
				MPUserId,
				credits
			)
				.then(res => {
					console.log('')
					console.log('Transfer funds between wallets status : ', res.Status)
					console.log('')
					if(res && res.errors) {
						console.log('')
						console.log('Transfer funds between wallets error : ', res.errors)
						console.log('')
						// Write error details in a local JSON file
						const newError = {
							date: new Date(),
							user_id: user._id,
							MPUserId,
							subscription,
							email,
							MPRecurringPayinRegistrationId,
							credits,
							errors: JSON.stringify(res.errors)
						}
						fs.readFile('subscription_billing_errors.json', function (err, data) {
							const json = JSON.parse(data)
							json.transfer_errors.push(newError)

							fs.writeFile('subscription_billing_errors.json', JSON.stringify(json), function (err, result) {
								if (err) console.log('error', err)
								if (err) console.log('file written', result)
							})
						})
					}
				})
				.catch(e => {
					console.log('')
					console.log('Transfer funds between wallets error : ', e)
					console.log('')
					// Write error details in a local JSON file
					const newError = {
						date: new Date(),
						user_id: user._id,
						MPUserId,
						subscription,
						email,
						MPRecurringPayinRegistrationId,
						credits,
						errors: JSON.stringify(e)
					}
					fs.readFile('subscription_billing_errors.json', function (err, data) {
						const json = JSON.parse(data)
						json.transfer_errors.push(newError)

						fs.writeFile('subscription_billing_errors.json', JSON.stringify(json), function (err, result) {
							if (err) console.log('error', err)
							if (err) console.log('file written', result)
						})
					})
				})
		}
	}

	// Step 2 : process mangopay payin MIT to user wallet
	// Crediting user wallet from his own credit card (this is the monthly subscription payment)
	createDirectPayinMIT(
		MPRecurringPayinRegistrationId,
		subscription
	)
		.then(res => {
			console.log('')
			console.log('Direct payin MIT status : ', res.Status)
			console.log('')
			if(res && res.errors) {
				// Handle error somehow
				console.log('')
				console.log('Direct payin MIT error : ', res.errors)
				console.log('')

				// Write error details in a local JSON file
				const newError = {
					date: new Date(),
					user_id: user._id,
					MPUserId,
					subscription,
					email,
					MPRecurringPayinRegistrationId,
					errors: JSON.stringify(res.errors)
				}
				fs.readFile('subscription_billing_errors.json', function (err, data) {
					const json = JSON.parse(data)
					json.payin_errors.push(newError)

					fs.writeFile('subscription_billing_errors.json', JSON.stringify(json), function (err, result) {
						if (err) console.log('error', err)
						if (err) console.log('file written', result)
					})
				})
				// Give user the 'subscription billing failed' tag in Mailchimp
				updateMemberTag(email, 'subscription billing failed', 'active')
				// Set error property to true for user so that we can display it in the app
				user.hasCreditCardFailed = true
				user.save((err, result) => {
					console.log('Error on saving user :', err)
					if(result) {
						console.log('User updated : ', result.userName, result.email, result._id)
					}
					return 500
				})

			} else {
				// Update billing month of user
				user.lastBillingMonth = new Date().getMonth()
				user.save((err, result) => {
					console.log('Error on saving user :', err)
					if (result) {
						console.log('User updated : ', result.userName, result.email, result._id)
					}
					return 201
				})
			}
		})
		.catch(e => {
			// Handle error somehow
			console.log('')
			console.log('Direct payin MIT error : ', e)
			console.log('')

			// Write error details in a local JSON file
			const newError = {
				date: new Date(),
				user_id: user._id,
				MPUserId,
				subscription,
				email,
				MPRecurringPayinRegistrationId,
				errors: JSON.stringify(e)
			}
			fs.readFile('subscription_billing_errors.json', function (err, data) {
				const json = JSON.parse(data)
				json.payin_errors.push(newError)

				fs.writeFile('subscription_billing_errors.json', JSON.stringify(json), function (err, result) {
					if (err) console.log('error', err)
					if (err) console.log('file written', result)
				})
			})

			// Give user the 'subscription billing failed' tag in Mailchimp
			updateMemberTag(email, 'subscription billing failed', 'active')
			// Set error property to true for user so that we can display it in the app
			user.hasCreditCardFailed = true
			user.save((err, result) => {
				console.log('Error on saving user :', err)
				if (result) {
					console.log('User updated : ', result.userName, result.email, result._id)
				}
				return 500
			})
		})
}

// Return user credits

const returnUserCredits = async (MPUserId) => {

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${MPUserId}/wallets`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const wallets = await mpResponse.json()
		const wallet = wallets[wallets.length - 1]
		let balance = wallet && wallet.Balance ? wallet.Balance.Amount : 0
		return JSON.stringify(balance / 100)
	} catch (e) {
		console.log(e)
		return { errors: e }
	}
}


// Transfer funds between wallets ( to Citrus )

const transferFundsBetweenWallets = async (
		MPUserId,
		DebitedFunds
	) => {

	try {
		const userWalletResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${MPUserId}/wallets`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const userWallets = await userWalletResponse.json()
		const userWallet = userWallets[userWallets.length - 1]
		const userWalletId = (userWallet || {}).Id

		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/transfers`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				"AuthorId": MPUserId,
				"DebitedFunds": {
					"Amount": DebitedFunds * 100,
					"Currency": 'EUR'
				},
				"Fees": {
					"Amount": 0,
					"Currency": 'EUR'
				},
				"DebitedWalletId": userWalletId,
				"CreditedWalletId": citrusWalletId
			})
		})

		const transfer = await mpResponse.json()
		return transfer

	} catch (e) {
		console.log(e)
		return { errors: e }
	}
}

// Create a Recurring PayIn MIT

const createDirectPayinMIT = async (
	RecurringPayinRegistrationId,
	DebitedFunds
) => {

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/payins/recurring/card/direct`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				RecurringPayinRegistrationId,
				"DebitedFunds": {
					"Amount": DebitedFunds * 100,
					"Currency": "EUR"
				},
				"StatementDescriptor": 'Citrus App'
			})
		})

		const recurringPayinMIT = await mpResponse.json()
		return recurringPayinMIT

	} catch (e) {
		console.log(e)
		return { errors: e }
	}
}

	// Execute
	billUsers()
