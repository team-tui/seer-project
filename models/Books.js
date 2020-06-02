const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statusSchema = require('./Status')

const bookSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	results: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Result'
	}],
	status: {
		type: statusSchema,
		required: true
	},
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;