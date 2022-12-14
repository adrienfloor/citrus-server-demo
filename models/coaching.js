const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching')

const CoachingSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
		coachFirstName: {
			type: String
		},
		coachLastName: {
			type: String
		},
		coachUserName: {
			type: String,
			required: true
		},
		coachId: {
			type: String,
			required: true
		},
		coachRating: {
			type: Number
		},
		coachingRating: {
			type: Object,
			default: {
				rating: null,
				numberOfRatings: 0
			},
			require: true
			// { rating: 1 to 5, numberOfRatings: x }
		},
		sport: {
			type: String,
			required: true
		},
		duration: {
			type: Number
		},
		level: {
			type: String,
			default: 'allLevel'
		},
		equipment: {
			type: Array,
			default: []
		},
		startingDate: {
			type: Date,
			required: true
		},
		startingTime: {
			type: Number
		},
		pictureUri: {
			type: String,
			required: true
		},
		focus: {
			type: Array,
			default: []
		},
		coachingLanguage: {
			type: String,
			default: ''
		},
		freeAccess: {
			type: Boolean,
			default: false
		},
		muxStreamKey: {
			type: String,
			default: ''
		},
		muxLivePlaybackId: {
			type: String,
			default: ''
		},
		muxReplayPlaybackId: {
			type: String,
			default: ''
		},
		isReplayReady: {
			type: Boolean,
			default: true // BECAUSE NO LIVE ON V1
		},
		sessionCreationDate: {
			type: Date
		},
		sessionDestructionDate: {
			type: Date
		},
		numberOfViewers: {
			type: Number,
			default: 0
		},
		actualDuration: {
			type: String
		},
		isLive: {
			type: Boolean,
			default: false
		},
		isLiveOver: {
			type: Boolean,
			default: true // BECAUSE NO LIVE ON V1
		},
		livePayers: {
			type: Number,
			default: 0
		},
		replayPayers: {
			type: Number,
			default: 0
		},
		passthrough: {
			type: String,
			default: null
		},
		ratio: {
			type: String,
			default: 'portrait'
		},
		price: {
			type: Number,
			required: true
		},
		programOnly: {
			type: Boolean,
			default: false
		}
	}
)

CoachingSchema.plugin(mongoose_fuzzy_searching, {
	fields: [
		'coachUserName',
		'sport',
		'title'
	]
})

const Coaching = mongoose.model('coaching', CoachingSchema)
module.exports = Coaching

