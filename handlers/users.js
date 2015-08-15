var createSendToken = require('./../utils/jwt'),
	mongoose = require('mongoose'),
  	models = require('./../models'),
	User = mongoose.model('User'),
  	Boom = require('boom'),
	_ = require('lodash');

exports.signup = function(request, reply){
	delete request.payload.roles;

	// Init Variables
	var user = new User(request.payload);
	var message = null;

	// Add missing user fields
	user.provider = 'local';
	//user.displayName = user.firstName + ' ' + user.lastName;

	// Then save the user
	user.save(function(err) {
		if (err) {
			reply(Boom.badRequest(err));
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;
			createSendToken(user, reply);
		}

	});
}

exports.signin = function(request, reply){
	var password = request.payload.password;
	User.findOne({
		username: request.payload.username
	}, function(err, user) {

		if (err) {
			reply(Boom.badRequest(err));
		}
		if (!user) {
			reply(Boom.badRequest("Wrong username/password"));
		}
		if (!user.authenticate(password)) {
			reply(Boom.badRequest("Wrong username/password"));
		}

		createSendToken(user, reply);
	});
}

//Authrize 'em

/**
 * Pre
 */
exports.preware = {};
exports.preware.userByID = function(request, reply) {
	var Id = request.params.id
	User.findById(Id).exec(function(err, user) {
		if (err) {
			return reply(Boom.badRequest(err));
		}
		if (!user) {
			return reply(Boom.badRequest('Failed to load User ' + Id));
		}
		request.user = user;
		reply();
	});
};

/**
 * Pre
 */
exports.preware.hasRole = function(role) {
	var self = this;

	return {
		assign: 'hasRole',
        method: function(request, reply) {
			if(_.indexOf(request.user, self.role)){
				reply();
			}else{
				reply(Boom.forbidden())
			}
		}
	};
};