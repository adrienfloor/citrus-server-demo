const express = require('express')
const router = express.Router()
const { google } = require('googleapis')

const User = require('../models/user')
const Coaching = require('../models/coaching')
const Transaction = require('../models/transaction')

// CREATE TRANSACTION

router.post('/', async (req, res) => {
	const {
		platform,
		coachingId,
		buyerId,
		coachId
	} = req.body

	const initialDate = new Date()
	initialDate.setDate(27)
	const numberOfMonths = platform === 'ios' ? 2 : 1
	const dateWithUpdatedMonth = new Date(initialDate.setMonth(initialDate.getMonth() + numberOfMonths))
	const storeTransferDate = new Date(dateWithUpdatedMonth.setDate(15))
	const citrusCommissionDate = storeTransferDate

	try {
		// SIMPLE VALIDATION
		if (!coachingId || !buyerId || !coachId) {
			return res.status(400).json({ msg: 'Missing parameters' })
		}
		const coaching = await Coaching.findOne({ _id: coachingId })
		if (!coaching) return res.status(404).json({ msg: 'Coaching does not exist' })
		const buyer = await User.findOne({ _id: buyerId })
		if (!buyer) return res.status(404).json({ msg: 'Buyer does not exist' })
		const coach = await User.findOne({ _id: coachId })
		if (!coach) return res.status(404).json({ msg: 'Coach does not exist' })

		const newTransaction = new Transaction({
			platform,
			coachingId,
			buyerId,
			coachId,
			initialDate: new Date(),
			storeTransferDate,
			citrusCommissionDate
		})
			.save()
			.then(transaction => {
				if (transaction) return res.json(transaction)
			})
			.catch(e => {
				console.log('error', e)
				return res.send(e)
			})
	} catch(e) {
		console.log(e)
		res.send(e)
	}
})

// UPDATE TRANSACTION

router.put('/', async (req, res) => {

	const { _id } = req.body

	try {
		const transaction = await Transaction.findOne({ _id })
		if (!transaction) return res.status(404).json({ msg: 'Transaction does not exist' })
		if (transaction) {
			Object.keys(transaction.toJSON()).forEach((key, i) => {
				if (req.body[key] !== undefined) {
					transaction[key] = req.body[key]
				}
				if (i === (Object.keys(transaction.toJSON()).length - 1)) {
					transaction.save()
						.then(updatedTransaction => {
							return res.json(updatedTransaction)
						})
				}
			})
		}
	} catch (e) {
		res.json({ msg: 'Something went wrong finding the transaction in DB' })
	}
})

// CREATE GOOGLESHEET WITH SPECIFIC VALUES

router.post('/generate_sheet', async (req, res) => {

	const {
		startDate,
		endDate,
		platform
	} = req.body

	try {

		let transactions = []
		if (platform === 'both') {
			transactions = await Transaction.find({
				initialDate: {
					$gte: new Date(startDate),
					$lte: new Date(endDate)
				}
			}).select('-__v').lean()
			console.log(transactions, transactions.length)
			if(transactions.length === 0) return res.status(204).send('')
		} else {
			transactions = await Transaction.find({
				initialDate: {
					$gte: new Date(startDate),
					$lte: new Date(endDate)
				},
				platform
			}).select('-__v').lean()
			console.log(transactions, transactions.length)
			if(transactions.length === 0) return res.status(204).send('')
		}

		const orderedTransactions = transactions.map(
			transaction => (
				Object.keys(transaction).sort().reduce(
					(obj, key) => {
						obj[key] = transaction[key]
						return obj
					},
					{}
				)
			)
		)
		const sheetHeaders = [
			"Transaction Id",
			"Amount",
			"Buyer id",
			"Cashout amount",
			"Cashout date",
			"Cashout status",
			"Citrus commission amount",
			"Citrus commission date",
			"Citrus commission status",
			"Coach id",
			"Coaching id",
			"Initial date",
			"Platform",
			"Store transfer amount",
			"Store transfer date",
			"Store transfer status",
			"Type"
		]

		const transactionsValues = orderedTransactions.map(transaction => Object.values(transaction))
		const sheetValues = [
			sheetHeaders,
			...transactionsValues
		]

		const auth = new google.auth.GoogleAuth({
			keyFile: 'credentials-google-spreadsheet.json',
			scopes: [
				'https://www.googleapis.com/auth/spreadsheets',
				'https://www.googleapis.com/auth/drive',
				'https://www.googleapis.com/auth/drive.file'
			]
		})

		const client = await auth.getClient()

		const googleSheets = google.sheets({ version: 'v4', auth: client })
		const googleDrive = google.drive({ version: 'v3', auth: client })

		const createOption = {
			resource: {
				properties: {
					title: new Date()
				}
			}
		}

		const newSheet = await googleSheets.spreadsheets.create(createOption)

		const moveOption = {
			fileId: newSheet.data.spreadsheetId, //You will insert this later
			addParents: ["1zlTrLEqfADiXBZn0mbcTDoHPX5mOIsbp"]
		}

		const moveSheet = await googleDrive.files.update(moveOption)

		const updateSheetWithValues = await googleSheets.spreadsheets.values.append({
			auth,
			spreadsheetId: newSheet.data.spreadsheetId,
			range: 'Sheet1!A:N',
			valueInputOption: 'USER_ENTERED',
			resource: { values: sheetValues }
		})
		res.sendStatus(201)
	} catch (error) {
		console.log('Error : ', error)
	}

})

module.exports = router