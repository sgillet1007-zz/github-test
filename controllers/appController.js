var request = require('request');
var mongoose = require('mongoose');
var User = require('../models/user.js');

var appController = {

	root: function(req, res){
  		res.render('index', { user: req.user });
	},

	account: function(req, res){
  		res.render('account', { user: req.user});
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