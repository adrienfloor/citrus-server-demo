// LAUCH WITH ENV-VARS-TEMPLATE VARIABLES + NODE

const mongoose = require('mongoose')
const fetch = require('node-fetch')
const base64 = require('base-64')
const mailchimp = require('@mailchimp/mailchimp_marketing')
const md5 = require('md5')
const Mailchimp = require('mailchimp-api-v3')
const fs = require('fs')
const User = require('../models/user')

const {
	addAccountToAudience,
	updateMemberTag
} = require('../services/mailchimp')

const {
	mongoUri,
	citrusWalletId,
	mangoPayApiUrl,
	mangoPayClientId,
	mangoPayApiKey,
	mailchimpApiKey,
	mailchimpListId
} = require('../config')

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
const lastBillingMonth = new Date().getMonth() === 0 ? 11 : new Date().getMonth() - 1
const lastBillingYear = new Date().getFullYear() - 1

console.log('Today is : ', today)
console.log('Last billing month was : ', lastBillingMonth)
console.log('Last billing year was : ', lastBillingYear)

const billUsers = async () => {

	try {
		// Fetch all monthly premium users to bill today
		const monthlyUsersToBill = await User.find({
			billingDate: today,
			lastBillingMonth,
			subscription: { $gte: 4, $lte: 5 }
		})
		console.log('')
		console.log('Number of monthly premium users to bill today : ', monthlyUsersToBill.length)
		console.log('')

		// Fetch all yearly premium users to bill today
		const yearlyUsersToBill = await User.find({
			billingDate: today,
			lastBillingMonth: new Date().getMonth(),
			lastBillingYear,
			subscription: { $gte: 49, $lte: 50 }
		})

		console.log('yearly premium users: ', yearlyUsersToBill)
		console.log('')
		console.log('Number of yearly premium users to bill today : ', yearlyUsersToBill.length)
		console.log('')

		const usersToBill = [ ...monthlyUsersToBill, ...yearlyUsersToBill ]

		// Loop on theses users and apply logic
		usersToBill.forEach(async (user) => {
			console.log('')
			console.log('user to bill username, email, and id : ', user.userName, user.email, user._id)
			console.log('')
			console.log('')
			console.log('user subscription : ', user.subscription)
			console.log('')
			handleSubscription(user)
		})
	} catch (e) {
		console.log('')
		console.log('e : ', e)
		console.log('')
		throw e
	}
}

const handleSubscription = async (user) => {

	const {
		subscription,
		MPUserId,
		email,
		MPRecurringPayinRegistrationId
	} = user

	// Step 1 : process mangopay payin MIT to user wallet
	createDirectPayinMIT(MPRecurringPayinRegistrationId, subscription)
	.then(res => {
		console.log('')
		console.log('Direct payin MIT status : ', res.Status)
		console.log('')
		if (res && res.errors || res && res.Status !== 'SUCCEEDED') {
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
				errors: res.errors ? JSON.stringify(res.errors) : JSON.stringify(res.ResultMessage)
			}
			fs.readFile('premium_billing_errors.json', function (err, data) {
				const json = JSON.parse(data)
				json.payin_errors.push(newError)

				fs.writeFile('premium_billing_errors.json', JSON.stringify(json), function (err, result) {
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
		} else {
			// Step 2 : transfer the subscription amount from user wallet to Citrus technical wallet
			transferFundsBetweenWallets(MPUserId, subscription)
			.then(res => {
				console.log('')
				console.log('Transfer funds between wallets status : ', res, res.Status)
				console.log('')
				if (res && res.errors || res && res.Status === 'FAILED') {
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
						errors: res.errors ? JSON.stringify(res.errors) : JSON.stringify(res.ResultMessage)
					}
					fs.readFile('premium_billing_errors.json', function (err, data) {
						const json = JSON.parse(data)
						json.transfer_errors.push(newError)

						fs.writeFile('premium_billing_errors.json', JSON.stringify(json), function (err, result) {
							if (err) console.log('error', err)
							if (err) console.log('file written', result)
						})
					})
				} else {
					// Successfully billed user
					// Update billing month and year of user
					user.lastBillingMonth = new Date().getMonth()
					user.lastBillingYear = new Date().getFullYear()
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
					errors: JSON.stringify(e)
				}
				fs.readFile('premium_billing_errors.json', function (err, data) {
					const json = JSON.parse(data)
					json.transfer_errors.push(newError)

					fs.writeFile('premium_billing_errors.json', JSON.stringify(json), function (err, result) {
						if (err) console.log('error', err)
						if (err) console.log('file written', result)
					})
				})
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
		fs.readFile('premium_billing_errors.json', function (err, data) {
			const json = JSON.parse(data)
			json.payin_errors.push(newError)

			fs.writeFile('premium_billing_errors.json', JSON.stringify(json), function (err, result) {
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

// Transfer funds between wallets ( to Citrus )

const transferFundsBetweenWallets = async (MPUserId, DebitedFunds) => {

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

// Execute
billUsers()
