const Coaching = require('../../models/coaching')
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

const coachings = [
	// ADRIEN FLOOR
	// REPLAYS
	new Coaching(
		{
			"_id": "60aa8be963c68e00044124b7",
			"level": "allLevel",
			"equipment": [],
			"focus": [],
			"coachingLanguage": "french",
			"freeAccess": true,
			"price": 0,
			"muxStreamKey": "26e169c2-abac-370b-0deb-bc12ed3770d9",
			"muxLivePlaybackId": "https://stream.mux.com/yaOtcayqNuWQthmDSCLmQoXE2T6KLPDWJtwkFLfdR00g",
			"muxReplayPlaybackId": "https://stream.mux.com/pplHWsWyz2FcFsVyHJ9dnjqI5uUjVpqTrDPBFccOPV4.m3u8",
			"isReplayReady": true,
			"isLive": false,
			"isLiveOver": true,
			"title": "hiit",
			"coachFirstName": "adrien",
			"coachLastName": "floor",
			"coachUserName": "adrien floor",
			"coachId": "5f412f4bdff0cd00046a07ce",
			"sport": "circuitTraining",
			"duration": ,
			"startingDate": removeDays(6),
			"startingTime": getStartingTime(removeDays(6)),
			"pictureUri": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1621789064/VonageApp/jlenjsna7mkjbbshw4b4.jpg",
			"coachRating": 4,
			"__v": 0
		}
	),
	new Coaching(
		{
			"_id": "60aa8be963c68e00044124c3",
			"level": "intermediate",
			"equipment": [],
			"focus": [],
			"coachingLanguage": "french",
			"freeAccess": true,
			"price": 0,
			"muxStreamKey": "26e169c2-abac-370b-0deb-bc12ed3770d9",
			"muxLivePlaybackId": "https://stream.mux.com/yaOtcayqNuWQthmDSCLmQoXE2T6KLPDWJtwkFLfdR00g",
			"muxReplayPlaybackId": "https://stream.mux.com/NXB00O7G6qO4DHFTf974H6b74cCC8phwY86TT5qJzgKQ.m3u8",
			"isReplayReady": true,
			"isLive": false,
			"isLiveOver": true,
			"title": "Super Cardio 30",
			"coachFirstName": "adrien",
			"coachLastName": "floor",
			"coachUserName": "adrien floor",
			"coachId": "5f412f4bdff0cd00046a07ce",
			"sport": "circuitTraining",
			"duration": null,
			"startingDate": removeDays(1),
			"startingTime": getStartingTime(removeDays(1)),
			"pictureUri": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1622802703/VonageApp/zikrkovnqyzhb0emjodg.jpg",
			"coachRating": 4,
			"__v": 0
		}
	),
	new Coaching(
		{
			"_id": "60aa8be963c68e00044124c4",
			"level": "allLevel",
			"equipment": [],
			"focus": [],
			"coachingLanguage": "french",
			"freeAccess": true,
			"price": 0,
			"muxStreamKey": "26e169c2-abac-370b-0deb-bc12ed3770d9",
			"muxLivePlaybackId": "https://stream.mux.com/yaOtcayqNuWQthmDSCLmQoXE2T6KLPDWJtwkFLfdR00g",
			"muxReplayPlaybackId": "https://stream.mux.com/e2dcB6eIK12yz4eHAjQGrnfQXNeMcSuH4vGTU00dyvHM.m3u8",
			"isReplayReady": true,
			"isLive": false,
			"isLiveOver": true,
			"title": "Express 20min Legs",
			"coachFirstName": "adrien",
			"coachLastName": "floor",
			"coachUserName": "adrien floor",
			"coachId": "5f412f4bdff0cd00046a07ce",
			"sport": "circuitTraining",
			"duration": null,
			"startingDate": removeDays(2),
			"startingTime": getStartingTime(removeDays(2)),
			"pictureUri": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1622632699/VonageApp/ppkivhpgjj6tiueytujg.jpg",
			"coachRating": 4,
			"__v": 0
		}
	),
	new Coaching(
		{
			"_id": "60c2f2d4b1c86f0004de0caf",
			"level": "allLevel",
			"equipment": [],
			"focus": ["chest"],
			"coachingLanguage": "french",
			"freeAccess": true,
			"price": 0,
			"muxStreamKey": "ec3eee28-7084-adc4-288f-2d3568228307",
			"muxLivePlaybackId": "https://stream.mux.com/kGg8uAYdDDn501901AmP5wQyfcgGDOEAMlt9AtZnc9XUA",
			"muxReplayPlaybackId": "https://stream.mux.com/JV02OAOdjPDoUVDI5oKyCNWnJEwHD8aXctq6nKPC5uyg.m3u8",
			"isReplayReady": true,
			"isLive": false,
			"isLiveOver": true,
			"title": "Express 20min Chest",
			"coachFirstName": "adrien",
			"coachLastName": "floor",
			"coachUserName": "adrien floor",
			"coachId": "5f412f4bdff0cd00046a07ce",
			"sport": "calisthenics",
			"duration": 20,
			"startingDate": removeDays(2),
			"startingTime": getStartingTime(removeDays(2)),
			"pictureUri": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1623388875/VonageApp/jtgriedio6dml5qvnewb.jpg",
			"coachRating": 4,
			"__v": 0
		}
	),
	// FUTURE LIVES
	new Coaching(
		{
			"_id": "60aa8be963c68e00044124c8",
			"level": "allLevel",
			"equipment": [],
			"focus": [],
			"coachingLanguage": "french",
			"freeAccess": false,
			"muxStreamKey": "",
			"muxLivePlaybackId": "",
			"muxReplayPlaybackId": "",
			"isLive": false,
			"isLiveOver": false,
			"title": "Intense full body",
			"coachFirstName": "adrien",
			"coachLastName": "floor",
			"coachUserName": "adrien floor",
			"coachId": "5f412f4bdff0cd00046a07ce",
			"sport": "circuitTraining",
			"duration": null,
			"startingDate": addDays(100),
			"startingTime": getStartingTime(addDays(100)),
			"pictureUri": "https://res.cloudinary.com/dho1rqbwk/image/upload/q_auto:low/v1623772830/VonageApp/training1_jpz1ci.jpg",
			"coachRating": 4,
			"__v": 0
		}
	),
	new Coaching(
		{
			"_id": "60aa8be963c68e00044124c2",
			"level": "intermediate",
			"equipment": [],
			"focus": ["lowerBody"],
			"coachingLanguage": "french",
			"freeAccess": false,
			"muxStreamKey": "",
			"muxLivePlaybackId": "",
			"muxReplayPlaybackId": "",
			"isLive": false,
			"isLiveOver": false,
			"title": "Leg workout for cyclists",
			"coachFirstName": "adrien",
			"coachLastName": "floor",
			"coachUserName": "adrien floor",
			"coachId": "5f412f4bdff0cd00046a07ce",
			"sport": "cycling",
			"duration": null,
			"startingDate": addDays(90),
			"startingTime": getStartingTime(addDays(90)),
			"pictureUri": "https://res.cloudinary.com/dho1rqbwk/image/upload/q_auto:low/v1623772907/VonageApp/traiining2_w5b2ho.jpg",
			"coachRating": 4,
			"__v": 0
		}
	),
	new Coaching(
		{
			"_id": "60aa8be963c68e00044124c9",
			"level": "allLevel",
			"equipment": [],
			"focus": ["core", "strength"],
			"coachingLanguage": "french",
			"freeAccess": true,
			"muxStreamKey": "",
			"muxLivePlaybackId": "",
			"muxReplayPlaybackId": "",
			"isLive": false,
			"isLiveOver": false,
			"title": "Bodyweight for triathlon",
			"coachFirstName": "adrien",
			"coachLastName": "floor",
			"coachUserName": "adrien floor",
			"coachId": "5f412f4bdff0cd00046a07ce",
			"sport": "triathlon",
			"duration": null,
			"startingDate": addDays(85),
			"startingTime": getStartingTime(addDays(85)),
			"pictureUri": "https://res.cloudinary.com/dho1rqbwk/image/upload/v1623771467/VonageApp/30deca9c-a162-4f58-b95f-cc20207a3ffd_qnuyx3.jpg",
			"coachRating": 4,
			"__v": 0
		}
	),
]

let done = 0
for (let i = 0; i < coachings.length; i++) {
	console.log('***************    ', i, '    *******************')
	coachings[i].save((err, result) => {
		console.log('ERR:', err)
		console.log('RESULT:', result)
		done++
		if (done === coachings.length) {
			exit()
		}
	})
}

const exit = () => {
	mongoose.disconnect()
}