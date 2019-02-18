const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
	body: {
		type: String,
		required: true,
	},
	solution: {
		type: String,
		required: true,
	},
	pattern: {
		type: String,
		required: true,
	},
	variablesValues: {
		type: String,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Question = mongoose.model('question', QuestionSchema);
