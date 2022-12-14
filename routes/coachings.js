const express = require('express')
const router = express.Router()

const auth = require('../middlewares/auth')
const Coaching = require('../models/coaching')
const User = require('../models/user')

const removeDays = days => {
	const newDate = new Date(new Date().setDate(new Date().getDate() - days)).setHours(new Date().getHours() + 2)
	return new Date(newDate)
}

// CREATE COACHING AKA SAVE COACHING IN DB
router.post('/create_coaching', (req, res) => {
	const {
		title,
		coachFirstName,
		coachLastName,
		coachUserName,
		coachId,
		sport,
		duration,
		level,
		equipment,
		startingDate,
		startingTime,
		pictureUri,
		focus,
		coachingLanguage,
		freeAccess,
		coachRating,
		passthrough,
		price
	} = req.body

	// SIMPLE VALIDATION
	if (
		!title
		|| !coachUserName
		|| !coachId
		|| !sport
		|| !startingDate
		|| !pictureUri
		|| !price
	) {
		return res.status(400).json({ msg: 'Missing coaching parameters' })
	}

	// Coaching.findOne({ coachId, startingDate })
	// .then(coaching => {
	// 	if (coaching) return res.status(400).json({ msg: 'Coaching already exists' });
	// })
	// .catch(e => {
	// 	console.log('err:', e)
	// 	res.json({ msg: 'Something went wrong finding the coaching in DB' })
	// })

	const newCoaching = new Coaching({
		title,
		coachFirstName,
		coachLastName,
		coachUserName,
		coachId,
		sport,
		duration,
		level,
		equipment,
		startingDate,
		startingTime,
		pictureUri,
		focus,
		coachingLanguage,
		freeAccess,
		coachRating,
		passthrough,
		price
	})
	.save()
	.then(coaching => {
		if (coaching) return res.json(coaching)
	})
	.catch(e => {
		console.log('error', e)
		return res.send(e)
	})
})

// UPDATE COACHING
router.put('/update_coaching', async (req, res) => {

	const { _id } = req.body

	try {
		const coaching = await Coaching.findOne({ _id })
		if (!coaching) return res.status(404).json({ msg: 'Coaching does not exist' })
		if (coaching) {
			Object.keys(coaching.toJSON()).forEach((key,i) => {
				if(req.body[key] !== undefined) {
					coaching[key] = req.body[key]
				}
				if(i === (Object.keys(coaching.toJSON()).length-1)) {
					coaching.save()
					.then(updatedCoaching => {
						return res.json(updatedCoaching)
					})
				}
			})
		}
	} catch(e) {
		res.json({ msg: 'Something went wrong finding the coaching in DB' })
	}
})

// DELETE COACHING
router.delete('/delete_coaching', async (req, res) => {

	const { id } = req.query

	try {
		Coaching.deleteOne({ _id: id }, function (err, result) {
			if (err) {
				res.send(err)
			} else {
				console.log(result)
				return res.status(204).send(result)
			}
		});
	} catch (e) {
		res.json({ msg: 'Something went wrong finding the coaching in DB' })
	}
})

// NO NEED FOR THIS ANYMORE,
// SHOULD BE REPLACED WHERE USED BY THE UPDATE METHOD JUST ABOVE

// ADD SESSION ID TO COACHING
router.put('/update_coaching_session_id', (req, res) => {
	const {
		sessionId,
		coachingId
	} = req.body

	Coaching.findOneAndUpdate(
		{ _id: coachingId },
		{ sessionId: sessionId },
		{ new: true }
	)
	.then(coaching => {
		if (!coaching) return res.status(404).json({ msg: 'Coaching does not exist' });
		if (coaching) return res.json(coaching)
	})
	.catch(e => {
		console.log('err:', e)
		res.json({ msg: 'Something went wrong finding the coaching in DB' })
	})
})

// ADD COACHING TO MY SCHEDULE (COACHINGS I ATTEND)
// router.post('/add_coaching_to_my_schedule', async (req, res) => {
// 	const {
// 		userId,
// 		coaching
// 	} = req.body

// 	// SIMPLE VALIDATION
// 	if (!coaching) {
// 		return res.status(400).json({ msg: 'Missing coaching' })
// 	}

// 	try {
// 		const user = await User.findOne({ _id: userId })
// 		if (!user) res.status(404).send({ msg: 'User does not exists' })
// 		if (user) {
// 			const alreadyAttendingActivity = user.activitiesIAttend.find(
// 				activity => activity._id === coaching._id
// 			)
// 			if (alreadyAttendingActivity) {
// 				return res.status(400).json({ msg: 'Alreay attending coaching' })
// 			}
// 			user.activitiesIAttend.push({
// 				_id: coaching._id,
// 				coaching
// 			})
// 			await user.save()
// 			res.status(204).send(user)
// 		}
// 	} catch(e) {
// 		console.log(e)
// 		res.send(e)
// 	}
// })

// REMOVE COACHING TO MY SCHEDULE (COACHINGS I ATTEND)
// router.delete('/remove_coaching_from_my_schedule', async (req, res) => {
// 	const {
// 		user_id,
// 		coaching_id
// 	} = req.query

// 	// SIMPLE VALIDATION
// 	if (!coaching_id) {
// 		return res.status(400).json({ msg: 'Missing coaching id' })
// 	}

// 	try {
// 		const user = await User.findOne({ _id: user_id })
// 		if (!user) res.status(404).send({ msg: 'User does not exists' })
// 		if (user) {
// 			const updatedActivities = user.activitiesIAttend.filter(
// 				activity => activity._id !== coaching_id
// 			)
// 			user.activitiesIAttend = updatedActivities
// 			await user.save()
// 			res.status(204).send(user)
// 		}
// 	} catch (e) {
// 		console.log(e)
// 		res.send(e)
// 	}
// })

// FETCH ALL AVAILABLE COACHINGS
router.get('/coachings', (req, res) => {

	Coaching.find()
	.then(coachings => {
		return res.send({ coachings })
	})
	.catch(e => res.send(e))
})

// FETCH PARTICULAR COACHING
router.get('/coaching', (req, res) => {

	const { id } = req.query

	Coaching.findOne({ _id: id })
		.then(coaching => {
			return res.send({ coaching })
		})
		.catch(e => res.send(e))
})

// FETCH COACHINGS FROM A PARTICULAR TRAINER
router.get('/trainer_coachings', async (req, res) => {

	const {
		coach_id,
		only_next,
		only_past
	} = req.query
	// if query param only_next=true or only_past=true
	// we send only the trainer's schedule next coaching or past coachingS
	if (only_next) {
		Coaching
			.find({
				coachId: coach_id,
				startingDate: {
					$gte: new Date()
				}
			})
			.sort({ startingDate: 1 })
			.limit(1)
			.then(coaching => {
				return res.send(coaching[0])
			})
			.catch(e => res.send(e))
	} else if (only_past) {
		Coaching
			.find({
				coachId: coach_id,
				startingDate: {
					$lte: new Date()
				}
			})
			.sort({ startingDate: -1 })
			.limit(20)
			.then(coachings => {
				return res.send(coachings)
			})
			.catch(e => res.send(e))
	} else {
		Coaching
			.find({
				coachId: coach_id,
				muxReplayPlaybackId: {
					$ne: null || ''
				}
			})
			.sort({ startingDate: -1 })
			.then(coachings => {
				return res.send({ coachings })
			})
			.catch(e => res.send(e))
	}
})

// FETCH REPLAY COACHINGS FROM A PARTICULAR TRAINER
router.get('/trainer_replay_coachings', async (req, res) => {

	const {
		coach_id
	} = req.query

	const coachings = await Coaching
		.find({
			coachId: coach_id,
			muxReplayPlaybackId: {
				$ne: null || ''
			}
		})
		.sort({ startingDate: 1 })
		return res.send(coachings)
})

// FETCH REPLAY COACHINGS FROM A PARTICULAR TRAINER
router.get('/trainer_future_coachings', async (req, res) => {

	const {
		coach_id
	} = req.query

	try {
		const coachings = await Coaching
			.find({
				coachId: coach_id,
				startingDate: { $gte: new Date() }
			})
			.sort({ startingDate: 1 })
		return res.send(coachings)
	} catch(e) {
		return res.send(e)
	}
})

// // FETCH PAST COACHINGS FROM A PARTICULAR TRAINER
// router.get('/trainer_past_coachings', async (req, res) => {

// 	const {
// 		coach_id
// 	} = req.query

// 	const coachings = await Coaching
// 		.find({
// 			coachId: coach_id,
// 			startingDate: { $lte: new Date() }
// 		})
// 		.sort({ startingDate: -1 })
// 	return res.send(coachings)
// })

// // CREATE A VONAGE SESSION
// router.get('/session', (req, res) => {
// 	// The session will use the OpenTok Media Router:
// 	opentok.createSession({ mediaMode: "routed" }, (err, session) => {
// 		if (err) {
// 			return res.send(err)
// 		}
// 		return res.send({ sessionId: session.sessionId })
// 	})
// })

// // CREATE A VONAGE SESSION TOKEN
// router.post('/token', (req, res) => {

// 	const options = {
// 		role: req.body.role,
// 		expireTime: (new Date().getTime() / 1000) + (1 * 3 * 60 * 60), // in three hours
// 	}

// 	const token = opentok.generateToken(req.body.sessionId, options)
// 	if(!token) {
// 		return res.send('Error in session token creation')
// 	}
// 	return res.send({ token })
// })

// VONAGE SESSION ACTIVITY CALLBACK URL
router.post('/session_activity', async (req, res) => {

	const {
		sessionId,
		event,
		timestamp,
		connection
	} = req.body

	let count = 0

	// LOGIC TO FIND NUMBER OF SUBSCRIBERS TO A SESSION AND LENGTH OF A SESSION

	if(sessionId) {

		if (event === 'connectionCreated') {
			if(count<1) {
				const archiveOptions = {
					"hasAudio": true,
					"hasVideo": true,
					// layout: {
					// 	type: "verticalPresentation",
					// },
					resolution: "1280x720"
				}

					// const archiveOptions = {
					// 	hasAudio: true,
					// 	hasVideo: true,
					// 	layout: {
					// 		type: "custom",
					// 		stylesheet: {
					// 			archive {
					// 				position: relative;
					// 				margin: 0;
					// 				width: 480px;
					// 				height: 640px;
					// 				overflow: hidden;
					// 			}
					// 		}
					// 	},
					// 	resolution: "1080x720"
					// }

				// opentok.startArchive(sessionId, archiveOptions, function (err, archive) {
				// 	if (err) {
				// 		console.log('')
				// 		console.log(err)
				// 		console.log('')
				// 		return res.send(500,
				// 			'Could not start archive for session ' + sessionId + '. error=' + err.message
				// 		)
				// 	}
				// 	console.log('')
				// 	console.log('')
				// 	console.log(archive)
				// 	console.log('')
				// 	console.log('')
				// 	// res.send(archive)
				// })
			}

			count = count + 1

			try {
				const coaching = (await Coaching.find({ sessionId: sessionId }))[0]
				if (!coaching) res.status(404).send({ msg: 'Coaching does not exist' })
				if(coaching) {
					coaching.numberOfViewers = (coaching.numberOfViewers || 0) + 1
					if (!coaching.sessionCreationDate) {
						coaching.sessionCreationDate = timestamp
						coaching.coachConnectionId = connection.id
					}
				}
				await coaching.save()
				res.status(204).send(coaching)
			} catch (e) {
				console.log('ERROR: ', e)
				res.send(e)
			}
		} else if (event === 'connectionDestroyed') {
			// UPDATING COACHING ITSELF
			try {
				const coaching = (await Coaching.find({ sessionId: sessionId }))[0]
				if (!coaching) res.status(404).send({ msg: 'Coaching does not exist' })
				if (
					coaching &&
					!coaching.sessionDestructionDate &&
					coaching.coachConnectionId === connection.id
				) {
					coaching.sessionDestructionDate = timestamp
					const diff = new Date(timestamp) - new Date(coaching.sessionCreationDate)
					const duration = Math.round((diff / 1000) / 60) // in minutes
					coaching.actualDuration = duration
					await coaching.save()

					// UPDATING USER STATS
					const user = await User.findOne({ _id: coaching.coachId })
					if (!user) res.status(404).send({ msg: 'User does not exists' })
					if(user) {
						const numberOfCoachings = (user.numberOfCoachings || 0) + 1
						const totalLengthOfCoachings = (user.totalLengthOfCoachings || 0) + duration
						const averageLengthOfCoaching = Math.round(totalLengthOfCoachings / numberOfCoachings)
						const coachingsTotalViewers = (user.coachingsTotalViewers || 0) + coaching.numberOfViewers
						const coachingsTotalViews = (user.coachingsTotalViews || 0) + coaching.numberOfViewers

						user.numberOfCoachings = numberOfCoachings
						user.totalLengthOfCoachings = totalLengthOfCoachings
						user.averageLengthOfCoaching = averageLengthOfCoaching
						user.coachingsTotalViewers = coachingsTotalViewers
						user.coachingsTotalViews = coachingsTotalViews

						await user.save()
						res.status(204).send(user)
					}

					// res.status(204).send(coaching)
				}
			} catch (e) {
				console.log('ERROR: ', e)
				res.send(e)
			}
		} else {
			res.status(200).send({ msg: 'Unuseful event'})
		}
	} else {
		res.status(400).send({ msg: 'No session id' })
	}
})

// // VONAGE ARCHIVE STARTING

// router.post('/start_archiving', function (req, res) {

// 	console.log('')
// 	console.log(req.body)
// 	console.log('')

// 	const { sessionId } = req.body
// 	const archiveOptions = {
// 		hasAudio: true,
// 		hasVideo: true,
// 		// layout: {
// 		// 	type: "custom",
// 		// 	stylesheet: "archive { position: relative; margin: 0; width: 480px; height: 640px; overflow: hidden; }; stream { width: 100%; height: 100% };"
// 		// },
// 		type: "bestFit",
// 		// resolution: "1080x720"
// 	}

// 	opentok.startArchive(sessionId, archiveOptions, function (err, archive) {
// 		if (err) {
// 			console.log('')
// 			console.log(err)
// 			console.log('')
// 			return res.send(500,
// 				'Could not start archive for session ' + sessionId + '. error=' + err.message
// 			)
// 		}
// 		console.log('')
// 		console.log('')
// 		console.log(archive)
// 		console.log('')
// 		console.log('')
// 		res.send(archive)
// 	})
// })

// // VONAGE ARCHIVE STOPING

// router.get('/stop_archiving/:archiveId', function (req, res) {
// 	const archiveId = req.param('archiveId')
// 	opentok.stopArchive(archiveId, function (err, archive) {
// 		if (err) return res.send(500, 'Could not stop archive ' + archiveId + '. error=' + err.message)
// 		console.log('')
// 		console.log('')
// 		console.log(archive)
// 		console.log('')
// 		console.log('')
// 		res.send(archive)
// 	})
// })

// // VONAGE ARCHIVE CALLBACK RUI

// router.post('/archive_callback', async (req, res) => {
// 	console.log('')
// 	console.log('')
// 	console.log('')
// 	console.log('archive callback route', req.body)
// 	console.log('')
// 	console.log('')
// 	console.log('')

// 	const { id, sessionId } = req.body

// 	try {
// 		const coaching = await Coaching.findOne({ sessionId })
// 		if (!coaching) return res.status(404).json({ msg: 'Coaching does not exist' })
// 		if (coaching) {
// 			coaching.archiveId = id
// 			coaching.muxReplayPlaybackId = `${bucketS3BaseUrl}/${id}/archive.mp4`
// 			await coaching.save()
// 		}
// 		res.status(200).send(coaching)
// 	} catch (e) {
// 		res.json({ msg: 'Something went wrong finding the coaching in DB' })
// 	}
// })

module.exports = router
