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
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
	Course.find()
		.then(course => res.json(course))
		.catch(err => res.status(404).json({ noCourseWasFound: 'No corse found' }));
});

//@route POST api/courses/:id_course
// @desc add course to user ( by user )
// @access Private

router.post('/:id_course', passport.authenticate('jwt', { session: false }), (req, res) => {
	Course.findOne({ _id: req.params.id_course }).then(course => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			console.log(profile.courses);
			profile.courses.map(materia => {
				if (materia.id === course.id) {
					return res.json({ error: 'already registered' });
				}
			});
			profile.courses.length === 0 ? (profile.courses = [course]) : profile.courses.push(course);
			profile.save().then(() => res.json({ msg: 'profile update' }));
		});
	});
});

router.delete('/:id_course', passport.authenticate('jwt', { session: false }), (req, res) => {
	Course.findOne({ _id: req.params.id_course }).then(course => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			profile.courses.map(materia => {
				if (materia.id === course.id) {
					materia.remove();
					profile.save().then(message => res.json({ msg: 'profile course deleted & profile update ' }));
				}
			});
		});
	});
});

module.exports = router;
