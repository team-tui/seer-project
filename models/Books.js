const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statusSchema = require('./Status')
const resultsSchema = require('./Results')


const bookSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	results: {
		type: resultsSchema
	},
	status: {
		type: statusSchema,
		required: true
	},

});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;