const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

const Cashout = require('../models/cashout')
const User = require('../models/user')
const Transaction = require('../models/transaction')

const { iOSVerificationPassword } = require('../config')

// verify iOS iap receipt
router.post('/verify_receipt', async (req, res) => {

	const { receipt } = req.body
	let result = null
	try {
		const productionResponse = await fetch('https://buy.itunes.apple.com/verifyReceipt', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"receipt-data": receipt,
				"password": iOSVerificationPassword,
				"exclude-old-transactions": true
			})
		})

		result = await productionResponse.json()
		console.log('')
		console.log('')
		console.log('')
		console.log('iap production response')
		console.log(result)
		console.log('')
		console.log('')
		console.log('')
		if(result && result.status) {
			if(result.status !== 21007) {
				return res.send(result)
			} else {
				try {
					const sandboxResponse = await fetch('https://sandbox.itunes.apple.com/verifyReceipt', {
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({
							"receipt-data": receipt,
							"password": iOSVerificationPassword,
							"exclude-old-transactions": true
						})
					})
					result = await sandboxResponse.json()
					console.log('')
					console.log('')
					console.log('')
					console.log('iap sandobox response')
					console.log(result)
					console.log('')
					console.log('')
					console.log('')
					return res.send(result)
				} catch (e) {
					console.log(e)
					res.json({ msg: e })
				}
			}
		}
	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

router.get('/cash_out_amount', async (req, res) => {
	const { _id } = req.query
	try {
		const user = await User.findOne({ _id })
		if (!user) return res.status(404).json({ msg: 'User does not exist' })
		const availableTransactions = await Transaction.find({
			coachId: _id,
			storeTransferDate: { $lte: new Date() },
			cashOutStatus: "none"
		})
		console.log()
		console.log(availableTransactions)
		console.log()
		const cashOutAmount = availableTransactions.length * 1.60
		return res.json(cashOutAmount)
	} catch (e) {
		console.log(e)
		res.send({ msg: e })
	}

})

router.post('/cash_out', async (req, res) => {
	const { _id } = req.body.user

	try {
		const user = await User.findOne({ _id })
		if (!user) return res.status(404).json({ msg: 'User does not exist' })
		if (user.cashOutState === 1) return res.status(400).json({ msg: 'Cashout already pending' })

		const availableTransactions = await Transaction.find({
			coachId: _id,
			storeTransferDate: { $lte: new Date() },
			cashOutStatus: "none"
		})
		const cashOutAmount = availableTransactions.length * 1.60
		if (cashOutAmount < 100) return res.status(400).json({ msg: 'Not enough gains to cash out' })

		const monthOfLastCashOut = user.lastCashOutDate ? (new Date(user.lastCashOutDate)).getMonth() : null
		const currentMonth = (new Date()).getMonth()
		if (monthOfLastCashOut == currentMonth) return res.status(400).json({ msg: 'Already cashed out this month' })

		if (user) {
			Transaction.updateMany({
				coachId: _id,
				storeTransferDate: { $lte: new Date() },
				cashOutStatus: "none"
			},
			{
				$set: {
					cashOutStatus: 'pending'
				}
			})
			.then(() => {
				user.lastCashOutDate = new Date()
				user.cashOutState = 1
				user.save()
				.then(updatedUser => {
					const newCashout = new Cashout({
						user: updatedUser,
						date: new Date(),
						status: 0,
						value: cashOutAmount
					})
					newCashout.save()
						.then(cashout => {
							return res.json(cashout)
						})
				})
			})
		}
	} catch (e) {
		console.log(e)
		res.json({ msg: 'Something went wrong creating the cashout' })
	}
})

router.get('/cash_outs', async (req, res) => {

	try {
		const cashouts = await Cashout.find()
		return res.json(cashouts)
	} catch (e) {
		res.json({ msg: 'Something went wrong fetching the cashouts' })
	}
})

router.put('/cash_out', async (req, res) => {
	const { cashout } = req.body

	try {
		const cashoutToUpdate = await Cashout.findOne({ _id: cashout._id })
		const userToUpdate = await User.findOne({ _id: cashout.user._id })

		if (!cashoutToUpdate) return res.status(404).json({ msg: 'Cashout object does not exist' })
		if (!userToUpdate) return res.status(404).json({ msg: 'User does not exist' })

		const availableTransactions = await Transaction.find({
			coachId: cashout.user._id,
			storeTransferDate: { $lte: cashout.date },
			cashOutStatus: "pending"
		})
		const cashOutAmount = availableTransactions.length * 1.60

		if (cashoutToUpdate && userToUpdate && cashoutToUpdate.status === 0) {
			Transaction.updateMany({
				coachId: cashout.user._id,
				storeTransferDate: { $lte: cashout.date },
				cashOutStatus: "pending"
			},
				{
					$set: {
						cashOutStatus: 'done',
						cashOutDate: new Date()
					}
				})
				.then(() => {
					userToUpdate.currentGains = userToUpdate.currentGains - cashOutAmount
					userToUpdate.cashOutState = 0
					userToUpdate.save()
					.then(updatedUser => {
						cashoutToUpdate.status = 1
						cashoutToUpdate.user = updatedUser
						cashoutToUpdate.save()
						.then(updatedCashout => {
							res.json(updatedCashout)
							return
						})
						.catch(e => {
							return res.json({ msg: e })
						})
					})
				})
		} else {
			res.send([])
		}
	} catch (e) {
		return res.json({ msg: 'Something went wrong updating the cashout' })
	}
})

module.exports = router