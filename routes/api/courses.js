const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load courses model
const Course = require('../../models/Course');
//@route GET api/courses/test
// @desc Tests course route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Courses works' }));

//@route POST api/courses
// @desc add course to system ( by teacher )
// @access Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const newCourse = new Course({
		title: req.body.title,
		description: req.body.description,
		level: 1,
		users: req.user.id,
	});
	newCourse
		.save()
		.then(course => res.json(course))
		.catch(err => res.status(404).json({ subjectNotAdded: 'No subject has been added' }));
});

//@route GET api/courses/all
// @desc add course to system ( by teacher )
// @access Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Course.find()
		.then(course => res.json(course))
		.catch(err => res.status(404).json({ noCourseWasFound: 'No courses found' }));
});

//@route POST api/courses/:id_course
// @desc add course to user ( by user )
// @access Private

router.post('/:id_course', passport.authenticate('jwt', { session: false }), (req, res) => {
	const exists = false;
	Course.findOne({ _id: req.params.id_course }).then(course => {
		Profile.findOne({ user: req.user.id })
			.then(profile => {
				profile.courses.map(materia => {
					if (materia.id === course.id) {
						console.log('in');
						return (exists = true);
					}
				});

				if (exists === false) {
					profile.courses.length === 0 ? (profile.courses = [course]) : profile.courses.push(course);

					course.users.length === 0 ? (course.users = [req.user.id]) : course.users.push(req.user.id);
					course.save();
					console.log(course);
					profile.save().then(() => res.redirect('/'));
				}
			})
			.catch(err => res.json({ msg: 'already registered' }));
	});
});

//@route GET api/courses/:id_course
// @desc get course details ( by user )
// @access Private

router.get('/:id_course', passport.authenticate('jwt', { session: false }), (req, res) => {
	let params = req.query.id_course;
	Course.findById(params)
		.then(course => res.json(course))
		.catch(err => res.json({ msg: 'course not found' }));
});

//@route DELETE api/courses/:id_course
// @desc get course details ( by user )
// @access Private

router.delete('/:id_course', passport.authenticate('jwt', { session: false }), (req, res) => {
	Course.findOne({ _id: req.params.id_course }).then(course => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			profile.courses.map(materia => {
				if (materia.id === course) {
					materia.remove();
					profile.save().then(message => res.json({ msg: 'profile course deleted & profile update ' }));
				}
			});
		});
	});
});

module.exports = router;
