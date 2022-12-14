const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching')

const ProgramSchema = new Schema(
	{
		title: {
			type: String,
			required: true
		},
        description: {
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
		programRating: {
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
		level: {
			type: String,
			default: 'allLevel'
		},
		equipment: {
			type: Array,
			default: []
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
		price: {
			type: Number,
			required: true
		},
        coachings: {
            type: Array,
            default: [],
            required: true
        }
	}
)

ProgramSchema.plugin(mongoose_fuzzy_searching, {
	fields: [
		'coachUserName',
		'sport',
		'title'
	]
})

const Program = mongoose.model('program', ProgramSchema)
module.exports = Program

