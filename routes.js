var Handlers = require('./handlers');
var Joi = require('joi');

var Routes = [
	{
		path: '/api/articles',
		method: ['GET'],
		config: {
		  auth: false,
		},
		handler: Handlers.articles.list
	},
	{
		path: '/api/articles',
		method: 'POST',
	  	config: {
	      validate: {
	          payload: {
	            title: Joi.string().required(),
	            content: Joi.string().required()
	          }
	      }
	  },
		handler: Handlers.articles.create
	},
	{
		path: '/api/article/{articleId}',
		method: 'PUT',
	  config: {
	      validate: {
	          payload: {
	            title: Joi.string().required(),
	            content: Joi.string().required()
	          }, 
			  params: {
				  articleId: Joi.string().required()
			  }
	      },
	      pre: [
			 Handlers.articles.preware.articleByID,
			 Handlers.articles.preware.ownResource
	      ]
	  },
		handler: Handlers.articles.update
	},
	{
		path: '/api/article/{articleId}',
		method: 'DELETE',
	    config: {
	      validate: {	           
			  params: {
				  articleId: Joi.string().required()
			  }
	      },
	      pre: [
			 Handlers.articles.preware.articleByID,
			 Handlers.articles.preware.ownResource
	      ]
	  },
		handler: Handlers.articles.delete
	},
	//AUTH
	{
		path: '/api/auth/signup',
		method: 'POST',
	  config: {
		  auth: false,
	      validate: {
	          payload: {
	            username: Joi.string().required(),
	            password: Joi.string().min(6).required(),
							email: Joi.string().email().required()
	          }
	      }
	  },
		handler: Handlers.users.signup
	},
	{
		path: '/api/auth/signin',
		method: 'POST',
	  	config: {
			auth: false,
			validate: {
				payload: {
					username: Joi.string().required(),
					password: Joi.string().min(6).required()
				}
			}
	  },
		handler: Handlers.users.signin
	}
];

module.exports = Routes;
