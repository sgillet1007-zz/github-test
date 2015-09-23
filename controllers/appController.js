var request = require('request');
var mongoose = require('mongoose');
var User = require('../models/user.js');

var appController = {
	root: function(req, res){
		res.render('index', { user: req.user });
	},

	userdata: function(req,res){
		res.send(req.user);
	},

	userdataDB: function(req,res){
		// console.log("req.user._json.id from userdataDB",req.user._json.id);
		User.findById({_id : req.user._json.id.toString()}, function(err, response){
			if(err){
				console.log("Error from db lookup: ", err);
			}
			else{
				console.log("***** response from userdataDB: ",response);
				res.send(response);
			}
		})
	},

	postuserdata: function (req, res) {
		console.log("Submit button clicked! req.body is equal to: ",req.body);
		var user = {
			_id      			: req.body._id,
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
					console.log('*** user record found in db ***');
					//update existing user
					User.findById(req.body._id, function(err, user){
						user.name          = req.body.name;
						user.location      = req.body.location;
						user.email         = req.body.email;
						user.company       = req.body.company;
						user.hireable      = req.body.hireable;
						user.bio           = req.body.bio;
						user.githubProfile = req.body.githubProfile;
						user.githubSince   = req.body.githubSince;
						user.reposNum      = req.body.reposNum;
						user.followers     = req.body.followers;
						user.starredRepos  = req.body.starredRepos;
						user.profilePhoto  = req.body.profilePhoto

						user.save(function(err){
							if (err) throw err;
							console.log('*** User data successfully updated! ***');
						});
					})
				}
			}
			else{
				console.log('User created!')
			}
		});
	},

	allusers : function(req, res){
		User.find({}, function(err, users){
			console.log("*** allusers returned users: ", users);
			res.send(users);
		})
	},
	
	rolodex: function(req, res){
			res.render('rolodex', { user: req.user});
	},

	login: function(req, res){
			res.render('login', { user: req.user});
	},
	github: function(req, res){
		// The request will be redirected to GitHub for authentication, 
		// so this function will not be called.
	},
	githubCallback: function(req, res) {
			res.redirect('/');
	},
	logout: function(req, res){
		req.logout();
		res.redirect('/');
	}
};

module.exports = appController;