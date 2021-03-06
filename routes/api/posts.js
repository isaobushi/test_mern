const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//require module
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// require validation

const validatePostInput = require('../../validation/post');

// @route GET api/post/test
// @desc Tests post route
// @access Public
router.get('/test', (req, res) => res.json({ msg: 'Posts works' }));
// @route GET  api/post/
// @desc  get  post
// @access public

router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({ noPostsFound: 'No Posts found' }));
});

// @route GET  api/post/
// @desc  get  post by id
// @access public

router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(posts => res.json(posts))
		.catch(err => res.status(404).json({ noPostFound: 'No Post found with that ID' }));
});

// @route POST api/post/
// @desc  create post
// @access Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);
	// check validation
	if (!isValid) {
		//rase 400, errors object
		return res.status(400).json(errors);
	}
	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id,
	});

	newPost.save().then(post => res.json(post));
});

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then(profile => {
		Post.findById(req.params.id)
			.then(post => {
				// Check for post owner
				if (post.user.toString() !== req.user.id) {
					return res.status(401).json({ notauthorized: 'User not authorized' });
				}

				// Delete
				post.remove().then(() => res.json({ success: true }));
			})
			.catch(err => res.status(404).json({ postnotfound: 'No post found' }));
	});
});

module.exports = router;
