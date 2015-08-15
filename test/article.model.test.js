var Code = require('code'),
    Lab = require('lab'),
	Hapi = require('hapi'),
	server = require("../"),
	config = require('config'),
	mongoose = require('mongoose'),
  	models = require('./../models'),
	User = mongoose.model('User'),
	Article = mongoose.model('Article')
    
    
var lab = exports.lab = Lab.script();
var user, article;

lab.experiment('Article Model', function () {
    
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
		
		user.save(function() {
			article = new Article({
				title: 'Article Title',
				content: 'Article Content',
				user: user
			});

			done();
		});
    });    
	
	lab.test('Save user no errors', function (done) {
        article.save(function(err){
			Code.expect(err).to.be.null();
			done();
		});
    });
	
	
	lab.test('Should fail trying to save without a title', function (done) {
        article.title = '';
		article.save(function(err){
			Code.expect(err).to.be.an.object();
			done();
		});
    });
	
	
	
	lab.after(function (done) {
		Article.remove().exec(function() {
			User.remove().exec(done);
		});
	});

});