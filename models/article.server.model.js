'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	joi = require('joi'),
	Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ArticleSchema = new Schema({

	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true,
		required: 'Content cannot be blank'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});


mongoose.model('Article', ArticleSchema);
