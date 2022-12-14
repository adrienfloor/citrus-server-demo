const express = require('express')
const router = express.Router()

const User = require('../models/user')
const Transaction = require('../models/transaction')
const StoreTransfer = require('../models/store-transfer')

// FETCH A SPECIFIC MONTH TRANSFER

router.get('/', async (req, res) => {
	const month = new Date()
	try {
		const storeTransfer = await StoreTransfer.findOne({ month: month.getMonth() })
		if (!storeTransfer) return res.send(null)
		if(storeTransfer) {
			return res.send(storeTransfer)
		}
	} catch (e) {
		return res.status(500).json({ msg: e })
	}
})

// CREATE A SPECIFIC MONTH TRANSFER

router.post('/', async (req, res) => {
	const {
		month,
		ios,
		android
	} = req.body

	if (!month) {
		return res.status(400).json({ msg: 'Missing month parameter' })
	}

	const monthToDate = new Date()
	const date = new Date(monthToDate.setDate(15))
	const platform = android === 'done' ? 'android' : 'ios'

	try {
		const storeTransfer = await StoreTransfer.findOne({ month: monthToDate.getMonth() })
		if (storeTransfer) return res.status(400).json({ msg: 'Transfer already exists' })
		if (!storeTransfer) {
			const newStoreTransfer = new StoreTransfer({
				month: monthToDate.getMonth(),
				ios: ios || 'pending',
				android: android || 'pending'
			})
			newStoreTransfer.save()
			.then(transfer => {
				Transaction.updateMany({
					platform,
					storeTransferDate: { $lte: new Date(date.setDate(date.getDate() + 1)) },
					storeTransferStatus: "pending"
				},
					{
						$set: {
							citrusCommissionStatus: "done",
							storeTransferStatus: "done"
						}
					})
					.then(() => {
						return res.send(transfer)
					})
			})
		}
	} catch (e) {
		console.log(e)
		return res.status(500).json({ msg: e })
	}
})

// UDATE A SPECIFIC MONTH TRANSFER

router.put('/', async (req, res) => {
	const {
		month,
		ios,
		android
	} = req.body

	if (!month) {
		return res.status(400).json({ msg: 'Missing month parameter' })
	}

	const monthToDate = new Date()
	const date = new Date(monthToDate .setDate(15))
	const platform = android === 'done' ? 'android' : 'ios'

	try {
		const storeTransfer = await StoreTransfer.findOne({ month: monthToDate.getMonth() })
		if (!storeTransfer) return res.status(404).json({ msg: 'Transfer does not exist' })
		if (storeTransfer) {
			storeTransfer.android = android
			storeTransfer.ios = ios
			storeTransfer.save()
				.then(transfer => {
					Transaction.updateMany({
						platform,
						storeTransferDate: { $lte: new Date(date.setDate(date.getDate() + 1)) },
						storeTransferStatus: "pending"
					},
						{
							$set: {
								citrusCommissionStatus: "done",
								storeTransferStatus: "done"
							}
						})
						.then(() => {
							return res.send(transfer)
						})
				})
		}
	} catch (e) {
		return res.status(500).json({ msg: e })
	}
})

module.exports = router