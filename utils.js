
module.exports = {

	addDays: function(days){
		const newDate = new Date(new Date().setDate(new Date().getDate() + days)).setHours(new Date().getHours() + 2)
		return new Date(newDate)
	},

	removeDays: function(days) {
		const newDate = new Date(new Date().setDate(new Date().getDate() - days)).setHours(new Date().getHours() + 2)
		return new Date(newDate)
	},

	addHours: function(hours) {
		const newDate = new Date().setHours(new Date().getHours() + hours + 2)
		return new Date(newDate)
	},

	getStartingTime: function(date) {
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
	},

	minutesBetweenDates: function(date1, date2) {
		const diff = Math.abs(date1 - date2)
		const minutes = Math.floor((diff / 1000) / 60)
		return minutes
	},

	getNextTrainingTimer: async function(io, userActivities, userId, Coaching){
		const minutesBetweenDates = (date1, date2) => {
			const date1Formated = new Date(date1)
			const date2Formated = new Date(date2)
			const diffInMs = date2Formated.getTime() - date1Formated.getTime()
			const minutesConvert = 1000 * 60
			const diffInMin = diffInMs / minutesConvert
			return diffInMin
		}
		for(let i=0;i<userActivities.length;i++) {
			const diff = minutesBetweenDates(new Date(userActivities[i].coaching.startingDate), new Date())
			console.log('diff : ', diff)
			if (diff<6 && diff>-6) {
				const coaching = await Coaching.findOne({ _id: userActivities[i]._id })
				if(coaching) {
					console.log('')
					console.log('')
					console.log('upcoming coaching : ', coaching)
					console.log('')
					console.log('')
					return io.emit(`coaching_coming_soon_${userId}`, coaching)
				}
			}
		}
	}
}
