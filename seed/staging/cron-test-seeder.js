const User = require('../../models/user')
const mongoose = require('mongoose')

// Heroku dev database
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
	// KARINA KLOP
	new User(
		{
			"_id": "5f4427e06cc26300049d666b",
			agreedTermsAndConditions: true,
			averageFeeling: 4.5,
			"coachRating": 5,
			"hasSetUpZone": true,
			"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598303779/VonageApp/coachesAvatar/karina-avatar.jpg",
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
					"type": "circuit Training",
					"level": "expert"
				}
			],
			"bio": "I'm Karina from Sweden. Passionate about sports, I'm an experienced personal fitness coach that will help you reach your goals in no time.",
			"isVerified": true,
			"coachingLanguagePreference": [
				"french",
				"english"
			],
			"distanceMetricPreference": "kilometers",
			"weightMetricPreference": "kg",
			"basedOnLocationPreference": false,
			"activityReminderFrequency": 60,
			"followers": [
				{
					"userName": "Kamilla Lou",
					"coachRating": 4.8,
					"_id": "5f456b93deb03a000469f576",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598303778/VonageApp/coachesAvatar/kamilla-avatar.jpg",
					"bio": "Hey c\u2019est Kamilla 😃\nJ\u2019habite Paris et suis spécialiste en prépa physique, prépa mentale, mais aussi en nutrition.\nJe m\u2019intéresse énormément à l\u2019ostéopathie, pratique sur laquelle je peux vous apprendre beaucoup de choses ...\nA bientôt 💪🏾🧠🥦",
					"sports": [
						{
							"type": "yoga",
							"level": "expert"
						},
						{
							"type": "running",
							"level": "beginner"
						},
						{
							"type": "meditation",
							"level": "expert"
						},
						{
							"type": "weightlifting",
							"level": "expert"
						},
						{
							"type": "circuit Training",
							"level": "intermediate"
						}
					]
				},
				{
					"userName": "Jimmy Ducan",
					"coachRating": 4.6,
					"_id": "5f456523deb03a000469f572",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598303777/VonageApp/coachesAvatar/jimmy-avatar.jpg",
					"bio": "My name is Jimmy. I'm a triathlete from Austin Texas. My one and only goal is to improve my personal records training as hard as I can... Follow me on that journey !",
					"sports": [
						{
							"type": "running",
							"level": "expert"
						},
						{
							"type": "yoga",
							"level": "beginner"
						},
						{
							"type": "calisthenics",
							"level": "intermediate"
						},
						{
							"type": "weightlifting",
							"level": "intermediate"
						},
						{
							"type": "cycling",
							"level": "expert"
						},
						{
							"type": "swimming",
							"level": "expert"
						},
						{
							"type": "circuit Training",
							"level": "intermediate"
						}
					]
				}
			],
			"following": [
				{
					"userName": "Kamilla Lou",
					"coachRating": 4.8,
					"_id": "5f456b93deb03a000469f576",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598303778/VonageApp/coachesAvatar/kamilla-avatar.jpg",
					"bio": "Hey c\u2019est Kamilla 😃\nJ\u2019habite Paris et suis spécialiste en prépa physique, prépa mentale, mais aussi en nutrition.\nJe m\u2019intéresse énormément à l\u2019ostéopathie, pratique sur laquelle je peux vous apprendre beaucoup de choses ...\nA bientôt 💪🏾🧠🥦",
					"sports": [
						{
							"type": "yoga",
							"level": "expert"
						},
						{
							"type": "running",
							"level": "beginner"
						},
						{
							"type": "meditation",
							"level": "expert"
						},
						{
							"type": "weightlifting",
							"level": "expert"
						},
						{
							"type": "circuit Training",
							"level": "intermediate"
						}
					]
				},
				{
					"userName": "Jimmy Ducan",
					"coachRating": 4.6,
					"_id": "5f456523deb03a000469f572",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598303777/VonageApp/coachesAvatar/jimmy-avatar.jpg",
					"bio": "My name is Jimmy. I'm a triathlete from Austin Texas. My one and only goal is to improve my personal records training as hard as I can... Follow me on that journey !",
					"sports": [
						{
							"type": "running",
							"level": "expert"
						},
						{
							"type": "yoga",
							"level": "beginner"
						},
						{
							"type": "calisthenics",
							"level": "intermediate"
						},
						{
							"type": "weightlifting",
							"level": "intermediate"
						},
						{
							"type": "cycling",
							"level": "expert"
						},
						{
							"type": "swimming",
							"level": "expert"
						},
						{
							"type": "circuit Training",
							"level": "intermediate"
						}
					]
				}
			],
			"activitiesIAttend": [
				{
					_id: "5f456609deb03a000469f574",
					"startingDate": addDays(5)
				},
				{
					_id: "5f45665ddeb03a000469f575",
					"startingDate": addDays(1)
				},
				{
					_id: "5f456d3cdeb03a000469f577",
					"startingDate": addDays(2)
				},
				{
					_id: "5f456d87deb03a000469f578",
					"startingDate": addDays(1)
				},
				{
					_id: "5f456dbadeb03a000469f579",
					"startingDate": addDays(30)
				},
				{
					_id: "4f456609deb03a000469f574",
					"startingDate": removeDays(3),
					"boughtReplay": true
				},
				{
					_id: "3f456609deb03a000469f574",
					"startingDate": removeDays(7),
					"boughtReplay": true
				},
				{
					_id: "2f456609deb03a000469f574",
					"startingDate": removeDays(15),
					"boughtReplay": true
				}
			],
			"myReplays": [
				{
					_id: "3f456609deb03a000469f574",
					mangoPayCoachId: "100480447",
					coachId: "5f456523deb03a000469f572",
					startingDate: '',
					freeAccess: false,
					price: 2
				},
				{
					_id: "5f456b93deb03a000469f579",
					mangoPayCoachId: "100477348",
					coachId: "5f456523deb03a000469f572",
					startingDate: '',
					boughtLive: false,
					boughtReplay: true,
					freeAccess: false
				},
				{
					_id: "5f456b93deb03a000469f577",
					mangoPayCoachId: "100477348",
					coachId: "5f456523deb03a000469f572",
					startingDate: '',
					freeAccess: false,
					price: 2
				},
				{
					_id: "5f456b93deb03a000469f577",
					mangoPayCoachId: "100477348",
					coachId: "5f456523deb03a000469f572",
					startingDate: '',
					freeAccess: false,
					price: 2
				}
			],
			"sessions": [],
			"firstName": "Karina",
			"lastName": "Klop",
			"userName": "Karina Klop",
			"email": "karina@thecitrusapp.com",
			"password": "$2a$10$DvsF2j2aJ7Uq0dCdT.Gj2ur43FmpTGLevrNHGDEDbAL5LvGXP4SdO",
			"numberOfCoachings": 122,
			"totalLengthOfCoachings": 4880,
			"averageLengthOfCoaching": 40,
			"coachingsTotalViewers": 11400,
			"coachingsTotalViews": 36600,
			"numberOfActivities": 18,
			"totalLengthOfActivities": 720,
			"MPUserId": "97679436",
			"MPLegalUserId": "100493463",
			"myVideos": 20,
			"subscription": 1,
			"automaticTopUp": false,
			"billingDate": new Date().getUTCDate(),
			"__v": 3
		}
	),
	// JIMMY Ducan
	new User(
		{
			"_id": "5f456523deb03a000469f572",
			agreedTermsAndConditions: true,
			averageFeeling: 5,
			"coachRating": 4.6,
			"hasSetUpZone": true,
			"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598303777/VonageApp/coachesAvatar/jimmy-avatar.jpg",
			"sports": [
				{
					"type": "running",
					"level": "expert"
				},
				{
					"type": "yoga",
					"level": "beginner"
				},
				{
					"type": "calisthenics",
					"level": "intermediate"
				},
				{
					"type": "weightlifting",
					"level": "intermediate"
				},
				{
					"type": "cycling",
					"level": "expert"
				},
				{
					"type": "swimming",
					"level": "expert"
				},
				{
					"type": "circuit Training",
					"level": "intermediate"
				}
			],
			"bio": "My name is Jimmy. I'm a triathlete from Austin Texas. My one and only goal is to improve my personal records training as hard as I can... Follow me on that journey !",
			"isVerified": true,
			"coachingLanguagePreference": [
				"english"
			],
			"distanceMetricPreference": "miles",
			"weightMetricPreference": "lbs",
			"basedOnLocationPreference": false,
			"activityReminderFrequency": 30,
			"followers": [
				{
					"userName": "Kamilla Lou",
					"coachRating": 4.8,
					"_id": "5f456b93deb03a000469f576",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598303778/VonageApp/coachesAvatar/kamilla-avatar.jpg",
					"bio": "Hey c\u2019est Kamilla 😃\nJ\u2019habite Paris et suis spécialiste en prépa physique, prépa mentale, mais aussi en nutrition.\nJe m\u2019intéresse énormément à l\u2019ostéopathie, pratique sur laquelle je peux vous apprendre beaucoup de choses ...\nA bientôt 💪🏾🧠🥦",
					"sports": [
						{
							"type": "yoga",
							"level": "expert"
						},
						{
							"type": "running",
							"level": "beginner"
						},
						{
							"type": "meditation",
							"level": "expert"
						},
						{
							"type": "weightlifting",
							"level": "expert"
						},
						{
							"type": "circuit Training",
							"level": "intermediate"
						}
					]
				}
			],
			"following": [
				{
					"userName": "Karina Klop",
					"coachRating": 5,
					"_id": "5f4427e06cc26300049d666b",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598303779/VonageApp/coachesAvatar/karina-avatar.jpg",
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
							"type": "circuit Training",
							"level": "expert"
						}
					],
					"bio": "I'm Karina from Sweden. Passionate about sports, I'm an experienced personal fitness coach that will help you reach your goals in no time.",
				},
				{
					"userName": "Kamilla Lou",
					"coachRating": 4.8,
					"_id": "5f456b93deb03a000469f576",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598303778/VonageApp/coachesAvatar/kamilla-avatar.jpg",
					"bio": "Hey c\u2019est Kamilla 😃\nJ\u2019habite Paris et suis spécialiste en prépa physique, prépa mentale, mais aussi en nutrition.\nJe m\u2019intéresse énormément à l\u2019ostéopathie, pratique sur laquelle je peux vous apprendre beaucoup de choses ...\nA bientôt 💪🏾🧠🥦",
					"sports": [
						{
							"type": "yoga",
							"level": "expert"
						},
						{
							"type": "running",
							"level": "beginner"
						},
						{
							"type": "meditation",
							"level": "expert"
						},
						{
							"type": "weightlifting",
							"level": "expert"
						},
						{
							"type": "circuit Training",
							"level": "intermediate"
						}
					]
				},
			],
			"activitiesIAttend": [],
			"myReplays": [
				{
					_id: "3f456609deb03a000469f574",
					mangoPayCoachId: "100493463",
					coachId: "5f4427e06cc26300049d666b",
					startingDate: '',
					freeAccess: false,
					price: 2
				},
				{
					_id: "5f456b93deb03a000469f579",
					mangoPayCoachId: "100477348",
					coachId: "5f456523deb03a000469f572",
					startingDate: '',
					freeAccess: false,
					price: 2
				},
				{
					_id: "5f456b93deb03a000469f577",
					mangoPayCoachId: "100477348",
					coachId: "5f456523deb03a000469f572",
					startingDate: '',
					freeAccess: false,
					price: 2
				},
				{
					_id: "5f456b93deb03a000469f577",
					mangoPayCoachId: "100477348",
					coachId: "5f456523deb03a000469f572",
					startingDate: '',
					freeAccess: false,
					price: 2
				}
			],
			"sessions": [],
			"firstName": "Jimmy",
			"lastName": "Ducan",
			"userName": "Jimmy Ducan",
			"email": "jimmy@thecitrusapp.com",
			"password": "$2a$10$.5UCMtIzRYiij.tntZSdneZyx4ymekDy2LaovKxIACjWQ9AkOxqaW",
			"numberOfCoachings": 122,
			"totalLengthOfCoachings": 4880,
			"averageLengthOfCoaching": 40,
			"coachingsTotalViewers": 11400,
			"coachingsTotalViews": 36600,
			"numberOfActivities": 18,
			"totalLengthOfActivities": 720,
			"MPLegalUserId": "100480447",
			"subscription": null,
			"myVideos": 1,
			"automaticTopUp": true,
			"__v": 0
		}
	),
	// KAMILLA LOU
	new User(
		{
			"_id": "5f456b93deb03a000469f576",
			agreedTermsAndConditions: true,
			averageFeeling: 4,
			"coachRating": 4.8,
			"hasSetUpZone": true,
			"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598303778/VonageApp/coachesAvatar/kamilla-avatar.jpg",
			"sports": [
				{
					"type": "yoga",
					"level": "expert"
				},
				{
					"type": "running",
					"level": "beginner"
				},
				{
					"type": "meditation",
					"level": "expert"
				},
				{
					"type": "weightlifting",
					"level": "expert"
				},
				{
					"type": "circuit Training",
					"level": "intermediate"
				}
			],
			"bio": "Hey c\u2019est Kamilla 😃\nJ\u2019habite Paris et suis spécialiste en prépa physique, prépa mentale, mais aussi en nutrition.\nJe m\u2019intéresse énormément à l\u2019ostéopathie, pratique sur laquelle je peux vous apprendre beaucoup de choses ...\nA bientôt 💪🏾🧠🥦",
			"isVerified": true,
			"coachingLanguagePreference": [],
			"distanceMetricPreference": "kilometers",
			"weightMetricPreference": "kg",
			"basedOnLocationPreference": false,
			"activityReminderFrequency": 30,
			"followers": [
				{
					"userName": "Jimmy Ducan",
					"coachRating": 4.6,
					"_id": "5f456523deb03a000469f572",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598303777/VonageApp/coachesAvatar/jimmy-avatar.jpg",
					"bio": "My name is Jimmy. I'm a triathlete from Austin Texas. My one and only goal is to improve my personal records training as hard as I can... Follow me on that journey !",
					"sports": [
						{
							"type": "running",
							"level": "expert"
						},
						{
							"type": "yoga",
							"level": "beginner"
						},
						{
							"type": "calisthenics",
							"level": "intermediate"
						},
						{
							"type": "weightlifting",
							"level": "intermediate"
						},
						{
							"type": "cycling",
							"level": "expert"
						},
						{
							"type": "swimming",
							"level": "expert"
						},
						{
							"type": "circuit Training",
							"level": "intermediate"
						}
					]
				}
			],
			"following": [
				{
					"userName": "Karina Klop",
					"coachRating": 5,
					"_id": "5f4427e06cc26300049d666b",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598303779/VonageApp/coachesAvatar/karina-avatar.jpg",
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
							"type": "circuit Training",
							"level": "expert"
						}
					],
					"bio": "I'm Karina from Sweden. Passionate about sports, I'm an experienced personal fitness coach that will help you reach your goals in no time.",
				},
				{
					"userName": "Jimmy Ducan",
					"coachRating": 4.6,
					"_id": "5f456523deb03a000469f572",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1598303777/VonageApp/coachesAvatar/jimmy-avatar.jpg",
					"bio": "My name is Jimmy. I'm a triathlete from Austin Texas. My one and only goal is to improve my personal records training as hard as I can... Follow me on that journey !",
					"sports": [
						{
							"type": "running",
							"level": "expert"
						},
						{
							"type": "yoga",
							"level": "beginner"
						},
						{
							"type": "calisthenics",
							"level": "intermediate"
						},
						{
							"type": "weightlifting",
							"level": "intermediate"
						},
						{
							"type": "cycling",
							"level": "expert"
						},
						{
							"type": "swimming",
							"level": "expert"
						},
						{
							"type": "circuit Training",
							"level": "intermediate"
						}
					]
				}
			],
			activitiesIAttend: [
				{
					_id: "5f456609deb03a000469f574",
					"startingDate": addDays(5)
				},
				{
					_id: "5f45665ddeb03a000469f573",
					"startingDate": addDays(2)
				},
				{
					_id: "5f456d3cdeb03a000469f56f",
					"startingDate": addDays(6)
				},
				{
					_id: "5f456d87deb03a000469f571",
					"startingDate": addHours(3)
				},
			],
			"sessions": [],
			"firstName": "Kamilla",
			"lastName": "Lou",
			"userName": "Kamilla Lou",
			"email": "kamilla@thecitrusapp.com",
			"password": "$2a$10$tCDoKHQvPH5mmmoYfSkRkelgdZ5JI1WDFy9WIDK9AqyY2/RtFqGga",
			"numberOfCoachings": 122,
			"totalLengthOfCoachings": 4880,
			"averageLengthOfCoaching": 40,
			"coachingsTotalViewers": 11400,
			"coachingsTotalViews": 36600,
			"numberOfActivities": 18,
			"totalLengthOfActivities": 720,
			"MPLegalUserId": "100477348",
			"__v": 0
		}
	),
	// ADRIEN FLOOR
	new User(
		{
			"_id": "5f412f4bdff0cd00046a07ce",
			agreedTermsAndConditions: true,
			averageFeeling: 4.5,
			"coachRating": 4,
			"hasSetUpZone": false,
			"avatarUrl": "",
			"sports": [],
			"bio": "",
			"isVerified": true,
			"coachingLanguagePreference": [],
			"distanceMetricPreference": "kilometers",
			"weightMetricPreference": "kg",
			"basedOnLocationPreference": false,
			"activityReminderFrequency": null,
			"followers": [],
			"following": [],
			"sessions": [],
			activitiesIAttend: [],
			"firstName": "",
			"lastName": "",
			"userName": "",
			"email": "adrien@thecitrusapp.com",
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