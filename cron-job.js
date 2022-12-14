const User = require('./models/user')
const mongoose = require('mongoose')
const fetch = require('node-fetch')
const cron = require('node-cron')
const mailchimp = require('@mailchimp/mailchimp_marketing')
const md5 = require("md5")
const Mailchimp = require('mailchimp-api-v3')
const base64 = require('base-64')

const {
	apiUrl,
	mongoUri,
	mangoPayApiUrl,
	mangoPayClientId,
	mangoPayApiKey,
	citrusWalletId,
	mailchimpApiKey,
	mailchimpListId
} = require('./config')

const mailchimpApi = new Mailchimp(mailchimpApiKey)

mailchimp.setConfig({
	apiKey: mailchimpApiKey,
	server: 'us2'
})

// Heroku dev database
mongoose.connect(mongoUri, {
	useNewUrlParser: true,
	// useCreateIndex: true,
	useUnifiedTopology: true
})

const runUserPayments = async () => {
	const users = await User.find({})
	users.forEach(user => {

		const {
			_id,
			billingDate,
			subscription,
			MPUserId,
			automaticTopUp,
			myVideos,
			activitiesIHaveAttended,
			email
		} = user
		const today = new Date().getUTCDate()

		console.log(`USER : ${user.userName} : `)
		console.log(`_id : ${_id}`)
		console.log(`billingDate : ${billingDate}`)
		console.log(`subscription : ${subscription}`)
		console.log(`MPUserId : ${MPUserId}`)
		console.log(`automaticTopUp : ${automaticTopUp}`)
		console.log(`myVideos : ${myVideos}`)
		console.log(`activitiesIHaveAttended : ${activitiesIHaveAttended}`)
		console.log('')
		console.log('')

		let wallet = {}
		let walletId = ''
		let cardId = ''

		// if user is on subscription payment plan and his billing date is today
		if (MPUserId && subscription && billingDate && billingDate == today) {
			fetchWalletInfo(MPUserId)
				.then(walletFetched => {
					wallet = walletFetched
					walletId = walletFetched.Id
					fetchCardInfo(MPUserId)
						.then(card => {
							cardId = card.Id

							// distribute gains to the coaches this user consumed videos from during the past month

							if (activitiesIHaveAttended && activitiesIHaveAttended.length>0) {
								const numberOfReplayActivities = (activitiesIHaveAttended.filter(
									activity => activity.boughtReplay === true
								)).length
								console.log(`USER : ${user.userName}, numberOfReplayActivities: ${numberOfReplayActivities}`)
								const numberOfLiveActivities = (activitiesIHaveAttended.filter(
									activity => activity.boughtLive === true
								)).length
								console.log(`USER : ${user.userName}, numberOfLiveActivities: ${numberOfLiveActivities}`)
								console.log('')

								let liveActivityValue = (20 / (numberOfLiveActivities + numberOfReplayActivities * 2))
								let replayActivityValue = liveActivityValue * 2
								const citrusLiveCommission = liveActivityValue * 0.3
								const citrusReplayCommission = replayActivityValue * 0.3
								liveActivityValue = liveActivityValue - citrusLiveCommission
								replayActivityValue = replayActivityValue - citrusReplayCommission

								console.log(`USER : ${user.userName}, liveActivityValue: ${liveActivityValue}`)
								console.log(`USER : ${user.userName}, replayActivityValue: ${liveActivityValue}`)
								console.log(`USER : ${user.userName}, citrusLiveCommission: ${citrusLiveCommission}`)
								console.log(`USER : ${user.userName}, citrusReplayCommission: ${citrusReplayCommission}`)
								console.log('')

								activitiesIHaveAttended.forEach(activity => {
									console.log('')
									console.log('')
									console.log('')
									console.log(activitiesIHaveAttended)
									console.log('')
									console.log('')
									console.log('')
									fetchWalletInfo(activity.mangoPayCoachId)
									.then(coachWallet => {
										coachWalletId = coachWallet.Id
										if (activity.boughtReplay && !activity.freeAccess) {
											console.log(`USER : ${user.userName} transfering funds for replay coaching`)
											console.log(`userWalletId : ${walletId}, MPUserId : ${MPUserId}`)
											console.log(`coachWalletId : ${coachWalletId}`)
											console.log('')
											// transfer fee for replay coaching consumed by the user to the coach
											transferFundsBetweenWallets(
												MPUserId,
												replayActivityValue * 100, // times 100 because mangopay value is in cents
												walletId,
												coachWalletId
											)
												.catch(e => console.log(
													`error during membership fees distribution with user: ${MPUserId} and coach: ${activity.mangoPayCoachId}, error: ${e}`)
												)

											// transfer commission to citrus for replay coaching consumed by the user
											transferFundsBetweenWallets(
												MPUserId,
												citrusReplayCommission * 100, // times 100 because mangopay value is in cents
												walletId,
												citrusWalletId
											)
												.catch(e => console.log(
													`error during membership fees distribution with user: ${MPUserId} and Citrus wallet, error: ${e}`)
												)
										}
										if (activity.boughtLive && !activity.freeAccess) {
											console.log(`USER : ${user.userName} transfering funds for live coaching`)
											console.log(`userWalletId : ${walletId}, MPUserId : ${MPUserId}`)
											console.log(`coachWalletId : ${coachWalletId}`)
											console.log('')
											// transfer fee for live coaching consumed by the user to the coach
											transferFundsBetweenWallets(
												MPUserId,
												liveActivityValue * 100, // times 100 because mangopay value is in cents
												walletId,
												coachWalletId
											)
												.catch(e => console.log(
													`error during membership fees distribution with user: ${MPUserId} and coach: ${activity.mangoPayCoachId}, error: ${e}`)
												)

											// transfer commission to citrus for live coaching consumed by the user
											transferFundsBetweenWallets(
												MPUserId,
												citrusLiveCommission * 100, // times 100 because mangopay value is in cents
												walletId,
												citrusWalletId
											)
												.catch(e => console.log(
													`error during membership fees distribution with user: ${MPUserId} and Citrus wallet, error: ${e}`)
												)
										}
									})
								})
							}

							// process monthly payment

							if (walletId && cardId) {
								console.log(`USER : ${user.userName} money left in wallet : ${(wallet.Balance || {}).Amount}`)
								console.log('')
								console.log(wallet)
								// if there is still credits in the wallet before new billing, transfer it to Citrus wallet
								transferFundsBetweenWallets(
									MPUserId,
									wallet.Balance.Amount, // SHOULD WE MULTIPLY BY 100 HERE ?????
									walletId,
									citrusWalletId
								)
								.then(() => {
									createCardDirectPayin(
										MPUserId,
										MPUserId,
										walletId,
										20 * 100,
										0,
										'',
										cardId
									)
									.catch(e => console.log(`error during card direct payin with user: ${MPUserId}, error: ${e}`))
								})
									.catch(e => console.log(
										`error during membership fees distribution with user: ${MPUserId} and Citrus wallet, error: ${e}`)
									)
							}

						})
				})
		}

		// if user is a la carte && has automaticTopUp && and has one credit or less in his wallet
		// proceed to payment to top up the wallet

		if (!subscription && automaticTopUp && myVideos < 2) {
			console.log(`USER : ${user.userName} automatic topup`)
			console.log('')
			createCardDirectPayin(
				MPUserId,
				MPUserId,
				walletId,
				10 * 100,
				0,
				'',
				cardId
			)
			.catch(e => console.log(`error during automatic top up with user: ${MPUserId}, error: ${e}`))
			updateUser({ id: _id, myVideos: myVideos + 10 })
		}

		// if user is a la carte, doesn't have automatic top up and is down to zero credtit, we give him the Free User
		// tag in mailchimp
		if (!subscription && automaticTopUp && myVideos < 2) {
			console.log(`USER : ${user.userName} out of credit and no automatic top up, updating mailchimp tag`)
			console.log('')
			updateMemberTag(email, 'Free User', 'active')
			.catch(e => {
				console.log(`error updating mailchimp tag of user: ${MPUserId}, error: ${e}`)
			})
		}

	})
}

// RETURN WALLET INFO OF A USER

const fetchWalletInfo = async (UserId) => {

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/${mangoPayClientId}/users/${UserId}/wallets`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const wallets = await mpResponse.json()
		const wallet = wallets[wallets.length - 1]
		return wallet

	} catch (e) {
		console.log(e)
		return { msg: e }
	}
}

// RETURN CARD INFO OF A USER

const fetchCardInfo = async (UserId) => {

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/${mangoPayClientId}/users/${UserId}/cards`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const cards = await mpResponse.json()
		return cards[cards.length - 1]

	} catch (e) {
		console.log(e)
		return { msg: e }
	}
}

// CREATE CARD DIRECT PAYIN

const createCardDirectPayin = async (
	AuthorId,
	CreditedUserId,
	CreditedWalletId,
	DebitedFunds,
	Fees,
	SecureModeReturnURL,
	CardId
) => {

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/${mangoPayClientId}/payins/card/direct`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				AuthorId,
				CreditedUserId,
				CreditedWalletId,
				DebitedFunds,
				Fees,
				SecureModeReturnURL,
				CardId
			})
		})

		const payin = await mpResponse.json()
		return payin

	} catch (e) {
		console.log(e)
		return { msg: e }
	}
}

// TRANSFER FUNDS BETWEEN WALLETS

const transferFundsBetweenWallets = async (
	AuthorId,
	DebitedFunds,
	DebitedWalletId,
	CreditedWalletId
) => {

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/${mangoPayClientId}/transfers`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				AuthorId,
				DebitedFunds,
				DebitedWalletId,
				CreditedWalletId,
				Fees: 0
			})
		})

		const transfer = await mpResponse.json()
		return transfer

	} catch (e) {
		console.log(e)
		return { msg: e }
	}
}

const updateUser = async (userInfo) => {
	try {
		const response = await fetch(`${apiUrl}/users/update_user`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(userInfo)
		})

		const updatedUser = await response.json()
		return updatedUser

	} catch (e) {
		console.log(e)
		return { msg: e }
	}
}

async function updateMemberTag(email, tagName, tagStatus) {

	mailchimpApi.request({
		method: 'post',
		path: '/lists/{list_id}/members/{subscriber_hash}/tags',
		path_params: {
			list_id: mailchimpListId,
			subscriber_hash: md5(email.toLowerCase())
		},
		body: {
			tags: [{ name: tagName, status: tagStatus }]
		}
	})
		.then(function (result) {
			return result
		})
		.catch(function (err) {
			console.log('err', err)
			return err
		})

}

// cron.schedule('30 6 * * *', function () {
// 	console.log('running job every day at 6.30 am');
// 	runUserPayments()
// })

runUserPayments()