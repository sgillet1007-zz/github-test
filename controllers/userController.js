var request = require('request');
var mongoose = require('mongoose');
var User = require('../models/user.js');

var userController = {
	index: function(req, res){
		console.log("*** SERVER req: ",req);
		res.render('index', { user: req.user });
	},

	me :function(req, res){
		//route that returns current logged in gh user details as json
		res.send(req.user._json);
	},

	postMe: function(req, res){
		//POST body contains JSON string
		console.log("********* SERVER req.body before save to db: ", req.body);
		var user = {
			_id      	  : req.body._id,
			name          : req.body.name,
			location      : req.body.location,
			email         : req.body.email,
			company       : req.body.company,
			hireable      : req.body.hireable,
			bio           : req.body.bio,
			githubProfile : req.body.githubProfile,
			githubSince   : req.body.githubSince,
			reposNum      : req.body.reposNum,
			followers     : req.body.followers,
			starredRepos  : req.body.starredRepos,
			profilePhoto  : req.body.profilePhoto
		}

		var newUser = new User(user);

		newUser.save(function(err,doc){
			if(err){
				if(err.code === 11000){
					console.log('*** SERVER err code 11000 --> user already exists! ***');
					res.send('ERROR');
				}
				console.log("*** SERVER Error: ", err);
				res.send('ERROR');
			}
			else{
				console.log('*** SERVER --> User created!');
				res.send('Success!');
			}
		});
	},

	postUser: function(req, res){
		console.log("SERVER POST req: ",req);
		// console.log(res);

	},

	getUser: function(req, res){
		console.log("*** This is req before getting user data from db: ",req.body);
		//pass returned data to --> $scope.userData
		// console.log("req.body", req.body);
		// User.findOne({_id : req.params._id}, function(err, userData) {
		// 	res.send(userData)
		// })	
	},

	putUser: function(req, res){
		//POST body contains JSON string. Update user.
	},

	getUsers: function(req, res) {
		//pass returned data to --> $scope.users	
	},
};

module.exports = userController;