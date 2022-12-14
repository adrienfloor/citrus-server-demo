const express = require('express')
const router = express.Router()

const Notification = require('../models/notification')

// CREATE NEW NOTIFICATION
router.post('/', (req, res) => {

	const {
		message,
		userId,
		date
	} = req.body

	if (
		!message ||
		!userId
	) {
		return res.status(400).json({ msg: 'Missing parameters of notification' })
	}

	const notification = new Notification({
		message,
		userId,
		date
	})
		.save()
		.then(notification => {
			if (notification) return res.json(notification)
		})
		.catch(e => {
			return res.send(e)
		})
})

// FETCH ALL NOTIFICATIONS OF A USER
router.get('/', (req, res) => {

	const { id } = req.query

	Notification
		.find({ userId: id })
		.sort({ startingDate: 1 })
		.then(notifications => {
			return res.send(notifications)
		})
		.catch(e => res.send(e))
})

// UPDATE NOTIFICATION TO SEEN
router.put('/update_notification', async (req, res) => {

	const { id } = req.body

	try {
		let notification = (await Notification.find({ _id: id }))[0]
		if (!notification) return res.status(404).json({ msg: 'Notification does not exist' })
		if (notification) {
			notification.seen = true
			await notification.save()
			return res.send(notification)
		}
	} catch (e) {
		res.json({ msg: 'Something went wrong finding the notification in DB' })
	}
})

// DELETE A NOTIFICATION OF A USER
router.delete('/', (req, res) => {

	const { id, user_id } = req.query

	Notification
		.findOneAndRemove({ userId: user_id, _id: id })
		.then(response => {
			console.log('DELETE $$$$$$', response)
			return res.status(204).json(response)
		})
		.catch(e => res.send(e))
})

module.exports = router