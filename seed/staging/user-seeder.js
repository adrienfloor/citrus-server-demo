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
	// Chirag
	new User(
		{
			"id": "610ef87a5fdd590004571ece",
			"firstName": "",
			"lastName": "",
			"isVerified": true,
			"hasSetUpZone": false,
			"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1623317757/VonageApp/avatar/noun_avatar_2309777_jhlofy.png",
			"sports": [],
			"bio": "",
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
			"isCoach": false,
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
			"userName_fuzzy": ["ag", "ra", "ir", "hi", "ch", "rag", "ira", "hir", "chi", "irag", "hira", "chir", "hirag", "chira", "chirag"],
			"firstName_fuzzy": [""],
			"lastName_fuzzy": [""],
			"userName": "Chirag",
			"email": "chirag@thecitrusapp.com",
			"password": "$2a$10$KDijSCUj1JrfI6/2Tzn5ZupSuufdStDUDAL7xvLQv4rkneDNxqA6e",
			"__v": 0
		}
	),
	// QUENTIN BELARBI
	new User(
		{
			"id": "610df87a5fdd590004571ece",
			"firstName": "",
			"lastName": "",
			"isVerified": true,
			"hasSetUpZone": false,
			"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1636623750/VonageApp/bxr8cvzw1psepamuatzq.jpg",
			"sports": [],
			"bio": "",
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
			"userName_fuzzy": ["in", "ti", "et", "ue", "qu", "tin", "que", "uen", "eti", "quen", "uent", "enti", "ntin", "quent", "uentin", "quenti", "uentin", "quentin"],
			"firstName_fuzzy": [""],
			"lastName_fuzzy": [""],
			"userName": "quentin",
			"email": "quentin@thecitrusapp.com",
			"password": "$2a$10$rogKmik5D0uoy/oCAzo/Oek4Cw4pKvz1ej6hrV1hEOVWs.5k9mRdq",
			"__v": 0
		}
	),
	// KARINA KLOP
	new User(
		{
			"_id": "5f4427e06cc26300049d666b",
			"MPLegalUserId": "123353837",
			"MPUserId": "",
			"currentGains": 150,
			"lifeTimeGains": 1200,
			"agreedTermsAndConditions": true,
			"averageFeeling": 4.5,
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
					"type": "circuitTraining",
					"level": "expert"
				}
			],
			"bio": "Je m'appelle Karina et je suis d'origine suédoise. Passionée de sports depuis toujours, je suis un entraineur personnel expérimentée qui vous aidera à atteindre vos objectifs personnels en un rien de temps.",
			"isVerified": true,
			"coachingLanguagePreference": [
				"french"
			],
			"distanceMetricPreference": "kilometersAndKilos",
			"weightMetricPreference": "kilometersAndKilos",
			"basedOnLocationPreference": false,
			"activityReminderFrequency": 60,
			"followers": [
				{
					"userName": "Kamilla Lou",
					"coachRating": 4.8,
					"_id": "5f456b93deb03a000469f576",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1621285691/VonageApp/coachesAvatar/coach2_pkib6d.jpg",
					"bio": "Je suis Kamilla, de Paris ! Je suis spécialiste du Yoga et de la méditation. J'ai fait de l'athlétisme et notamment de la course à pieds à haut niveau et j'ai hate de vous montrer ce que je sais faire !",
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
							"type": "circuitTraining",
							"level": "intermediate"
						}
					],
					"numberOfFollowers": 2
				},
				{
					"userName": "Jimmy Ducan",
					"coachRating": 4.6,
					"_id": "5f456523deb03a000469f572",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1621285601/VonageApp/coachesAvatar/coach1_akxlnp.jpg",
					"bio": "Je m'appelle Jimmy et je suis triathlète depuis 10 ans. Mon seul et unique goal est de me dépasser un peu plus chaque jour... Suivez-moi dans cette aventure !",
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
							"type": "circuitTraining",
							"level": "intermediate"
						}
					],
					"numberOfFollowers": 1
				}
			],
			"following": [
				{
					"userName": "Kamilla Lou",
					"coachRating": 4.8,
					"_id": "5f456b93deb03a000469f576",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1621285691/VonageApp/coachesAvatar/coach2_pkib6d.jpg",
					"bio": "Je suis Kamilla, de Paris ! Je suis spécialiste du Yoga et de la méditation. J'ai fait de l'athlétisme et notamment de la course à pieds à haut niveau et j'ai hate de vous montrer ce que je sais faire !",
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
							"type": "circuitTraining",
							"level": "intermediate"
						}
					],
					"numberOfFollowers": 2
				},
				{
					"userName": "Jimmy Ducan",
					"coachRating": 4.6,
					"_id": "5f456523deb03a000469f572",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1621285601/VonageApp/coachesAvatar/coach1_akxlnp.jpg",
					"bio": "Je m'appelle Jimmy et je suis triathlète depuis 10 ans. Mon seul et unique goal est de me dépasser un peu plus chaque jour... Suivez-moi dans cette aventure !",
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
							"type": "circuitTraining",
							"level": "intermediate"
						}
					],
					"numberOfFollowers": 1
				}
			],
			"myReplays": [
				{
					"_id": "4f456609deb03a000469f574",
					"coachRating": 4,
					"coachingRating": {
						rating: null,
						numberOfRatings: 0
					},
					"title": "Abs igniter",
					"coachFirstName": "Jimmy",
					"coachLastName": "Ducan",
					"coachUserName": "Jimmy Ducan",
					"coachId": "5f456523deb03a000469f572",
					"sport": "circuitTraining",
					"duration": 30,
					"level": "beginner",
					"equipment": [],
					"muxReplayPlaybackId": "https://stream.mux.com/uiixZ8ucm2da5dIsUbp15X6HUXc8YuM11022gE028EjIY.m3u8",
					"isReplayReady": true,
					"startingDate": removeDays(3),
					"startingTime": getStartingTime(removeDays(3)),
					"pictureUri": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1602147955/VonageApp/coachingCatalog/StockSnap_TIHQMAG3KH_iq3vqv.jpg",
					"coachingLanguage": "french",
					"focus": ["core"],
					"freeAccess": false,
					"price": 2,
					"muxStreamKey": "",
					"muxLivePlaybackId": "",
					"isLive": false,
					"isLiveOver": true,
					"__v": 0
				},
				{
					"_id": "3f456609deb03a000469f574",
					"coachRating": 3,
					"coachingRating": {
						rating: null,
						numberOfRatings: 0
					},
					"title": "Abs all the way",
					"coachFirstName": "Kamilla",
					"coachLastName": "Lou",
					"coachUserName": "Kamilla Lou",
					"coachId": "5f456b93deb03a000469f576",
					"sport": "hiit",
					"duration": 30,
					"level": "beginner",
					"equipment": ["yogaMat"],
					"muxReplayPlaybackId": "https://stream.mux.com/uiixZ8ucm2da5dIsUbp15X6HUXc8YuM11022gE028EjIY.m3u8",
					"isReplayReady": true,
					"startingDate": removeDays(15),
					"startingTime": getStartingTime(removeDays(15)),
					"pictureUri": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1602147798/VonageApp/coachingCatalog/jonathan-borba-zfPOelmDc-M-unsplash_rjesuf.jpg",
					"coachingLanguage": "french",
					"focus": ["core"],
					"freeAccess": false,
					"price": 2,
					"muxStreamKey": "",
					"muxLivePlaybackId": "",
					"isLive": false,
					"isLiveOver": true,
					"__v": 0
				},
				{
					"_id": "2f456609deb03a000469f574",
					"coachRating": 3,
					"coachingRating": {
						rating: null,
						numberOfRatings: 0
					},
					"title": "Abs and core",
					"coachFirstName": "Kamilla",
					"coachLastName": "Lou",
					"coachUserName": "Kamilla Lou",
					"coachId": "5f456b93deb03a000469f576",
					"sport": "hiit",
					"duration": 30,
					"level": "beginner",
					"equipment": ["yogaMat"],
					"muxReplayPlaybackId": "https://stream.mux.com/uiixZ8ucm2da5dIsUbp15X6HUXc8YuM11022gE028EjIY.m3u8",
					"isReplayReady": true,
					"startingDate": removeDays(7),
					"startingTime": getStartingTime(removeDays(7)) + 1,
					"pictureUri": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1602147782/VonageApp/coachingCatalog/pexels-cottonbro-4761353_gucszu.jpg",
					"coachingLanguage": "french",
					"focus": ["core"],
					"freeAccess": false,
					"price": 2,
					"muxStreamKey": "",
					"muxLivePlaybackId": "",
					"isLive": false,
					"isLiveOver": true,
					"__v": 0
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
			"subscription": null,
			"billingDate": 13,
			"companyName": "2Kfit",
			"companyType": "soletrader",
			"companyAddress": {
				"addressLine": "13 avenue de Friedland",
				"zipCode": "75008",
				"city": "Paris",
				"country": "france"
			},
			"isCompanySubjectToTax": true,
			"companyLegalStatus": "auto-entrepeneur",
			"companyNumber": "12345678901234",
			"companyIban": "FR7630001007941234567890185",
			"__v": 3
		}
	),
	// JIMMY Ducan
	new User(
		{
			"_id": "5f456523deb03a000469f572",
			"MPLegalUserId": "122655516",
			"agreedTermsAndConditions": true,
			"averageFeeling": 5,
			"coachRating": 4.6,
			"hasSetUpZone": true,
			"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1621285601/VonageApp/coachesAvatar/coach1_akxlnp.jpg",
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
					"type": "circuitTraining",
					"level": "intermediate"
				}
			],
			"bio": "Je m'appelle Jimmy et je suis triathlète depuis 10 ans. Mon seul et unique goal est de me dépasser un peu plus chaque jour... Suivez-moi dans cette aventure !",
			"isVerified": true,
			"coachingLanguagePreference": ["french"],
			"distanceMetricPreference": "kilometersAndKilos",
			"weightMetricPreference": "kilometersAndKilos",
			"basedOnLocationPreference": false,
			"activityReminderFrequency": 30,
			"followers": [
				{
					"userName": "Kamilla Lou",
					"coachRating": 4.8,
					"_id": "5f456b93deb03a000469f576",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1621285691/VonageApp/coachesAvatar/coach2_pkib6d.jpg",
					"bio": "Je suis Kamilla, de Paris ! Je suis spécialiste du Yoga et de la méditation. J'ai fait de l'athlétisme et notamment de la course à pieds à haut niveau et j'ai hate de vous montrer ce que je sais faire !",
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
							"type": "circuitTraining",
							"level": "intermediate"
						}
					],
					"numberOfFollowers": 2
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
							"type": "circuitTraining",
							"level": "expert"
						}
					],
					"bio": "Je m'appelle Karina et je suis d'origine suédoise. Passionée de sports depuis toujours, je suis un entraineur personnel expérimentée qui vous aidera à atteindre vos objectifs personnels en un rien de temps.",
					"numberOfFollowers": 2
				},
				{
					"userName": "Kamilla Lou",
					"coachRating": 4.8,
					"_id": "5f456b93deb03a000469f576",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1621285691/VonageApp/coachesAvatar/coach2_pkib6d.jpg",
					"bio": "Je suis Kamilla, de Paris ! Je suis spécialiste du Yoga et de la méditation. J'ai fait de l'athlétisme et notamment de la course à pieds à haut niveau et j'ai hate de vous montrer ce que je sais faire !",
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
							"type": "circuitTraining",
							"level": "intermediate"
						}
					],
					"numberOfFollowers": 2
				},
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
			"__v": 0
		}
	),
	// KAMILLA LOU
	new User(
		{
			"_id": "5f456b93deb03a000469f576",
			"MPLegalUserId": "123355010",
			"agreedTermsAndConditions": true,
			"averageFeeling": 4,
			"coachRating": 4.8,
			"hasSetUpZone": true,
			"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1621285691/VonageApp/coachesAvatar/coach2_pkib6d.jpg",
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
					"type": "circuitTraining",
					"level": "intermediate"
				}
			],
			"bio": "Je suis Kamilla, de Paris ! Je suis spécialiste du Yoga et de la méditation. J'ai fait de l'athlétisme et notamment de la course à pieds à haut niveau et j'ai hate de vous montrer ce que je sais faire !",
			"isVerified": true,
			"coachingLanguagePreference": [],
			"distanceMetricPreference": "kilometersAndKilos",
			"weightMetricPreference": "kilometersAndKilos",
			"basedOnLocationPreference": false,
			"activityReminderFrequency": 30,
			"followers": [
				{
					"userName": "Jimmy Ducan",
					"coachRating": 4.6,
					"_id": "5f456523deb03a000469f572",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1621285601/VonageApp/coachesAvatar/coach1_akxlnp.jpg",
					"bio": "Je m'appelle Jimmy et je suis triathlète depuis 10 ans. Mon seul et unique goal est de me dépasser un peu plus chaque jour... Suivez-moi dans cette aventure !",
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
							"type": "circuitTraining",
							"level": "intermediate"
						}
					],
					"numberOfFollowers": 1
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
							"type": "circuitTraining",
							"level": "expert"
						}
					],
					"bio": "Je m'appelle Karina et je suis d'origine suédoise. Passionée de sports depuis toujours, je suis un entraineur personnel expérimentée qui vous aidera à atteindre vos objectifs personnels en un rien de temps.",
					"numberOfFollowers": 2
				},
				{
					"userName": "Jimmy Ducan",
					"coachRating": 4.6,
					"_id": "5f456523deb03a000469f572",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1621285601/VonageApp/coachesAvatar/coach1_akxlnp.jpg",
					"bio": "Je m'appelle Jimmy et je suis triathlète depuis 10 ans. Mon seul et unique goal est de me dépasser un peu plus chaque jour... Suivez-moi dans cette aventure !",
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
							"type": "circuitTraining",
							"level": "intermediate"
						}
					],
					"numberOfFollowers": 1
				}
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
			"__v": 0
		}
	),
	// ADRIEN FLOOR
	new User(
		{
			"_id": "5f412f4bdff0cd00046a07ce",
			"MPLegalUserId": "123346331",
			"currentGains": 1217,
			"lifeTimeGains": 3625,
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
			"following": [
				{
					"userName": "Kyf Ekamé",
					"coachRating": 4.8,
					"_id": "5f456b93deb03a000469f576",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1648206149/VonageApp/erdkfhzhmnzinpztguom.jpg",
					"bio": "Je suis Kamilla, de Paris ! Je suis spécialiste du Yoga et de la méditation. J'ai fait de l'athlétisme et notamment de la course à pieds à haut niveau et j'ai hate de vous montrer ce que je sais faire !",
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
							"type": "circuitTraining",
							"level": "intermediate"
						}
					],
					"numberOfFollowers": 2556
				},
				{
					"userName": "Estérelle",
					"coachRating": 4.6,
					"_id": "5f456523deb03a000469f572",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1641654865/VonageApp/eh9ldtmlnmaujjckymjf.jpg",
					"bio": "Je m'appelle Jimmy et je suis triathlète depuis 10 ans. Mon seul et unique goal est de me dépasser un peu plus chaque jour... Suivez-moi dans cette aventure !",
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
							"type": "circuitTraining",
							"level": "intermediate"
						}
					],
					"numberOfFollowers": 497
				},
				{
					"userName": "Adrien Floor",
					"coachRating": 5,
					"_id": "5f4427e06cc26300049d666b",
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
					"bio": "Je m'appelle Karina et je suis d'origine suédoise. Passionée de sports depuis toujours, je suis un entraineur personnel expérimentée qui vous aidera à atteindre vos objectifs personnels en un rien de temps.",
					"numberOfFollowers": 212
				},
				{
					"userName": "Kamilla Lou",
					"coachRating": 4.8,
					"_id": "1f456b93deb03a000469f576",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1621285691/VonageApp/coachesAvatar/coach2_pkib6d.jpg",
					"bio": "Je suis Kamilla, de Paris ! Je suis spécialiste du Yoga et de la méditation. J'ai fait de l'athlétisme et notamment de la course à pieds à haut niveau et j'ai hate de vous montrer ce que je sais faire !",
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
							"type": "circuitTraining",
							"level": "intermediate"
						}
					],
					"numberOfFollowers": 2
				},
				{
					"userName": "Jimmy Ducan",
					"coachRating": 4.6,
					"_id": "1f456523deb03a000469f572",
					"avatarUrl": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1621285601/VonageApp/coachesAvatar/coach1_akxlnp.jpg",
					"bio": "Je m'appelle Jimmy et je suis triathlète depuis 10 ans. Mon seul et unique goal est de me dépasser un peu plus chaque jour... Suivez-moi dans cette aventure !",
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
							"type": "circuitTraining",
							"level": "intermediate"
						}
					],
					"numberOfFollowers": 1
				},
				{
					"userName": "Karina Klop",
					"coachRating": 5,
					"_id": "1f4427e06cc26300049d666b",
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
							"type": "circuitTraining",
							"level": "expert"
						}
					],
					"bio": "Je m'appelle Karina et je suis d'origine suédoise. Passionée de sports depuis toujours, je suis un entraineur personnel expérimentée qui vous aidera à atteindre vos objectifs personnels en un rien de temps.",
					"numberOfFollowers": 2
				}
			],
			"sessions": [],
			"myReplays": [
				{
					"_id": "4f456609deb03a000469f574",
					"coachRating": 4,
					"coachingRating": {
						rating: 5,
						numberOfRatings: 1
					},
					"myRating": 5,
					"title": "Pilates Abdos 30'",
					"coachFirstName": "Jimmy",
					"coachLastName": "Ducan",
					"coachUserName": "Estérelle",
					"coachId": "5f456523deb03a000469f572",
					"sport": "pilates",
					"duration": 30,
					"level": "beginner",
					"equipment": [],
					"muxReplayPlaybackId": "https://stream.mux.com/uiixZ8ucm2da5dIsUbp15X6HUXc8YuM11022gE028EjIY.m3u8",
					"isReplayReady": true,
					"startingDate": removeDays(3),
					"startingTime": getStartingTime(removeDays(3)),
					"pictureUri": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1641655523/VonageApp/dedb8dyoz4qzmyl5im9e.jpg",
					"coachingLanguage": "french",
					"focus": ["core"],
					"freeAccess": false,
					"price": 2,
					"muxStreamKey": "",
					"muxLivePlaybackId": "",
					"isLive": false,
					"isLiveOver": true,
					"__v": 0
				},
				{
					"_id": "3f456609deb03a000469f574",
					"coachRating": 3,
					"coachingRating": {
						rating: null,
						numberOfRatings: 0
					},
					"title": "Pookie - Aya Nakamura",
					"coachFirstName": "Kamilla",
					"coachLastName": "Lou",
					"coachUserName": "Kyf Ekamé",
					"coachId": "5f456b93deb03a000469f576",
					"sport": "dance",
					"duration": 30,
					"level": "beginner",
					"equipment": ["yogaMat"],
					"muxReplayPlaybackId": "https://stream.mux.com/uiixZ8ucm2da5dIsUbp15X6HUXc8YuM11022gE028EjIY.m3u8",
					"isReplayReady": true,
					"startingDate": removeDays(15),
					"startingTime": getStartingTime(removeDays(15)),
					"pictureUri": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1648206742/VonageApp/tncm4vrom0untjok0oqj.jpg",
					"coachingLanguage": "french",
					"focus": ["core"],
					"freeAccess": false,
					"price": 2,
					"muxStreamKey": "",
					"muxLivePlaybackId": "",
					"isLive": false,
					"isLiveOver": true,
					"__v": 0
				},
				{
					"_id": "2f456609deb03a000469f574",
					"coachRating": 3,
					"coachingRating": {
						rating: null,
						numberOfRatings: 0
					},
					"title": "Full Body Hiit",
					"coachFirstName": "Kamilla",
					"coachLastName": "Lou",
					"coachUserName": "Adrien Floor",
					"coachId": "5f456b93deb03a000469f576",
					"sport": "hiit",
					"duration": 30,
					"level": "beginner",
					"equipment": ["yogaMat"],
					"muxReplayPlaybackId": "https://stream.mux.com/uiixZ8ucm2da5dIsUbp15X6HUXc8YuM11022gE028EjIY.m3u8",
					"isReplayReady": true,
					"startingDate": removeDays(7),
					"startingTime": getStartingTime(removeDays(7)),
					"pictureUri": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1644251325/VonageApp/z9292pwpfjrakaapzazf.jpg",
					"coachingLanguage": "french",
					"focus": ["core"],
					"freeAccess": false,
					"price": 2,
					"muxStreamKey": "",
					"muxLivePlaybackId": "",
					"isLive": false,
					"isLiveOver": true,
					"__v": 0
				}
			],
			"firstName": "Adrien",
			"lastName": "Floor",
			"userName": "Adrien Floor",
			"email": "adrien@thecitrusapp.com",
			"isCoach": true,
			"password": "$2a$10$rogKmik5D0uoy/oCAzo/Oek4Cw4pKvz1ej6hrV1hEOVWs.5k9mRdq",
			"billingDate": null,
			"subscription": null,
			"lastBillingMonth": null,
			"lastBillingYear": null,
			"totalLengthOfActivities": 90,
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