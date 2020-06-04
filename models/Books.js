const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const statusSchema = require('./Status')

const articleSchema = new Schema({
 	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	}, 
 	results: {
		type: String,
		required: true
	}, 
	date: {
		type: Date,
		required: true
	}, 
	url: {
		type: String,
		required: true
	},  
 	status: {
		type: statusSchema,
		required: true
	},
	type: {
		type: String,
		required: true
	}
});

const Article = mongoose.model('SEER', articleSchema, 'articles');

module.exports = Article;