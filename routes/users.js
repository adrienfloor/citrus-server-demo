const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const {
	jwtSecret,
	emailSecret,
	resetPasswordSecret
} = require('../config')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Coaching = require('../models/coaching')
const { response } = require('express')

const { sendMail } = require('../services/mailer')
const {
	addAccountToAudience,
	updateMemberTag
} = require('../services/mailchimp')

// REGISTER NEW USER
router.post('/', async (req, res) => {

	const {
		userName,
		email,
		password,
		agreedTermsAndConditions,
		language,
		isCoach
	} = req.body

	// SIMPLE VALIDATION
	if (
		!userName
		|| !email
		|| !password
	) {
		return res.status(400).json({ msg: 'Please enter all fields' })
	}

	// CHECK FOR EXISTING USER
		const user = await User.findOne({ email })
		if(user) return res.status(400).json({ msg: 'User already exists'})

		const userNameExists = await User.findOne({ userName })
		if (userNameExists) return res.status(400).json({ msg: 'Username already exists' })

		const newUser = new User({
			userName,
			email,
			password,
			agreedTermsAndConditions,
			isCoach
		})
		// CREATE SALT AND HASH
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash
				newUser.save()
					.then(user => {
						// CREATE AUTH TOKEN
						jwt.sign(
							{ id: user.id },
							jwtSecret,
							{ expiresIn: (3600*24*7) },
							(err, token) => {
								if(err) throw err;
								// ADDING NEW USER AS AN ACCOUNT TO MAILCHIMP AUDIENCE WITH USER TAG

								addAccountToAudience(userName, '', email, language)
								.then(() => {
									updateMemberTag(email, 'User', 'active')
									if(isCoach) {
										updateMemberTag(email, 'new coach', 'active')
									}
								})
								.catch(e => console.log(e))

								// SENDING EMAIL CONFIRMATION
								// jwt.sign(
								// 	{ id: user.id },
								// 	emailSecret,
								// 	{ expiresIn: (3600*24) },
								// 	(err, emailToken) => {
								// 		if (err) throw err;
								// 		sendMail(
								// 			user.email,
								// 			'WELCOME TO CITRUS',
								// 			`<div>
								// 				Glad you joined the party, please verify your account by clicking this link :
								// 					<a href='https://mobile-app-server-v1.herokuapp.com/api/confirmation/${emailToken}'>
								// 						https://thecitrusapp.com/confirmation/${emailToken}
								// 					</a>
								// 			</div>`
								// 		).catch(e => console.log(e))
								// 	}
								// )
								return res
								.json({
									token,
									user: {
										_id: user.id,
										firstName: user.firstName,
										lastName: user.lastName,
										userName: user.userName,
										email: user.email,
										avatarUrl: user.avatarUrl,
										sports: user.sports,
										coachingSports: user.coachingSports,
										bio: user.bio,
										coachingLanguagePreference: user.coachingLanguagePreference,
										weightMetricPreference: user.weightMetricPreference,
										distanceMetricPreference: user.distanceMetricPreference,
										basedOnLocationPreference: user.basedOnLocationPreference,
										followers: user.followers,
										following: user.following,
										numberOfCoachings: user.numberOfCoachings,
										totalLengthOfCoachings: user.totalLengthOfCoachings,
										averageLengthOfCoaching: user.averageLengthOfCoaching,
										coachingsTotalViewers: user.coachingsTotalViewers,
										coachingsTotalViews: user.coachingsTotalViews,
										activityReminderFrequency: user.activityReminderFrequency,
										hasSetUpZone: user.hasSetUpZone,
										filters: user.filters,
										coachRating: user.coachRating,
										averageFeeling: user.averageFeeling,
										numberOfActivities: user.numberOfActivities,
										totalLengthOfActivities: user.totalLengthOfActivities,
										numberOfDailyActivitiesInARow: user.numberOfDailyActivitiesInARow,
										credits: user.credits,
										automaticTopUp: user.automaticTopUp,
										agreedTermsAndConditions: user.agreedTermsAndConditions,
										MPUserId: user.MPUserId,
										MPLegalUserId: user.MPLegalUserId,
										subscription: user.subscription,
										billingDate: user.billingDate,
										lastBillingMonth: user.lastBillingMonth,
										lastBillingYear: user.lastBillingYear,
										myReplays: user.myReplays,
										isCoach: user.isCoach,
										companyName: user.companyName,
										companyType: user.companyType,
										companyAddress: user.companyAddress,
										isCompanySubjectToTax: user.isCompanySubjectToTax,
										companyLegalStatus: user.companyLegalStatus,
										companyNumber: user.companyNumber,
										companyIban: user.companyIban,
										cashOutState: user.cashOutState,
										lastCashOutDate: user.lastCashOutDate,
										lifeTimeGains: user.lifeTimeGains,
										currentGains: user.currentGains,
										countryOfResidence: user.countryOfResidence,
										nationality: user.nationality,
										birthday: user.birthday,
										creditCard: user.creditCard,
										MPRecurringPayinRegistrationId: user.MPRecurringPayinRegistrationId,
										pastTransactionsIds: user.pastTransactionsIds,
										MPPayoutId: user.MPPayoutId,
										hasCreditCardFailed: user.hasCreditCardFailed
									}
								})
							}
						)
					})
			})
		})
})

// SEND RESET PASSWORD LINK
router.post('/reset_password_link', async (req, res) => {

	const { email } = req.body

	// SIMPLE VALIDATION
	if (!email) {
		return res.status(400).json({ msg: 'User email is missing' })
	}

	// CHECK FOR EXISTING USER
	const user = await User.findOne({ email })
	if (!user) return res.status(400).json({ msg: 'User doesnt exist' })

	const {
		userName,
		firstName
	} = user

	const name = firstName.length>0 ? firstName : userName

	try {
		// SENDING RESET PASSWORD EMAIL
		jwt.sign(
			{ id: user._id },
			resetPasswordSecret,
			{ expiresIn: (3600 * 24) },
			(err, resetPasswordToken) => {
				if (err) throw err;
				sendMail(
					email,
					'Citrus Reset Password',
					`<div>
					Initiez un nouveau mot de passe en cliquant sur le lien suivant:
						<a href='http://app.thecitrusapp.com/reset_password?rpt=${resetPasswordToken}&userName=${name}}'>
							https://app.thecitrusapp.com/reset_password?rpt=${resetPasswordToken}
						</a>
					</div>`
				)
				.then(() => {
					return res.status(200).json({ msg: 'Email sent' })
				})
				.catch(e => {
					console.log(e)
					return res.status(500).json({ msg: 'Something went wrong' })
				})
			}
		)
	} catch(e) {
		console.log(e)
		return res.status(500).json({ msg: 'Something went wrong' })
	}
})

// RESET USER PASSWORD FROM EMAIL LINK
router.post('/reset_password', async (req, res) => {

	const { password, token } = req.body

	console.log('')
	console.log('')
	console.log('')
	console.log('password : ', password)
	console.log('')
	console.log('')
	console.log('')

	console.log('')
	console.log('')
	console.log('')
	console.log('token : ', token)
	console.log('')
	console.log('')
	console.log('')

	// CHECK FOR TOKEN
	if (!token) return res.status(401).json({ msg: 'No token, authorizaton denied' })
	if(!password) return res.status(400).json({ msg: 'No new password provided' })

	try {

		// VERIFY TOKEN
		const decoded = await jwt.verify(token, resetPasswordSecret)
		console.log('')
		console.log('')
		console.log('')
		console.log('decoded token : ', decoded)
		console.log('')
		console.log('')
		console.log('')

		// GET USER ID FROM DECODED TOKEN
		if (decoded) {
			User.findOne({ _id: decoded.id })
				.then(user => {
					if (!user) return res.status(404).json({ msg: 'User does not exist' })
					bcrypt.genSalt(10, (err, salt) => {
						bcrypt.hash(password, salt, (err, hash) => {
							if (err) throw err;
							user.password = hash
							user.save()
								.then(user => {
									console.log('')
									console.log('')
									console.log('')
									console.log('updated user with new password : ', user)
									console.log('')
									console.log('')
									console.log('')
									return res.status(201).json({ msg: 'Password successfully updated' })
								})
								.catch(e => {
									return res.status(500).json({ msg: 'Something went wrong while updating password' })
								})
						})
					})
				})
		}
	} catch (e) {
		res.json({ msg: 'Token is not valid' })
	}
})


// UPDATE USER PROPERTIES
router.put('/update_user', async (req, res) => {

	const { id , userName } = req.body

	try {
		const user = await User.findOne({ _id: id })
		if (!user) return res.status(404).json({ msg: 'User does not exist' })
		if(userName) {
			const alreadyExistingUser = await User.findOne({ userName })
			if (alreadyExistingUser && alreadyExistingUser._id != id) {
				return res.status(400).json({ msg: 'This username already exists' })
			}
		}
		if (user) {
			Object.keys(user.toJSON()).forEach((key, i) => {
				if (req.body[key] !== undefined) {
					user[key] = req.body[key]
				}
				if (i === (Object.keys(user.toJSON()).length) - 1) {
					user.save()
					.then(updatedUser => {
						return res.json(updatedUser)
					})
				}
			})
		}
	} catch (e) {
		res.json({ msg: 'Something went wrong finding the user in DB' })
	}
})

// UPDATE USER CREDENTIALS
router.put('/update_user_credentials', async (req, res) => {

	const { id, password, newPassword } = req.body
	try {
		const user = await User.findOne({ _id: id })
		if (!user) return res.status(404).json({ msg: 'User does not exist' })

		bcrypt.compare(password, user.password)
		.then(isMatch => {
			if (!isMatch) return res.status(403).json({ msg: 'Invalid password' })

			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newPassword, salt, (err, hash) => {
					if (err) throw err;
					user.password = hash
					user.save()
						.then(user => {
							jwt.sign(
								{ id: user.id },
								jwtSecret,
								{ expiresIn: (3600 * 24 * 7) },
								(err, token) => {
									if (err) throw err;
									return res.json({
										token
									})
								}
							)
						})
				})
			})

		})

	} catch (e) {
		res.json({ msg: 'Something went wrong finding the user in DB' })
	}
})

// CREATE FOLLOWER
router.put('/create_follower', async (req, res) => {

	const {
		follower,
		followee
	 } = req.body

	try {
		// Find and save into user following
		const userFollowing = await User.findOne({ _id: follower._id })
		if (!userFollowing) return res.status(404).json({ msg: 'User does not exist' })
		if (userFollowing) {
			const alreadyExists = userFollowing.following.find(
				user => user._id === followee._id
			)
			if (alreadyExists) {
				return res.status(400).send({ msg: 'Already following user' })
			}
			userFollowing.following = [
				...userFollowing.following,
				{
					_id: followee._id,
					userName: followee.userName,
					avatarUrl: followee.avatarUrl,
					coachRating: followee.coachRating,
					bio: followee.bio,
					sports: followee.sports,
					numberOfFollowers: followee.followers.length + 1
				}
			]
			await userFollowing.save()

			// Find and save into user followed
			const userFollowed = await User.findOne({ _id: followee._id })
			if (!userFollowed) return res.status(404).json({ msg: 'User does not exist' })
			if (userFollowed) {
				const alreadyExists = userFollowed.followers.find(
					user => user._id === follower._id
				)
				if (alreadyExists) {
					return res.status(400).send({ msg: 'Already followed by user' })
				}
				userFollowed.followers = [
					...userFollowed.followers,
					{
						_id: follower._id,
						userName: follower.userName,
						avatarUrl: follower.avatarUrl,
						coachRating: follower.coachRating,
						bio: follower.bio,
						sports: follower.sports,
						numberOfFollowers: follower.followers.length + 1
					}
				]
				await userFollowed.save()
				return res.status(201).send({ msg: 'New follower' })
			}
		}
	} catch (e) {
		console.log(e)
		res.json({ msg: 'Something went wrong finding the user in DB' })
	}
})

// DELETE FOLLOWER
router.delete('/delete_follower', async (req, res) => {

	const {
		followed_id,
		follower_id
	} = req.query

	try {
		// Find and save into user following
		const userFollowing = await User.findOne({ _id: follower_id})
		if (!userFollowing) return res.status(404).json({ msg: 'User does not exist' })
		if (userFollowing) {
			const updatedFollowing = userFollowing.following.filter(
				user => user._id !== followed_id
			)
			userFollowing.following = updatedFollowing
			await userFollowing.save()

			// Find and save into user followed
			const userFollowed = await User.findOne({ _id: followed_id })
			if (!userFollowed) return res.status(404).json({ msg: 'User does not exist' })
			if (userFollowed) {
				const updatedFollowers = userFollowed.followers.filter(
					user => user._id !== follower_id
				)
				userFollowed.followers = updatedFollowers
				await userFollowed.save()
				return res.status(201).send({ msg: 'User unfollow' })
			}
		}
	} catch (e) {
		console.log(e)
		res.json({ msg: 'Something went wrong finding the user in DB' })
	}
})

// GET USER NEXT ACTIVITIES

// router.get('/upcoming_activities', async (req, res) => {
// 	const { userId } = req.query
// 		const user = await User.findOne({ _id: userId })
// 		if (!user) return res.status(404).json({ msg: 'User does not exist' })
// 		if (user && user.activitiesIAttend.length > 0) {
// 			const activities = user.activitiesIAttend.filter(activity => {
// 				return new Date((activity.coaching || {}).startingDate).getTime() >= (new Date()).getTime()
// 			})

// 			activities
// 				.sort((a, b) => {
// 					return new Date(b.coaching.startingDate) - new Date(a.coaching.startingDate)
// 				})
// 				.reverse()

// 			let coachings = []
// 			const maxLength = activities.length > 10 ? 10 : activities.length
// 			for (let i = 0; i < maxLength; i++) {
// 				const coaching = await Coaching.findOne({ _id: activities[i]._id })
// 				if (coaching) {
// 					coachings.push(coaching)
// 				}
// 			}

// 			return res.send(coachings)
// 	} else {
// 		return res.send([])
// 	}
// })

// GET USER PAST ACTIVITIES

router.get('/past_activities', async (req, res) => {
	const { userId } = req.query
	const user = await User.findOne({ _id: userId })
	if (!user) return res.status(404).json({ msg: 'User does not exist' })
	if (user && user.myReplays.length > 0) {

		const fullActivities = user.myReplays
		fullActivities
			.sort((a, b) => {
				return new Date(b.coaching.startingDate) - new Date(a.coaching.startingDate)
			})
			.reverse()
		return res.send(fullActivities)
	} else {
		return res.send([])
	}
})

// GET USER REPLAYS

router.get('/user_replays', async (req, res) => {
	const { userId } = req.query
	const user = await User.findOne({ _id: userId })
	if (!user) return res.status(404).json({ msg: 'User does not exist' })
	if (user && user.myReplays.length > 0) {
		return res.send(user.myReplays)
	} else {
		return res.send([])
	}
})

module.exports = router