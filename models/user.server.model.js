'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	joi = require('joi'),
	Schema = mongoose.Schema,
	config = require('config'),
	stripeCustomer = require('./plugins/stripe-customer'),
	timestamps = require('mongoose-timestamp'),
	crypto = require('crypto');

/**
 * User Schema
 */
var UserSchema = new Schema({

	displayName: {
		type: String,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		default: ''
	},
	username: {
		type: String,
		unique: 'Username already exists',
		trim: true
	},
	password: {
		type: String,
		default: ''
	},
	profile: {
		firstName: {
			type: String,
			trim: true,
			default: ''
		},
		lastName: {
			type: String,
			trim: true,
			default: ''
		},
    location: {
			type: String,
			trim: true,
			default: ''
		},
    website: {
			type: String,
			trim: true,
			default: ''
		}
  },
	salt: {
		type: String
	},
	provider: {
		type: String
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},
	/* For reset password */
	resetPasswordToken: {
		type: String
	},
	resetPasswordExpires: {
		type: Date
	}
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function(next) {
	if (this.password && this.password.length > 6) {
		this.salt = crypto.randomBytes(16).toString('base64');
		this.password = this.hashPassword(this.password);
	}

	next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function(password) {
	if (this.salt && password) {
		return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
	} else {
		return password;
	}
};

/**
 * Create safe toJSON
 */

UserSchema.methods.toJSON = function () {
	var user = this.toObject();
	delete user.password;
	return user;
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

mongoose.model('User', UserSchema);
