const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CashoutSchema = new Schema({
	user: {
		type: Object,
		required: true
	},
	date: {
		type: Date,
		default: Date.now(),
		required: true
	},
	status: {
		type: Number,
		default: 0 // 0 for pending, 1 for processed
	},
	value: {
		type: Number,
		default: 0
	}
})

module.exports = Cashout = mongoose.model('cashout', CashoutSchema)