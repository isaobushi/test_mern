const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load question model
const Question = require('../../models/Question');
const Course = require('../../models/Course');

let result = '';
let domanda = '';
let questionPattern = '';
let variables = '';

//@route GET api/questions/test
// @desc Tests question route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Questions works' }));

//@route GET api/questions/:course_id
// @desc get first question
// @access Private
router.get('/5c85ecef84fd4500719acb3a/start', passport.authenticate('jwt', { session: false }), (req, res) => {
	let level = 1;

	// get level user
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			profile.courses.map(course => {
				if (course.id === req.params.course_id) {
					return (level = course.level);
				}
			});
		})
		.then(() => {
			console.log(level);
			if (level >= 1 && level < 2) {
				console.log('ok e" dentro');
				y = Math.floor(Math.random() * 10 + 1);
				x = y + Math.floor(Math.random() * 20 + 1);
				result = x % y;
				domanda = `${x} % ${y}?`;
				questionPattern = '(${x} % ${y}) ?';
				variables = `y = ${y}, x = ${x}`;
			} else if (level >= 2 && level < 3) {
				y = Math.floor(Math.random() * 20 + 1);
				x = Math.floor(Math.random() * 20 + 1);
				z = Math.floor(Math.random() * 10 + 1);
				result = (x + y) % z;
				domanda = `(${x}+${y})%${z} ?`;
				questionPattern = '(${x}+${y})%${z} ?';
				variables = `y = ${y}, x = ${x}, z = ${z}`;
			} else if (level >= 3 && level < 4) {
				y = Math.floor(Math.random() * 20 + 1);
				x = Math.floor(Math.random() * 20 + 1);
				z = Math.floor(Math.random() * 10 + 1);
				result = (x * y) % z;
				domanda = `(${x}*${y})%${z}?`;
				questionPattern = '(${x}*${y})%${z} ?';
				variables = `y = ${y}, x = ${x}, z = ${z}`;
			} else if (level >= 4) {
				y = Math.floor(Math.random() * 20 + 1);
				x = Math.floor(Math.random() * 20 + 1);
				z = Math.floor(Math.random() * 20 + 1);
				w = Math.floor(Math.random() * 20 + 1);
				result = (x * y) % (z * w);
				domanda = `(${x}*${y})%(${z}*${w})?`;
				questionPattern = '(${x}*${y})%${z}*${w} ?';
				variables = `y = ${y}, x = ${x}, z = ${z}, w = ${w}`;
			} else {
				console.log('error');
			}

			const newQuestion = new Question({
				body: domanda,
				solution: result,
				pattern: questionPattern,
				variablesValues: variables,
				user: req.user.id,
			});
			time = newQuestion.date;
			console.log(time);
			newQuestion.save().then(question =>
				res.json({
					question,
					time,
				})
			);

			//.then(question => res.json(question));
		});
});

//@route POST api/questions/:course_id
// @desc send answer update level get new question
// @access Private

router.post('/:course_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	let level = 0;
	Profile.findOne({ user: req.user.id })
		.then(profile => {
			profile.courses.map(course => {
				if (course.id === req.params.course_id) {
					// check answer user
					if (req.body.answer === req.body.solution) {
						console.log(req.body.answer, req.body.solution);
						// adjust level user
						console.log('right');
						course.level += 1 / 3;
					} else {
						console.log('wrong');
						course.level -= 1 / 6;
					}
					if (course.level < 1) {
						course.level = 1;
					}
					profile.save();
					return (level = course.level);
				}
			});
		})
		.then(() => {
			// pair question to user's level
			if (level >= 1 && level < 2) {
				console.log('ok e" dentro');
				y = Math.floor(Math.random() * 10 + 1);
				x = y + Math.floor(Math.random() * 20 + 1);
				result = x % y;
				domanda = `${x} % ${y}?`;
				questionPattern = '(${x} % ${y}) ?';
				variables = `y = ${y}, x = ${x}`;
			} else if (level >= 2 && level < 3) {
				y = Math.floor(Math.random() * 20 + 1);
				x = Math.floor(Math.random() * 20 + 1);
				z = Math.floor(Math.random() * 10 + 1);
				result = (x + y) % z;
				domanda = `(${x}+${y})%${z} ?`;
				questionPattern = '(${x}+${y})%${z} ?';
				variables = `y = ${y}, x = ${x}, z = ${z}`;
			} else if (level >= 3 && level < 4) {
				y = Math.floor(Math.random() * 20 + 1);
				x = Math.floor(Math.random() * 20 + 1);
				z = Math.floor(Math.random() * 10 + 1);
				result = (x * y) % z;
				domanda = `(${x}*${y})%${z}?`;
				questionPattern = '(${x}*${y})%${z} ?';
				variables = `y = ${y}, x = ${x}, z = ${z}`;
			} else if (level >= 4) {
				y = Math.floor(Math.random() * 20 + 1);
				x = Math.floor(Math.random() * 20 + 1);
				z = Math.floor(Math.random() * 20 + 1);
				w = Math.floor(Math.random() * 20 + 1);
				result = (x * y) % (z * w);
				domanda = `(${x}*${y})%(${z}*${w})?`;
				questionPattern = '(${x}*${y})%${z}*${w} ?';
				variables = `y = ${y}, x = ${x}, z = ${z}, w = ${w}`;
			} else {
				console.log('error');
			}

			const newQuestion = new Question({
				body: domanda,
				solution: result,
				pattern: questionPattern,
				variablesValues: variables,
				user: req.user.id,
			});

			newQuestion.save().then(question => res.json({ question }));
		});
});

module.exports = router;
