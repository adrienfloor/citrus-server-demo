const User = require('../../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const password = 'Tom@thecitrusapp.com'
let tomEncryptedPassword

bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        console.log('This is the encrypted new hash : ', hash)
        tomEncryptedPassword = hash
    })
})

// Heroku dev database
const databaseUrl = require('../../config').mongoUri
mongoose.connect(databaseUrl, {
	useNewUrlParser: true,
	// useCreateIndex: true,
	useUnifiedTopology: true
})


const users = [
    // tom@thecitrusapp.com
	new User(
		{
			"id": "610df87a5fdd593404571ece",
			"firstName": "Tom",
			"lastName": "Citrus",
			"isVerified": true,
			"hasSetUpZone": false,
			"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1649926585/VonageApp/casampnxhbyu7ssjq7d2.jpg",
			"sports": [],
			"bio": "Salut c'est Tom, personal trainer et passionné de sport. Suivez-moi pour découvrir tous mes entraînements !",
			"coachingLanguagePreference": [],
			"distanceMetricPreference": "kilometersAndKilos",
			"weightMetricPreference": "kilometersAndKilos",
			"basedOnLocationPreference": false,
			"activityReminderFrequency": 30,
			"followers": [],
			"following": [],
			"myReplays": [],
			"numberOfActivities": 0,
			"totalLengthOfActivities": 0,
			"numberOfDailyActivitiesInARow": 0,
			"averageFeeling": 5,
			"coachRating": null,
			"numberOfCoachings": 0,
			"totalLengthOfCoachings": 0,
			"averageLengthOfCoaching": 0,
			"coachingsTotalViewers": 0,
			"coachingsTotalViews": 0,
			"agreedTermsAndConditions": true,
			"automaticTopUp": false,
			"subscription": null,
			"billingDate": null,
			"isCoach": true,
			"currentGains": 0,
			"lifeTimeGains": 0,
			"companyName": "",
			"companyType": "",
			"companyNumber": "",
			"companyIban": "",
			"companyAddress": { "addressLine": "", "zipCode": "", "city": "", "country": "" },
			"companyLegalStatus": "",
			"isCompanySubjectToTax": null,
			"cashOutState": 0,
			"countryOfResidence": "",
			"nationality": "",
			"userName_fuzzy": ["to", "tom", "om", "tom c", "tom c", "tom ci", "tom cit", "tom citr", "tom citru", "tom citrus", "citrus", "tru", "ci", "cit", "citr", "citru", "tom tru", "tom ci", "tom cit", "tom citr", "tom citru"],
			"firstName_fuzzy": ["tom", "to", "om"],
			"lastName_fuzzy": ["citrus", "ci", "cit", "citr", "citru"],
			"userName": "Tom Citrus",
			"email": "tom@thecitrusapp.com",
			"password": tomEncryptedPassword,
			"__v": 0
		}
	),
]

let done = 0
for (let i = 0; i < users.length; i++) {
	console.log('***************    ', i, '    *******************')
	users[i].save((err, result) => {
		console.log('ERR:', err)
		console.log('RESULT:', result)
		done++
		if (done === users.length) {
			exit()
		}
	})
}

const exit = () => {
	mongoose.disconnect()
}