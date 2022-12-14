const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const base64 = require('base-64')
const { v4: uuidv4 } = require('uuid')

const fs = require('fs')
resolve = require('path').resolve
const request = require('request');

const auth = require('../middlewares/auth')
const Coaching = require('../models/coaching')
const User = require('../models/user')
const { sendMail } = require('../services/mailer')

const {
	muxAccessTokenId,
	muxSecretKey,
	origin
} = require('../config')

module.exports = function (io) {

	// CREATE A MUX STREAM 

	router.post('/create_stream', async (req, res) => {

		const { coaching_id } = req.query

		try {
			const muxResponse = await fetch('https://api.mux.com/video/v1/live-streams', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + base64.encode(`${muxAccessTokenId}:${muxSecretKey}`)
				},
				body: JSON.stringify({ "playback_policy": ["public"], "new_asset_settings": { "playback_policy": ["public"] } })
			})

			const stream = await muxResponse.json()
			const coaching = await Coaching.findOne({ _id: coaching_id })

			if (coaching && stream && stream.data) {
				coaching.muxStreamKey = stream.data.stream_key
				const livePlaybackId = stream.data.playback_ids[0].id
				coaching.muxLivePlaybackId = `https://stream.mux.com/${livePlaybackId}`
				coaching.save()
					.then(updatedCoaching => {
						io.emit(`live_coaching_is_ready_${coaching_id}`, updatedCoaching.muxLivePlaybackId)
						return res.status(201).json(updatedCoaching)
					})
			}
		} catch (e) {
			console.log('')
			console.log('')
			console.log('ERROR : ')
			console.log(e)
			console.log('')
			console.log('')
			res.json({ msg: e })
		}
	})

	// DELETE A MUX STREAM

	router.delete('/delete_stream', async (req, res) => {

		const { stream_id } = req.query

		try {
			const response = await fetch(`https://api.mux.com/video/v1/live-streams/${stream_id}`, {
				method: 'DELETE',
				headers: {
					'Authorization': 'Basic ' + base64.encode(`${muxAccessTokenId}:${muxSecretKey}`)
				}
			})
			return res.status(response.status)
		} catch (e) {
			res.json({ msg: e })
		}
	})


	// UPDATE COACHING WITH ASSET PLAYBACK ID

	router.put('/update_coaching_asset_playback_id', async (req, res) => {

		const { coachingId, assetId } = req.body

		try {
			const muxResponse = await fetch(`https://api.mux.com/video/v1/assets/${assetId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + base64.encode(`${muxAccessTokenId}:${muxSecretKey}`)
				}
			})

			const replay = await muxResponse.json()
			const coaching = await Coaching.findOne({ _id: coachingId })

			if (coaching) {
				const playbackId = replay.data.playback_ids[0].id
				coaching.muxReplayPlaybackId = `https://stream.mux.com/${playbackId}.m3u8`
				coaching.save()
					.then(updatedCoaching => {
						return res.status(200).json(updatedCoaching)
					})
			}
		} catch (e) {
			res.json({ msg: e })
		}
	})


	// HANDLE MUX WEBHOOKS

	router.post('/mux_webhooks', async (req, res) => {

		const { type, data } = req.body
		let muxLivePlaybackId = ''
		let assetId = ''

		switch (type) {
			// LIVE STREAM EVENTS
			case 'video.live_stream.created':
				console.log('video.live_stream.created')
				io.emit('live_stream_created')
				break;
			case 'video.live_stream.connected':
				console.log('video.live_stream.connected')
				break;
			case 'video.live_stream.recording':
				console.log('video.live_stream.recording')
				assetId = data.active_asset_id
				io.emit(`live_stream_recording_${data.stream_key}`, assetId)
				break;
			case 'video.live_stream.active':
				console.log('video.live_stream.active')
				break;
			case 'video.live_stream_idle':
				console.log('video.live_stream_idle')
			case 'video.live_stream.disconnected':
				console.log('video.live_stream.disconnected')
				break;
			// VIDEO ASSETS EVENTS
			case 'video.asset.created':
				console.log('video.asset.created')
				break;
			case 'video.asset.ready':
				try {
					console.log('')
					console.log('')
					console.log('WEBHOOK video.asset.ready')
					console.log('')
					console.log('')
					console.log(data)
					console.log('')
					console.log('')
					if (data && data.status === 'ready' && data.playback_ids[0] && data.passthrough) {
						const muxReplayPlaybackId = `https://stream.mux.com/${data.playback_ids[0].id}.m3u8`
						const coaching = await Coaching.findOne({ passthrough: data.passthrough })
						if (coaching) {
							console.log('')
							console.log('coaching found : ', coaching)
							console.log('')
							console.log('')
							console.log(`coaching_ready_${coaching?.passthrough}`)
							console.log('')
							coaching.isReplayReady = true
							coaching.muxReplayPlaybackId = muxReplayPlaybackId
							const duration = data.duration
							coaching.duration = duration ? (Math.floor(duration / 60)) : ''
							coaching.save().then(coaching => {
								io.emit(`coaching_ready_${coaching.passthrough}`, coaching)
								io.emit(`coaching_ready_${coaching.coachId}`, coaching)
							})
							const coach = await User.findOne({ _id: coaching.coachId })
							if(coach.email) {
								sendMail(
									coach.email,
									'Training Citrus',
									`<div>
									Congratulations, your new training is now available in the Citrus App !
									</div>`
								)
							}
						}
					}
				} catch (e) {
					console.log(e)
				}

				muxLivePlaybackId = `https://stream.mux.com/${data.playback_ids[0].id}.m3u8`
				io.emit(`video_asset_ready_${data.id}`, muxLivePlaybackId)
				break;
			case 'video.asset.errored':
				console.log('video.asset.errored')
				console.log(data)
				break;
			case 'video.upload.asset_created':
				console.log('video.upload.asset_created')
				break;
			case 'video.upload.cancelled':
				console.log('video.upload.cancelled')
				break;
			case 'video.upload.errored':
				console.log('video.upload.errored')
				console.log(data)
				break;
			case 'video.asset.live_stream_completed':
				console.log('video.asset.live_stream_completed')
				try {
					console.log(data)
					if (data && data.playback_ids[0]) {
						const muxReplayPlaybackId = `https://stream.mux.com/${data.playback_ids[0].id}.m3u8`
						const coaching = await Coaching.findOne({ muxReplayPlaybackId })
						if (coaching) {
							coaching.isReplayReady = true
							coaching.save()
						}
					}
				} catch (e) {
					console.log(e)
				}
				break;
			default:
				break;
		}
		return res.status(200).send('OK')
	})

	// CREATE A MUX UPLOAD URL

	router.get('/create_mux_upload_url', async (req, res) => {
		const passthrough = uuidv4()
		try {
			const muxResponse = await fetch('https://api.mux.com/video/v1/uploads', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + base64.encode(`${muxAccessTokenId}:${muxSecretKey}`)
				},
				body: JSON.stringify({
					"timeout": 10800,
					"playback_policy": ["public"],
					"cors_origin": origin,
					"new_asset_settings": {
						"playback_policy": ["public"],
						"passthrough": passthrough,
						"mp4_support": "standard"
					}
				})
			})

			const jsonResponse = await muxResponse.json()
			if (jsonResponse) {
				return res.status(201).send(jsonResponse)
			}
		} catch (e) {
			console.log('Error creating Mux upload url : ')
			res.json({ msg: e })
		}
	})

	router.post('/video_upload', async (req, res) => {
		console.log('')
		console.log('')
		console.log('video_upload body : ', req.body)
		console.log('')
		console.log('')


		if (!req.body.fileURL && !req.body.muxURL) {
			console.log('')
			console.log('File was not found')
			return res.send("File was not found");
		}

		try {
			const coaching = await Coaching.findOne({ _id: req.body.coaching_id })
			if (!coaching) return res.status(404).json({ msg: 'Coaching does not exist' })
			if (coaching) {
				console.log('Find coaching', coaching, 'pass :: ', req.body.passthrough);
				Object.keys(coaching.toJSON()).forEach((key, i) => {
					coaching['passthrough'] = req.body.passthrough
					coaching['ratio'] = req.body.ratio
					if (i === (Object.keys(coaching.toJSON()).length - 1)) {
						coaching.save()
							.then(async updatedCoaching => {
								try {
									const url = req.body.fileURL
									console.log('')
									console.log('')
									console.log('url : ', url)
									console.log('')
									console.log('')
									// const filename = url.substring(url.lastIndexOf('/') + 1);
									const muxUpload = await fs.createReadStream(url).pipe(request.put(req.body.muxURL));
									// req.io.emit(`UPLOAD_COMPLETE_${req.body.user_id}`, { coaching: muxUpload })
									io.emit(`UPLOAD_COMPLETE_${req.body.user_id}`, { coaching: muxUpload })
									// fs.unlink(resolve("files/" + filename), function (err) {
									// 	if (err) throw err;
									// 	console.log("File deleted");
									// });
								} catch (error) {
									console.error(error);
									return res.json({ msg: 'Something went wrong finding the coaching in DB' })
								}
							})
					}
				})
			}
		} catch (e) {
			console.log('An error occurs during updating coaching details', e);
			return res.send('An error occurred during updating coaching: ' + err.message);
		}
		return res.status(200).send({ status: true, message: 'video uploading...' })
	})
	return router
}
