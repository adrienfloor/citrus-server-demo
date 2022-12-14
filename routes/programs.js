const express = require('express')
const router = express.Router()

const Program = require('../models/program')
const Coaching = require('../models/coaching')

// CREATE PROGRAM
router.post('/create_program', (req, res) => {
	const {
		title,
        description,
		coachFirstName,
		coachLastName,
		coachUserName,
		coachId,
		sport,
		level,
		equipment,
		pictureUri,
		focus,
		coachingLanguage,
		freeAccess,
		coachRating,
		programRating,
		price,
        programOnly,
        coachings
	} = req.body

	// SIMPLE VALIDATION
	if (
		!title
        || !description
		|| !coachUserName
		|| !coachId
		|| !sport
		|| !pictureUri
		|| !price
	) {
		return res.status(400).json({ msg: 'Missing program parameters' })
	}

	const newProgram = new Program({
		title,
        description,
		coachFirstName,
		coachLastName,
		coachUserName,
		coachId,
		sport,
		level,
		equipment,
		pictureUri,
		focus,
		coachingLanguage,
		freeAccess,
		coachRating,
		programRating,
		price,
        coachings
	})
	.save()
	.then(program => {
		if (program) return res.json(program)
	})
	.catch(e => {
		console.log('error', e)
		return res.send(e)
	})
})

// UPDATE PROGRAM
router.put('/update_program', async (req, res) => {

	const { _id } = req.body

	try {
		const program = await Program.findOne({ _id })
		if (!program) return res.status(404).json({ msg: 'program does not exist' })
		if (program) {
			Object.keys(program.toJSON()).forEach((key,i) => {
				if(req.body[key] !== undefined) {
					program[key] = req.body[key]
				}
				if(i === (Object.keys(program.toJSON()).length-1)) {
					program.save()
					.then(updatedProgram => {
						return res.json(updatedProgram)
					})
				}
			})
		}
	} catch(e) {
		res.json({ msg: 'Something went wrong finding the program in DB' })
	}
})

// DELETE PROGRAM
router.delete('/delete_program', async (req, res) => {

	const { id } = req.query

	try {
		Program.deleteOne({ _id: id }, function (err, result) {
			if (err) {
				res.send(err)
			} else {
				console.log(result)
				return res.status(204).send(result)
			}
		});
	} catch (e) {
		res.json({ msg: 'Something went wrong finding the program in DB' })
	}
})

// FETCH ALL AVAILABLE PROGRAMS
router.get('/programs', (req, res) => {

	Program.find()
	.then(programs => {
		return res.send({ programs })
	})
	.catch(e => res.send(e))
})

// FETCH PARTICULAR PROGRAM
router.get('/program', (req, res) => {

	const { id } = req.query

	Program.findOne({ _id: id })
		.then(program => {
			return res.send({ program })
		})
		.catch(e => res.send(e))
})

// FETCH PROGRAMS FROM A PARTICULAR TRAINER
router.get('/trainer_programs', async (req, res) => {

	const { coach_id } = req.query

	const programs = await Program.find({ coachId: coach_id })
	return res.send(programs)
})

// FETCH FULL COACHINGS OF A PARTICULAR PROGRAM
router.get('/programs_coachings', async (req, res) => {

	const { id } = req.query

	try {
		const program = await Program.findOne({ _id: id })
		if (!program) return res.status(404).json({ msg: 'program does not exist' })
		if (program) {
			const programIds = program.coachings
            const coachings = Coaching.find({
                _id: { $in: programIds },
                muxReplayPlaybackId: { $ne: '' }
            })
            if(coachings) {
                return res.send(coachings)
            }
		}
	} catch(e) {
		res.json({ msg: 'Something went wrong finding the program in DB' })
	}
})

module.exports = router
