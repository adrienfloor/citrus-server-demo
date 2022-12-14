const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TransactionSchema = new Schema({
	platform: {
		type: String,
		default: 'ios'
	},
	coachingId: {
		type: String,
		required: true
	},
	buyerId: {
		type: String,
		required: true
	},
	coachId: {
		type: String,
		required: true
	},
	initialDate: {
		type: Date,
		default: new Date()
	},
	type: {
		type: String,
		default: 'replay'
	},
	amount: {
		type: Number,
		default: 2.29
	},
	storeTransferStatus: {
		type: String,
		default: 'pending'
	},
	storeTransferAmount: {
		type: Number,
		default: 1.95
	},
	storeTransferDate: {
		type: Date,
		default: null
	},
	cashOutAmount: {
		type: Number,
		default: 1.60
	},
	cashOutStatus: {
		type: String,
		default: 'none'
	},
	cashOutDate: {
		type: Date,
		default: null
	},
	citrusCommissionAmount: {
		type: Number,
		default: 0.34
	},
	citrusCommissionStatus: {
		type: String,
		default: 'pending'
	},
	citrusCommissionDate: {
		type: Date,
		default: null
	}
})

module.exports = Transaction = mongoose.model('transaction', TransactionSchema)