var request = require('request');
var mongoose = require('mongoose');
var User = require('../models/user.js');

var appController = {

	root: function(req, res){
  		res.render('index', { user: req.user });
  		// TO DO
  		// if db values of user are default values then 
  		// save user details to the database using the user 
  		// properties from github
  		console.log("root controller user: ", req.user);
  		// TO DO
  		//if database contains user with id = req.user._json.login
  			//do nothing
  		//else populate a new User entry using req.user object
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