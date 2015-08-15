var Hapi = require('hapi');

var path = require('path');
var config = require('config');
var routes = require('./routes');
var plugins = require('./plugins');
var mongoose = require('mongoose');
var	chalk = require('chalk');

var server = new Hapi.Server({
  connections:{
    routes:{
      cors:config.cors
    }
  }
});


server.connection({port:config.port, host:config.host});
server.register(plugins, function (err) {
		if (err) {
			throw err; // something bad happened loading a plugin
		}
});

server.auth.strategy('jwt', 'jwt', 'required',  {
    key: config.TOKEN_SECRET,
    validateFunc: require('./utils/auth_jwt_validate.js')
  });

// Bootstrap db connection
var db = mongoose.connect(config.db.uri, config.db.options, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});
mongoose.connection.on('error', function(err) {
	console.error(chalk.red('MongoDB connection error: ' + err));
	process.exit(-1);
	}
);



server.route(routes);

if (!module.parent) {
    server.start(function() {
      console.log(chalk.green('Listening on:\t\t' + server.info.uri));
      console.log(chalk.green('Environment:\t\t' + process.env.NODE_ENV));
      console.log(chalk.green('Port:\t\t\t' + config.port));
      console.log(chalk.green('Database:\t\t' + config.db.uri));
  });
}



module.exports = server;
