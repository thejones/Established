module.exports = [
  {
    register:require('good'),
    options: {
    		opsInterval: 50000,
    		reporters: [
    			{
    				reporter: require('good-file'),
    				events: { ops: '*' },
    				config: {
    					path: './logs',
    					prefix: 'hapi-process',
    					rotate: 'daily'
    				}
    			},
    			{
    				reporter: require('good-file'),
    				events: { response: '*' },
    				config: {
    					path: './logs',
    					prefix: 'hapi-requests',
    					rotate: 'daily'
    				}
    			},
    			{
    				reporter: require('good-file'),
    				events: { error: '*' },
    				config: {
    					path: './logs',
    					prefix: 'hapi-error',
    					rotate: 'daily'
    				}
    			}
    		]
    	}
  },
  {
    register: require('hapi-auth-jwt2')
  }
  
];
