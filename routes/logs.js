const express = require('express')
const router = express.Router()

// CREATE NEW NOTIFICATION
router.post('/', (req, res) => {

	const { title, message } = req.body

	if (!message) {
		return res.status(400).json({ msg: 'Missing message to log' })
	}

    console.log('')
    console.log('')
    console.log('Message log :')
    console.log('')
    console.log('')
    console(title)
    console.log('')
    console.log('')
    console.log(message)
    console.log('')
    console.log('')
    return res.status(200)
})

module.exports = router