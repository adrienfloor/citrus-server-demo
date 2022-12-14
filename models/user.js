const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching')

const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			default: ''
		},
		lastName: {
			type: String,
			default: ''
		},
		userName: {
			type: String,
			unique: true
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		isVerified: {
			type: Boolean,
			// default: false
			default: true
		},
		isVerifiedCoach: {
			type: Boolean,
			default: false
		},
		hasSetUpZone: {
			type: Boolean,
			default: false
		},
		password: {
			type: String,
			required: true
		},
		avatarUrl: {
			type: String,
			default: 'https://res.cloudinary.com/dho1rqbwk/image/upload/v1623317757/VonageApp/avatar/noun_avatar_2309777_jhlofy.png'
		},
		sports: {
			type: Array,
			default: []
		},
		bio: {
			type: String,
			default: ''
		},
		coachingLanguagePreference: {
			type: Array,
			default: []
		},
		distanceMetricPreference: {
			type: String,
			default: 'kilometersAndKilos'
		},
		weightMetricPreference: {
			type: String,
			default: 'kilometersAndKilos'
		},
		basedOnLocationPreference: {
			type: Boolean,
			default: false
		},
		activityReminderFrequency: {
			type: Number,
			default: 30
		},
		followers: {
			type: Array,
			default: []
		},
		following: {
			type: Array,
			default: []
		},
		myReplays: {
			type: Array,
			default: [
				// {
				// 	_id: String,
				// 	coaching: Object,
				// 	boughtLive: Boolean,
				// 	boughtReplay: Boolean,
				// 	freeAccess: Boolean
				// }
			]
		},
		numberOfActivities: {
			type: Number,
			default: 0
		},
		totalLengthOfActivities: {
			type: Number,
			default: 0
		},
		numberOfDailyActivitiesInARow: {
			type: Number,
			default: 0
		},
		averageFeeling: {
			type: Number,
			default: 5
		},
		coachRating: {
			type: Number,
			default: 5
		},
		coachComments: {
			type: Array,
			default: []
		},
		numberOfCoachings: {
			type: Number,
			default: 0
		},
		totalLengthOfCoachings: {
			type: Number,
			default: 0
		},
		averageLengthOfCoaching: {
			type: Number,
			default: 0
		},
		coachingsTotalViewers: {
			type: Number,
			default: 0
		},
		coachingsTotalViews: {
			type: Number,
			default: 0
		},
		filters: {
			type: Object,
			default: {
				liveCategory: 'all',
				startingTime: [0, 23],
				level: 'all',
				focus: ['all'],
				duration: 'any',
				access: 'all'
			}
		},
		agreedTermsAndConditions: {
			type: Boolean,
			default: false
		},
		MPUserId: {
			type: String,
			default: ''
		},
		MPLegalUserId: {
			type: String,
			default: ''
		},
		automaticTopUp: {
			type: Boolean,
			default: false
		},
		subscription: {
			type: Number,
			default: null
		},
		billingDate: {
			type: Number,
			default: null
		},
		lastBillingMonth: {
			type: Number,
			default: null
		},
		lastBillingYear: {
			type: Number,
			default: null
		},
		isCoach: {
			type: Boolean,
			default: false
		},
		currentGains: {
			type: Number,
			default: 0
		},
		lifeTimeGains: {
			type: Number,
			default: 0
		},
		companyName: {
			type: String,
			default: ''
		},
		companyType: {
			type: String,
			default: ''
		},
		companyNumber: {
			type: String,
			default: ''
		},
		companyIban: {
			type: String,
			default: ''
		},
		companyAddress: {
			type: Object,
			default: {
				addressLine: '',
				zipCode: '',
				city: '',
				country: ''
			}
		},
		companyLegalStatus: {
			type: String,
			default: ''
		},
		isCompanySubjectToTax: {
			type: Boolean,
			default: null
		},
		lastCashOutDate: {
			type: Date,
			defaul: null
		},
		cashOutState: {
			type: Number,
			default: 0 // 0 if no demand, 1 if pending
		},
		countryOfResidence: {
			type: String,
			default: ''
		},
		nationality: {
			type: String,
			default: ''
		},
		birthday: {
			type: Date,
			default: null
		},
		creditCard: {
			type: Object,
			default: {
				alias: '',
				expirationDate: ''
			}
		},
		MPRecurringPayinRegistrationId: {
			type: String,
			default: ''
		},
		MPPayoutId: {
			type: String,
			default: ''
		},
		pastTransactionsIds: {
			type: Array,
			default: []
		},
		hasCreditCardFailed: {
			type: Boolean,
			default: false
		}
	}
)

UserSchema.plugin(mongoose_fuzzy_searching, {
	fields: ['userName', 'firstName', 'lastName']
})

const User = mongoose.model('user', UserSchema)
module.exports = User