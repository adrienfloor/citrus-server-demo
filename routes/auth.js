const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const {
	jwtSecret,
	testUsers
} = require('../config')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Coaching = require('../models/coaching')
const auth = require('../middlewares/auth')

const { sendMail } = require('../services/mailer')

// LOGIN USER
router.post('/', (req, res) => {
	const { email, password } = req.body

	// SIMPLE VALIDATION
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' })
	}

	// CHECK FOR EXISTING USER
	User.findOne({ email })
		.then(user => {
			if(!user) return res.status(404).json({ msg: 'User does not exist' })
			if(user && !user.isVerified) return res.status(403).json({ msg: 'Please confirm your email' })

			const testUsersArray = testUsers.split(',')
			const isTestUser = testUsersArray.includes(email)

			// VALIDATE PASSWORD
			bcrypt.compare(password, user.password)
				.then(isMatch => {
					if(!isMatch) return res.status(403).json({ msg: 'Invalid credentials' });
					jwt.sign(
						{ id: user.id },
						jwtSecret,
						{ expiresIn: isTestUser ? 7200 : (3600 * 24 * 7) }, // if test user, token expires after two hours
						(err, token) => {
							if (err) throw err;
							return res.json({
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

// LOAD USER
router.get('/user', auth, (req, res) => {
	User.findById(req.user.id)
		.select('-password')
		.then(user => res.json(user))
})

// FETCH USER INFO
router.get('/user_info', (req, res) => {
	User.findOne({ _id: req.query.user_id })
		.select('-password')
		.then(user => res.json(user))
})

// DELETE USER
router.delete('/delete_user', (req, res) => {
	const { user_id } = req.query
		User.deleteOne({ _id: user_id })
		.then(() => {
			return res.status(200).send({ msg: 'User deleted' })
		})
		.catch(e => {
			console.log(e)
			res.json({ msg: e })
		})
})

// LOAD USER
router.get('/ping', (req, res) => {
	return res.status(200).send({msg: 'Waking up server'})
})

module.exports = router