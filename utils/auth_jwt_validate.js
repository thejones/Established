module.exports = function (decoded, request, callback) {
	var payload = decoded;

	if (!payload.sub) {
		callback("Error with Token");
	};

	request.userId = payload.sub;
	return callback(null, true);
};
