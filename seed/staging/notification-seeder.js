const Notification = require('../../models/notification')
const mongoose = require('mongoose')

// Heroku dev database
const databaseUrl = require('../../config').mongoUri
mongoose.connect(databaseUrl, {
	useNewUrlParser: true,
	// useCreateIndex: true,
	useUnifiedTopology: true
})

const notifications = [
	// ADRIEN FLOOR
	new Notification({
		message: "Don't forget to plan your next session",
		userId: "5f412f4bdff0cd00046a07ce",
		date: Date.now(),
		seen: false,
		category: 'zoneNotifications'
	}),
	// KARINA KLOP
	new Notification({
		message: "Don't forget to plan your next session",
		userId: "5f4427e06cc26300049d666b",
		date: Date.now(),
		seen: false,
		category: 'zoneNotifications'
	}),
	// JIMMY Ducan
	new Notification({
		message: "Don't forget to plan your next session",
		userId: "5f456523deb03a000469f572",
		date: Date.now(),
		seen: false,
		category: 'zoneNotifications'
	}),
	// KAMILLA LOU
	new Notification({
		message: "Don't forget to plan your next session",
		userId: "5f456b93deb03a000469f576",
		date: Date.now(),
		seen: false,
		category: 'zoneNotifications'
	}),
]

let done = 0
for (let i = 0; i < notifications.length; i++) {
	console.log('***************    ', i, '    *******************')
	notifications[i].save((err, result) => {
		console.log('ERR:', err)
		console.log('RESULT:', result)
		done++
		if (done === notifications.length) {
			exit()
		}
	})
}

const exit = () => {
	mongoose.disconnect()
}