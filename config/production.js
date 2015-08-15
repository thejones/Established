'use strict';

module.exports = {
	db: {
		uri: 'mongodb://localhost/established-prod',
		options: {
			user: '',
			pass: ''
		}
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	sendgrid: {
		user: process.env.SENDGRID_USER || '',
		password: process.env.SENDGRID_PASSWORD || ''
	},
	stripeOptions: {
		apiKey: '',
		stripePubKey: '',
		defaultPlan: 'free',
		plans: ['free', 'pro'],
		planData: {
			'free': {
				name: 'Free',
				price: 0
			},
			'pro': {
				name: 'Pro',
				price: 3.99
			}
		}
	}
};
