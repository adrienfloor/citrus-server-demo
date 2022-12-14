const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
	message: {
		type: String,
		required: true
	},
	userId: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now(),
		required: true
	},
	seen: {
		type: Boolean,
		default: false
	},
	category: {
		type: String,
		default: 'zoneNotifications'
	}
})

module.exports = Notification = mongoose.model('notification', NotificationSchema)