var jwt = require('jsonwebtoken');
var moment = require('moment');
var config = require('config');

module.exports = function (user, reply) {
	var payload = {
		sub: user.id,
		exp: moment().add(10, 'days').unix()
	};

	var token = jwt.sign(payload, config.TOKEN_SECRET);

	reply({
		user: user.toJSON(),
		token: token
	});
};
