var Code = require('code'),
    Lab = require('lab'),
	Hapi = require('hapi'),
	server = require("../"),
	config = require('config'),
	mongoose = require('mongoose'),
  	models = require('./../models'),
	User = mongoose.model('User')
    
    
var lab = exports.lab = Lab.script();
var user, user2;


lab.experiment('User Model', function () {
    
    lab.before({ timeout: 500 }, function (done) {
		
        user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});
		user2 = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});
		
		done();
    });
    
    
    lab.test('Begin with no users', function (done) {
        User.find({}, function(err, users) {
			Code.expect(users.length).to.equal(0);
			done();
		});
    });
	
	lab.test('Save user no errors', function (done) {
        user.save(done);
    });
	
	
	lab.test('Should fail to save the same user again', function (done) {
        user.save(function() {
			user2.save(function(err) {
				Code.expect(err).to.be.an.object();
				done();
			});
		});
    });
	
	
	
	lab.after(function (done) {
		User.remove().exec(done);
	});

});