const express = require('express')
const router = express.Router()
const { emailSecret } = require('../config')
const jwt = require('jsonwebtoken')
const path = require('path')

const User = require('../models/user')

const { confirmationHtml } = require('../html/confirmation')

router.get('/:token', async (req, res) => {
	try {
		const decoded = await jwt.decode(req.params.token)
		if(decoded) {
			User.findOne({ _id: decoded.id })
				.then(user => {
					if (!user) return res.status(404).json({ msg: 'User does not exist' })
					user.isVerified = true
					user.save()
					.then(() => {
						return res.redirect(301, '/api/confirmation')
					})
				})
		}
	} catch(e) {
		console.log(e)
	}
})

router.get('/', (req, res) => {
	return res.send(confirmationHtml)
})

module.exports = router