const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const base64 = require('base-64')

const {
	mangoPayClientId,
	mangoPayApiKey,
	mangoPayApiUrl,
	origin,
	citrusWalletId
} = require('../config')

const { updateMemberTag } = require('../services/mailchimp')

// MANGOPAY IMPLEMENTATION //

// create natural user

router.post('/mp_create_user', async (req, res) => {

	const {
		FirstName,
		LastName,
		Birthday,
		Nationality,
		CountryOfResidence,
		Email
	} = req.body

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/natural`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				FirstName,
				LastName,
				Birthday,
				Nationality,
				CountryOfResidence,
				Email
			})
		})

		const user = await mpResponse.json()
		return res.status(201).send(user)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// create legal user

router.post('/mp_create_legal_user', async (req, res) => {

	const {
		LegalPersonType,
		Name,
		LegalRepresentativeFirstName,
		LegalRepresentativeLastName,
		LegalRepresentativeBirthday,
		LegalRepresentativeNationality,
		LegalRepresentativeCountryOfResidence,
		LegalRepresentativeEmail,
		Email,
		HeadquartersAddress,
		CompanyNumber
	} = req.body

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/legal`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				LegalPersonType,
				Name,
				LegalRepresentativeFirstName,
				LegalRepresentativeLastName,
				LegalRepresentativeBirthday,
				LegalRepresentativeNationality,
				LegalRepresentativeCountryOfResidence,
				LegalRepresentativeEmail,
				Email,
				HeadquartersAddress,
				CompanyNumber,
				LegalRepresentativeAddress: HeadquartersAddress
			})
		})

		const user = await mpResponse.json()
		if (Email && user) {
			updateMemberTag(Email, 'new coach', 'inactive')
			updateMemberTag(Email, 'coach', 'active')
			updateMemberTag(Email, '1st video posted', 'active')
		}
		return res.status(201).send(user)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})


// update legal user

router.put('/mp_update_legal_user', async (req, res) => {

	const {
		UserId,
		LegalPersonType,
		Name,
		LegalRepresentativeFirstName,
		LegalRepresentativeLastName,
		LegalRepresentativeBirthday,
		LegalRepresentativeNationality,
		LegalRepresentativeCountryOfResidence,
		LegalRepresentativeEmail,
		Email,
		HeadquartersAddress,
		CompanyNumber
	} = req.body

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/legal/${UserId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				LegalPersonType,
				Name,
				LegalRepresentativeFirstName,
				LegalRepresentativeLastName,
				LegalRepresentativeBirthday,
				LegalRepresentativeNationality,
				LegalRepresentativeCountryOfResidence,
				LegalRepresentativeEmail,
				Email,
				HeadquartersAddress,
				CompanyNumber,
				LegalRepresentativeAddress: HeadquartersAddress
			})
		})

		const user = await mpResponse.json()
		return res.status(201).send(user)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// create wallet

router.post('/mp_create_user_wallet', async (req, res) => {

	const { body } = req

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/wallets`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify(body)
		})

		const wallet = await mpResponse.json()
		return res.status(201).send(wallet)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// create card registration

router.post('/mp_create_card_registration', async (req, res) => {

	const {
		UserId,
		Currency,
		CardType
	} = req.body

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/cardregistrations`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				UserId,
				Currency: Currency || "EUR",
				CardType
			})
		})

		const {
			CardRegistrationURL,
			PreregistrationData,
			Id,
			AccessKey
		} = await mpResponse.json()

		return res.status(201).send({
			CardRegistrationURL,
			PreregistrationData,
			Id,
			AccessKey
		})

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// update card registration

router.put('/mp_update_card_registration', async (req, res) => {

	const {
		RegistrationData,
		cardRegistrationId
	} = req.body

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/cardregistrations/${cardRegistrationId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({ RegistrationData })
		})

		const cardRegistration = await mpResponse.json()
		return res.status(201).send(cardRegistration)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// create a direct payin

router.post('/mp_create_card_direct_payin', async (req, res) => {

	const {
		AuthorId,
		DebitedFunds,
		Fees,
		query
	} = req.body

	console.log(AuthorId,
		DebitedFunds,
		Fees,
		query)

	try {

		const walletResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${AuthorId}/wallets`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const wallets = await walletResponse.json()
		const wallet = wallets[wallets.length - 1]
		const walletId = (wallet || {}).Id

		console.log('wallet', wallet)

		const cardResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${AuthorId}/cards`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const cards = await cardResponse.json()
		const card = cards[cards.length - 1]
		const cardId = (card || {}).Id

		console.log('card', card)

		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/payins/card/direct`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				AuthorId,
				"CreditedWalletId": walletId,
				DebitedFunds,
				Fees,
				"SecureModeReturnURL": `${origin}/pay-in-confirmation${query || ''}`,
				"CardId": cardId,
				// "SecureMode": "DEFAULT"
				"SecureMode": "NO_CHOICE"
			})
		})

		const payin = await mpResponse.json()
		console.log(payin)
		return res.status(201).send(payin)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// transfer funds between wallets

router.post('/mp_transfer_funds_between_wallets', async (req, res) => {

	const {
		MPLegalUserId,
		DebitedFunds,
		MPUserId,
		noFees
	} = req.body

	// If noFees param is null or false, this is a transfer between a user wallet
	// to a coach wallet, with a 0.3 commission to Citrus
	// If noFees param is true, this is a transfer between a user wallet
	// to Citrus technical wallet in case of buying a premium subscription

	const debitedAmount = DebitedFunds.Amount * 100

	if (debitedAmount > 10000) {
		return res.status(400).json({ msg: 'Amount too big, something is wrong' })
	}

	let coachWalletResponse = []
	let coachWallets = []
	let coachWallet = []
	let coachWalletId = ''

	try {

		if(MPLegalUserId) {
			coachWalletResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${MPLegalUserId}/wallets`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
				}
			})

			coachWallets = await coachWalletResponse.json()
			coachWallet = coachWallets[coachWallets.length - 1]
			coachWalletId = (coachWallet || {}).Id
		}

		const userWalletResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${MPUserId}/wallets`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const userWallets = await userWalletResponse.json()
		const userWallet = userWallets[userWallets.length - 1]
		const userWalletId = (userWallet || {}).Id

		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/transfers`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				AuthorId: MPUserId,
				DebitedFunds: {
					"Amount": debitedAmount,
					"Currency": DebitedFunds.Currency
				},
				Fees: {
					"Amount": noFees ? 0 : debitedAmount * 0.3,
					"Currency": 'EUR'
				},
				DebitedWalletId: userWalletId,
				CreditedWalletId: noFees ? citrusWalletId : coachWalletId
			})
		})

		const transfer = await mpResponse.json()
		return res.status(201).send(transfer)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// create a kyc document

router.post('/mp_create_kyc_document', async (req, res) => {

	const {
		UserId,
		type
	} = req.body

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${UserId}/kyc/documents`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				'Type': type
			})
		})

		const kycDocument = await mpResponse.json()
		return res.status(201).send({
			KYCDocumentId: kycDocument.Id
		})

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// create a kyc page

router.post('/mp_create_kyc_page', async (req, res) => {

	const {
		UserId,
		KYCDocumentId,
		File
	} = req.body

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${UserId}/kyc/documents/${KYCDocumentId}/pages`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				'File': File
			})
		})

		const kycPage = await mpResponse
		return res.status(kycPage.status).send('OK')

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// submit a kyc document

router.put('/mp_submit_kyc_document', async (req, res) => {

	const {
		UserId,
		KYCDocumentId
	} = req.body

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${UserId}/kyc/documents/${KYCDocumentId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				'Status': 'VALIDATION_ASKED'
			})
		})

		const kycSubmited = await mpResponse.json()
		return res.status(201).send(kycSubmited)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// get kyc document of a user

router.get('/mp_list_user_kyc_documents', async (req, res) => {

	const {
		user_id
	} = req.query

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${user_id}/kyc/documents`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const kycs = await mpResponse.json()
		return res.status(201).send(kycs)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// create a bank account

router.post('/mp_create_iban_bank_account', async (req, res) => {

	const {
		UserId,
		OwnerName,
		OwnerAddress,
		Iban
	} = req.body

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${UserId}/bankaccounts/iban`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				OwnerName,
				OwnerAddress,
				"IBAN": Iban
			})
		})

		const bankAccount = await mpResponse.json()
		return res.status(201).send(bankAccount)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// return user info

router.get('/mp_fetch_user_info', async (req, res) => {

	const {
		UserId
	} = req.query

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${UserId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const user = await mpResponse.json()
		return res.status(200).send(user)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})


// return wallet info of a user

router.get('/mp_fetch_user_wallet_info', async (req, res) => {

	const {
		UserId,
		only_credits
	} = req.query

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${UserId}/wallets`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const wallets = await mpResponse.json()
		const wallet = wallets[wallets.length - 1]
		if(only_credits && wallet && wallet.Balance) {
			return res.send(JSON.stringify(wallet.Balance.Amount / 100))
		} else {
			return res.send(wallet)
		}
	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// return card of a user

router.get('/mp_fetch_user_card_info', async (req, res) => {

	const {
		UserId
	} = req.query

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${UserId}/cards`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const cards = await mpResponse.json()
		return res.status(200).send(cards[cards.length - 1])

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// return bank account id of a user

router.get('/mp_fetch_user_bank_account_id', async (req, res) => {

	const {
		UserId
	} = req.query

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${UserId}/bankaccounts`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const bankAccounts = await mpResponse.json()
		if(bankAccounts.length>0) {
			const bankAccount = bankAccounts[bankAccounts.length - 1]
			return res.status(200).send(bankAccount.Id)
		} else {
			return res.status(404).json({ msg: 'No bank account' })
		}

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// return bank account of a user

router.get('/mp_fetch_user_bank_account', async (req, res) => {

	const { UserId } = req.query

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${UserId}/bankaccounts`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const bankAccounts = await mpResponse.json()
		const bankAccount = bankAccounts[bankAccounts.length - 1]
		return res.status(200).send(bankAccount)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// create a payout

router.post('/mp_create_payout', async (req, res) => {

	const {
		UserId,
		BankAccountId,
		Currency
	} = req.body

	try {
		const mpResponseWallet = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${UserId}/wallets`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const wallets = await mpResponseWallet.json()
		const wallet = wallets[wallets.length - 1]
		const walletId = (wallet || {}).Id

		if (wallet && wallet.Balance && wallet.Balance.Amount < 100) {
			return res.status(400).json({ msg: 'You cant withdraw less than 100 credits' })
		}

		if(wallet && wallet.Balance && wallet.Balance.Amount>100) {
			const mpResponsePayout = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/payouts/bankwire`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
				},
				body: JSON.stringify({
					"AuthorId": UserId,
					"DebitedFunds": {
						Currency,
						"Amount": wallet.Balance.Amount
					},
					"Fees": {
						Currency,
						"Amount": 0
					},
					BankAccountId,
					DebitedWalletId: walletId,
					"BankWireRef": 'Citrus App'
				})
			})

			const payout = await mpResponsePayout.json()
			return res.status(201).send(payout)
		} else {
			return res.status(400).json({ msg: 'No funds in user wallet'})
		}
	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// View a payout

router.get('/mp_view_payout', async (req, res) => {

	const { PayOutId } = req.query

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/payouts/${PayOutId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const payout = await mpResponse.json()
		return res.status(200).send(payout)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// Create a Recurring PayIn Registration

router.post('/mp_create_recurring_payin_registration', async (req, res) => {

	const {
		UserId,
		CardId,
		planType,
		currency
	} = req.body

	try {
		const walletResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/users/${UserId}/wallets`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const wallets = await walletResponse.json()
		const wallet = wallets[wallets.length - 1]
		const walletId = (wallet || {}).Id

		let body = {
			AuthorId: UserId,
			CardId,
			CreditedWalletId: walletId,
			FirstTransactionFees: {
				"Currency": currency,
				"Amount": 0
			},
			NextTransactionFees: {
				"Currency": currency,
				"Amount": 0
			},
			"Frequency": "Monthly",
			"FixedNextAmount": false,
			"FractionedPayment": false
		}

		if(planType == 4.99) {
			body.FirstTransactionDebitedFunds = {
			"Currency": currency,
				"Amount": 499
			}
			body.NextTransactionDebitedFunds = {
				"Currency": currency,
				"Amount": 499
			}
		} else {
			body.FirstTransactionDebitedFunds = {
				"Currency": currency,
				"Amount": 4999
			}
			body.NextTransactionDebitedFunds = {
				"Currency": currency,
				"Amount": 4999
			}
		}

		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/recurringpayinregistrations`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify(body)
		})

		const recurringPayinRegistration = await mpResponse.json()
		return res.status(201).send(recurringPayinRegistration)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// Update a Recurring PayIn Registration Object

router.put('/mp_update_recurring_payin_registration', async (req, res) => {

	const {
		RecurringPayinRegistrationId,
		CardId,
		Status
	} = req.body

	const body = CardId ? { RecurringPayinRegistrationId, CardId } : { RecurringPayinRegistrationId, Status }

	try {

		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/recurringpayinregistrations/${RecurringPayinRegistrationId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify(body)
		})

		const recurringPayinRegistration = await mpResponse.json()
		return res.status(201).send(recurringPayinRegistration)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// Create a Recurring PayIn CIT

router.post('/mp_create_recurring_payin_cit', async (req, res) => {

	const {
		RecurringPayinRegistrationId,
		BrowserInfo,
		IpAddress,
		isUpdatingCard,
		Currency,
		query,
		email
	} = req.body

	let body = {
		RecurringPayinRegistrationId,
		BrowserInfo,
		IpAddress,
		SecureModeReturnURL: `${origin}/pay-in-confirmation${query || ''}`
	}

	if(isUpdatingCard) {
		// Debiting 1$ to authenticate the user's card update
		// A refund of the same amount will be created afterward
		body.DebitedFunds = {
			"Currency": Currency || 'EUR',
			"Amount": 100
		}
	}

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/payins/recurring/card/direct`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify(body)
		})

		const recurringPayin = await mpResponse.json()
		if (email && recurringPayin) {
			updateMemberTag(email, 'subscription billing failed', 'inactive')
		}
		return res.status(201).send(recurringPayin)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// Create a Recurring PayIn MIT

router.post('/mp_create_recurring_payin_mit', async (req, res) => {

	const {
		RecurringPayinRegistrationId,
		DebitedFunds,
		Currency
	} = req.body

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/payins/recurring/card/direct`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({
				RecurringPayinRegistrationId,
				"DebitedFunds": {
					Currency,
					"Amount": DebitedFunds
				}
			})
		})

		const recurringPayin = await mpResponse.json()
		return res.status(201).send(recurringPayin)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// Create a Payin Refund

router.post('/mp_create_payin_refund', async (req, res) => {

	const {
		PayInId,
		AuthorId
} = req.body

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/payins/${PayInId}/refunds`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			},
			body: JSON.stringify({ AuthorId })
		})

		const refund = await mpResponse.json()
		return res.status(201).send(refund)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

// View a PayIn

router.get('/mp_view_payin', async (req, res) => {

	const {
		PayInId
	} = req.query

	try {
		const mpResponse = await fetch(`${mangoPayApiUrl}/v2.01/${mangoPayClientId}/payins/${PayInId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + base64.encode(`${mangoPayClientId}:${mangoPayApiKey}`)
			}
		})

		const payin = await mpResponse.json()
		return res.status(200).send(payin)

	} catch (e) {
		console.log(e)
		res.json({ msg: e })
	}
})

module.exports = router