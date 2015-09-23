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

  postuserdata: function (req, res) {
    //this should only be run once on first log in
    /* Handling the AngularJS post request*/
    console.log("Submit button clicked! req.body is equal to: ",req.body);
    res.setHeader('Content-Type', 'application/json');
    /*response has to be in the form of a JSON*/
    req.body.serverMessage = "NodeJS replying to angular";
        /*adding a new field to send it to the angular Client */
    res.end(JSON.stringify(req.body));
    /*Sending the respone back to the angular Client */
  },

  putuserdata : function(req, res){
    //this should update database with user info when form is submitted
  },

  allusers: function(req, res){
    User.find({}, function(err, users){
      res.send(users)
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