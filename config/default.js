'use strict';

module.exports = {
	app: {},
	host: "0.0.0.0",
	cors: true,
	port: process.env.PORT || 3001,
	TOKEN_SECRET: process.env.TOKEN_SECRET || 'BeyonceTheQueenBee'
};
