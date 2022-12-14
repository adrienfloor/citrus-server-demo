const express = require('express')
const router = express.Router()
const moment = require('moment')

const Coaching = require('../models/coaching')
const User = require('../models/user')

const { removeDays, addDays } = require('../utils')

const allFocuses = ['mind', 'core', 'upper', 'lower', 'cardio', 'strength', 'flexibility', []]
const allLevels = ['beginner', 'intermediate', 'expert', []]
const allDurations = ["5","10","15","20","25","30","35","40","45","50","55","60", []]
const allStartingTimes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,[]]

// FILTERED SESSIONS SEARCH
router.get('/filtered_search', async (req, res) => {

	const {
		liveCategory,
		startingTime,
		level,
		focus,
		duration,
		access,
		user_id
	} = req.query

	const startingTimeArray = startingTime.split(',')
	const startingTimeArrayLength = startingTimeArray.length > 0
	const focusArray = focus.length ? focus.split(',') : null

	// only coachings in the next two days
	const limitDate = new Date()
	limitDate.setDate(limitDate.getDate() + 2)

	const returnStartingDateQuery = category => {
		if(category == 'live') {
			return {
				$gte: new Date(),
				$lte: limitDate
			}
		}
		if(category == 'replay') {
			return {
				$lte: new Date()
			}
		}
		return {
			$gte: "2020-10-20T01:47:53.296Z"
		}
	}

	const returnAccessQuery = accessQuery => {
		if(accessQuery) {
			if (accessQuery.toLowerCase() === 'free') {
				return { $eq: true }
			}
			return { $in: [true, false] }
		}
		return { $in: [true, false] }
	}

	const returnLevelQuery = levelQuery => {
		if(levelQuery) {
			const lowerCaseLevelQuery = levelQuery.toLowerCase()
			if (lowerCaseLevelQuery === 'all') {
				return { $in: allLevels }
			}
			return { $in: [lowerCaseLevelQuery] }
		}
		return { $in: allLevels }
	}

	const returnDurationQuery = durationQuery => {
		if (durationQuery == 'Any' || !durationQuery) {
			return { $in: allDurations }
		}
		return { $eq: durationQuery }
	}

	const returnFocusQuery = focusQuery => {
		if(focusQuery) {
			const lowerCaseFocusQuery = focusQuery.map(
				focus => focus.toLowerCase()
			)
			if (lowerCaseFocusQuery.includes('all')) {
				return { $in: allFocuses }
			}
			return { $in: lowerCaseFocusQuery}
		}
		return { $in: allFocuses }
	}

		try {
			result = await Coaching
			.find({
				level: returnLevelQuery(level),
				focus: returnFocusQuery(focusArray),
				duration: returnDurationQuery(duration),
				freeAccess: returnAccessQuery(access),
				startingDate: returnStartingDateQuery(liveCategory),
				startingTime: startingTimeArrayLength ?
				{
					$gte: (startingTimeArray[0]) || 0,
					$lte: (startingTimeArray[1]) || 24
				} :
				{ $in: allStartingTimes },
				_id: { $ne: user_id }
			})
			.sort({ coachRating: 1 })
			.limit(50)

			// if(result.length === 0) {
			// 	const defaultResult = await Coaching
			// 		.find()
			// 		.sort({ coachRating: -1})
			// 		.limit(50)
			// 	res.send(defaultResult)
			// }
			res.send(result)
		} catch (e) {
			console.log(e)
			res.status(500).send({ err: e })
		}

})

// BASIC ACCOUNTS AND SESSIONS SEARCH
router.get('/basic_search', async (req, res) => {

	const {
		type,
		query,
		user_id
	} = req.query

	let result

	if(type === 'sessions') {
		try {
			result = await Coaching
			.fuzzySearch(query)
			.limit(20)
			const coachings = result.filter(coaching => coaching.coachId !== user_id)
			res.send(coachings)
		} catch(e) {
			console.log(e)
			res.status(500).send({ err: e })
		}
	}
	if (type === 'accounts') {
		try {
			result = await User
			.fuzzySearch(query)
			.limit(20)
			.select('-password')
			const coaches = result.filter(coach => coach._id != user_id)
			res.send(coaches)
		} catch (e) {
			console.log(e)
			res.status(500).send(e)
		}
	}
	if(!type) {
		res.status(400).send({ err: 'No type of search provided' })
	}
})

// RIGHT NOW SEARCH
router.get('/right_now_search', async (req, res) => {

	const { sport, user_id, type } = req.query

	try {
		if(sport == 'all') {
			if(type === 'live') {
				const upcomingLives = await Coaching
					.find({
						startingDate: { $gte: new Date() },
						coachId: { $ne: user_id }
					})
					.limit(100)
					.sort({ startingDate: 1 })
				const currentLives = await Coaching
					.find({
						coachId: { $ne: user_id },
						isLive: { $eq: true },
						muxLivePlaybackId: { $ne: (null || '' || undefined) }
					})
					.limit(100)
					.sort({ startingDate: 1 })
				const lives = [
					...currentLives,
					...upcomingLives
				]
				return res.send(lives)
			} else {
				const replays = await Coaching
					.find({
						startingDate: { $lte: new Date() },
						muxReplayPlaybackId: { $ne: (null || '' || undefined) },
						isLiveOver: { $eq: true },
						isReplayReady: { $eq: true },
						coachId: { $ne: user_id }
					})
					.limit(100)
					.sort({ startingDate: -1 })
				return res.send(replays)
			}
		} else {
			if (type === 'live') {
				const upcomingLives = await Coaching
					.find({
						sport,
						startingDate: { $gte: new Date() },
						coachId: { $ne: user_id }
					})
					.limit(100)
					.sort({ startingDate: 1 })
				const currentLives = await Coaching
					.find({
						sport,
						coachId: { $ne: user_id },
						isLive: { $eq: true },
						muxLivePlaybackId: { $ne: (null || '' || undefined) }
					})
					.limit(100)
					.sort({ startingDate: 1 })
				const lives = [
					...currentLives,
					...upcomingLives
				]
				return res.send(lives)
			} else {
				const replays = await Coaching
					.find({
						sport,
						startingDate: { $lte: new Date() },
						muxReplayPlaybackId: { $ne: (null || '' || undefined) },
						isLiveOver: { $eq: true },
						coachId: { $ne: user_id }
					})
					.limit(100)
					.sort({ startingDate: -1 })
				return res.send(replays)
			}
		}
	} catch (e) {
		console.log(e)
		res.status(500).send({ err: e })
	}
})

// EXPLORER SEARCH (NO LIVE VERSION)
router.get('/explore_search', async (req, res) => {

	const {
		sport,
		user_id,
		skip,
		limit,
		fav_sports
	} = req.query

	const parse_fav_sports = JSON.parse(fav_sports)

	const isSkipping = parseInt(skip)
	const isLimiting = parseInt(limit)

	let favSports = []
	if(parse_fav_sports && parse_fav_sports.length>0) {
		favSports = parse_fav_sports.map(sport => sport.type)
	}

	if(user_id === 'null') {
		try {
			const coachings = await Coaching
			.find({ muxReplayPlaybackId: { $ne: '' } })
			.lean()
			.limit(isLimiting)
			.skip(isSkipping)
			.sort({ 'coachingRating.rating': -1, startingDate: -1 })
			return res.send(coachings)
		} catch(e) {
			console.log(e)
			return res.status(500).send({ err: e })
		}
	}
	try {
		const user = await User.findById(user_id)
		const myReplaysIds = user.myReplays.map(replay => replay._id)
		if (sport == 'all') {
			// if(favSports.length > 0) {
			// 	const coachings = await Coaching
			// 		.find({
			// 			muxReplayPlaybackId: { $ne: '' },
			// 			coachId: { $ne: user_id },
			// 			sport: { $in: favSports }
			// 		})
			// 		.limit(isLimiting)
			// 		.skip(isSkipping)
			// 		.sort({ 'coachingRating.rating': -1, startingDate: -1 })
			// 	return res.send(coachings)
			// } else {
				const coachings = await Coaching
					.find({
						muxReplayPlaybackId: { $ne: '' },
						coachId: user_id ? { $ne: user_id } : { $ne: null }
					})
					.lean()
					.limit(isLimiting)
					.skip(isSkipping)
					.sort({ 'coachingRating.rating': -1, startingDate: -1 })
				const coachingsIDidntBuy = coachings.filter(coaching => !myReplaysIds.includes(coaching._id.toString()))
				const coachingsIAlreadyBought = coachings.filter(coaching => myReplaysIds.includes(coaching._id.toString()))
				const coachingsIAlreadyBoughtWithRef = coachingsIAlreadyBought.map(el => ({...el, isMine: true }))
				return res.send([...coachingsIDidntBuy, ...coachingsIAlreadyBoughtWithRef])
			// }
		} else {
			const coachings = await Coaching
				.find({
					sport,
					muxReplayPlaybackId: { $ne: '' },
					// coachId: { $ne: user_id }
				})
				.lean()
				.limit(isLimiting)
				.skip(isSkipping)
				.sort({ 'coachingRating.rating': -1, startingDate: -1 })
				const coachingsIDidntBuy = coachings.filter(coaching => !myReplaysIds.includes(coaching._id.toString()))
				const coachingsIAlreadyBought = coachings.filter(coaching => myReplaysIds.includes(coaching._id.toString()))
				const coachingsIAlreadyBoughtWithRef = coachingsIAlreadyBought.map(el => ({...el, isMine: true }))
				return res.send([...coachingsIDidntBuy, ...coachingsIAlreadyBoughtWithRef])
		}

	} catch (e) {
		console.log(e)
		res.status(500).send({ err: e })
	}
})
module.exports = router