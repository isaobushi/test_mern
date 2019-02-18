const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
	title: {
		type: String,
		required: true,
	},

	description: {
		type: String,
		required: true,
	},

	level: {
		type: Number,
		default: 1,
	},

	users: [],

	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Course = mongoose.model('courses', CourseSchema);
