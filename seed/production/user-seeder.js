const User = require('../../models/user')
const mongoose = require('mongoose')

// Heroku prod database
const databaseUrl = require('../../config').mongoUri
mongoose.connect(databaseUrl, {
	useNewUrlParser: true,
	// useCreateIndex: true,
	useUnifiedTopology: true
})

const addDays = days => {
	const newDate = new Date(new Date().setDate(new Date().getDate() + days)).setHours(new Date().getHours() + 2)
	return new Date(newDate)
}

const removeDays = days => {
	const newDate = new Date(new Date().setDate(new Date().getDate() - days)).setHours(new Date().getHours() + 2)
	return new Date(newDate)
}

const addHours = hours => {
	const newDate = new Date().setHours(new Date().getHours() + hours + 2)
	return new Date(newDate)
}

const getStartingTime = date => {
	const result = new Date(date).getHours()
	if (result === 0) {
		return 22
	}
	if (result === 1) {
		return 23
	}
	if (result === 2) {
		return 0
	}
	return result - 2
}

const users = [
	// ADRIEN FLOOR
	new User(
		{
			"_id": "5f412f4bdff0cd00046a07ce",
			"agreedTermsAndConditions": true,
			"averageFeeling": 4.5,
			"coachRating": 4,
			"hasSetUpZone": true,
			"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598635790/VonageApp/coachesAvatar/adrien-avatar.jpg",
			"sports": [
				{
					"type": "crossfit",
					"level": "intermediate"
				},
				{
					"type": "yoga",
					"level": "expert"
				},
				{
					"type": "calisthenics",
					"level": "intermediate"
				},
				{
					"type": "weightlifting",
					"level": "beginner"
				},
				{
					"type": "stretching",
					"level": "intermediate"
				},
				{
					"type": "hiit",
					"level": "expert"
				},
				{
					"type": "circuitTraining",
					"level": "expert"
				}
			],
			"bio": "Je suis passionné de sport et de fitness en général. Je pratique le triathlon et je suis un grand fan de vélo de route. Je fais aussi depuis des années beaucoup d'entrainements poids de corps et un peu de musculation",
			"isVerified": true,
			"coachingLanguagePreference": ['french'],
			"distanceMetricPreference": "kilometersAndKilos",
			"weightMetricPreference": "kilometersAndKilos",
			"basedOnLocationPreference": false,
			"activityReminderFrequency": null,
			"followers": [],
			"following": [],
			"sessions": [],
			"myReplays": [],
			"firstName": "Adrien",
			"lastName": "Floor",
			"userName": "Adrien Floor",
			"email": "adrien@thecitrusapp.com",
			"password": "$2a$10$7BRBXWA9gWUKJX/OBwvpru3vrsWBetk3A7KwTr2YE1Hh0etal.X6y",
			"subscription": 1,
			"__v": 2
		}
	),
	// JOHN DOE aka TEST USER
	new User(
		{
			"_id": "5f412f4bdff0cd00046a07cf",
			"agreedTermsAndConditions": true,
			"averageFeeling": 5,
			"coachRating": 5,
			"hasSetUpZone": true,
			"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1623317757/VonageApp/avatar/noun_avatar_2309777_jhlofy.png",
			"sports": [
				{
					"type": "crossfit",
					"level": "intermediate"
				},
				{
					"type": "yoga",
					"level": "expert"
				},
				{
					"type": "calisthenics",
					"level": "intermediate"
				},
				{
					"type": "weightlifting",
					"level": "beginner"
				},
				{
					"type": "stretching",
					"level": "intermediate"
				},
				{
					"type": "hiit",
					"level": "expert"
				},
				{
					"type": "circuitTraining",
					"level": "expert"
				}
			],
			"bio": "Salut je suis John Doe ! Passionné de triathlon, j'adore m'entraîner et coacher sur Citrus !",
			"isVerified": true,
			"coachingLanguagePreference": ['french'],
			"distanceMetricPreference": "kilometersAndKilos",
			"weightMetricPreference": "kilometersAndKilos",
			"basedOnLocationPreference": false,
			"activityReminderFrequency": null,
			"followers": [],
			"following": [
				{
					"_id": "5f412f4bdff0cd00046a07ce",
					"coachRating": 4,
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598635790/VonageApp/coachesAvatar/adrien-avatar.jpg",
					"sports": [
						{
							"type": "crossfit",
							"level": "intermediate"
						},
						{
							"type": "yoga",
							"level": "expert"
						},
						{
							"type": "calisthenics",
							"level": "intermediate"
						},
						{
							"type": "weightlifting",
							"level": "beginner"
						},
						{
							"type": "stretching",
							"level": "intermediate"
						},
						{
							"type": "hiit",
							"level": "expert"
						},
						{
							"type": "circuitTraining",
							"level": "expert"
						}
					],
					"numberOfFollowers": 1,
					"bio": "Je suis passionné de sport et de fitness en général. Je pratique le triathlon et je suis un grand fan de vélo de route. Je fais aussi depuis des années beaucoup d'entrainements poids de corps et un peu de musculation",
					"userName": "Adrien Floor"
				}
			],
			"sessions": [],
			"myReplays": [],
			"firstName": "John",
			"lastName": "Doe",
			"userName": "John Doe",
			"email": "johndoe@thecitrusapp.com",
			"password": "$2a$10$rogKmik5D0uoy/oCAzo/Oek4Cw4pKvz1ej6hrV1hEOVWs.5k9mRdq",
			"__v": 2
		}
	)
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