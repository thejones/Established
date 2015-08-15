'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    models = require('./../models'),
	Article = mongoose.model('Article'),
    Boom = require('boom'),
	_ = require('lodash');
	

/**
 * Create a article
 */
exports.create = function(request, reply) {
	var article = new Article(request.payload);
	article.user = request.userId;

	article.save(function(err) {
		if (err) {
			reply(Boom.badRequest(err));
		} else {
			reply(article);
		}
	});
};

/**
 * Show the current article
 */
exports.read = function(request, reply) {
	reply(request.article);
};

/**
 * Update a article
 */
exports.update = function(request, reply) {
	var article = request.article;

	article = _.extend(article, request.payload);

	article.save(function(err) {
		if (err) {
          reply(Boom.badRequest(err));
		} else {
		  reply(article);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(request, reply) {
	var article = request.article;

	article.remove(function(err) {
		if (err) {
      		reply(Boom.badRequest(err));
		} else {
			reply(article);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(request, reply) {
	Article.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			reply(Boom.badRequest('Could not find articles'));
		} else {
			reply(articles);
		}
	});
};


/**
 * Article authorization middleware
 */
 exports.preware = {};
 exports.preware.articleByID = function(request, reply) {
	Article.findById(request.params.articleId).populate('user').exec(function(err, article) {
		if (err) {
			reply(Boom.badRequest(err));
		}
		if (!article) {
			reply(Boom.badRequest("Unable to find that article"));
		}
		request.article = article;
		reply();
	});
};


exports.preware.ownResource = function(request, reply) {
	if (request.article.user.id !== request.userId) {
		reply(Boom.forbidden());
	}	
	reply();	
};
