const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StoreTransferSchema = new Schema({
	ios: {
		type: String,
		defaut: 'pending',
		required: true
	},
	android: {
		type: String,
		defaut: 'pending',
		required: true
	},
	month: {
		type: Number,
		default: null
	}
})

module.exports = StoreTransfer = mongoose.model('storeTransfer', StoreTransferSchema)