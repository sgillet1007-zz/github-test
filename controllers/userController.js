var request = require('request');
var mongoose = require('mongoose');
var User = require('../models/user.js');

var userController = {
	index: function(req, res){
		res.render('index', { user: req.user });
	},

	me :function(req, res){
		res.send(req.user._json);
	},

	postMe: function(req, res){
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
			err ? console.log("POST Error: ", err) : console.log('New user created!');
		});
	},

	getUser: function(req, res){
		User.findOne({_id : req.user._json.id}, function(err, userData) {
			res.send(userData); 
		});	
	},

	putUser: function(req, res){
		User.update({_id : req.body._id}, req.body, function(err, userData) {
			err ? console.log("PUT Error: ", err) : console.log('Database updated!');
		})
	},

	rolodex: function(req, res){
		res.render('rolodex');
	},

	getUsers: function(req, res) {
		//pass returned data to --> $scope.users
		User.find({}, function(err, allUsers) {
			err ? console.log("GET Error: ", console.log) : (console.log("*** allUsers: ", allUsers),
			res.send(allUsers));
		})
	},
};

module.exports = userController;