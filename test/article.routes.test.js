var Code = require('code'),
    Lab = require('lab'),
	Hapi = require('hapi'),
	server = require("../server"),
	config = require('config'),
	mongoose = require('mongoose'),
  	models = require('./../models'),
	User = mongoose.model('User'),
	Article = mongoose.model('Article'),
	axios = require('axios')
	
    
    
var lab = exports.lab = Lab.script();
var user, article, credentials;

//


lab.experiment('Article Model', function () {
    
    lab.before({ timeout: 500 }, function (done) {
		
		credentials = {
			username: 'username',
			password: 'password'
		};
		
        user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
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
	
	lab.test("Create article as a signed in user", function(done) {
		var options = {
			method: "POST",
			url: "/api/auth/signin",
			payload: credentials
		};
	
		server.inject(options, function(response) {
			var result = response.result;
			//Code.expect(response.statusCode).to.equal(200); 
			
			var articleOptions = {
				method: 'POST',
				url: '/api/articles',
				headers: {
					authorization: 'Bearer ' + result.token
				},
				payload: {
					title: 'Article Title',
					content: 'Article Content'
				}
			};
			server.inject(articleOptions, function (response) {
				var result = response.result;
				Code.expect(response.statusCode).to.equal(200);
				Code.expect(result.title).to.equal(articleOptions.payload.title);
				Code.expect(result.content).to.equal(articleOptions.payload.content);
				
				done();
			});
 
        
    	});
	});
	
	
	lab.test("Create article as an anonymous user", function(done) {
		var articleOptions = {
			method: 'POST',
			url: '/api/articles',
			payload: {
				title: 'Article Title',
				content: 'Article Content'
			}
		};
		server.inject(articleOptions, function (response) {
			Code.expect(response.statusCode).to.equal(401);			
			done();
		});


	});
	
	
	
	lab.after(function (done) {
		Article.remove().exec(function() {
			User.remove().exec(done);
		});
	});

});