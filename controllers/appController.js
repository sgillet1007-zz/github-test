var request = require('request');
var mongoose = require('mongoose');
var User = require('../models/user.js');

var appController = {
	root: function(req, res){
    res.render('index', { user: req.user });
    console.log('REQ.USER!!!!!!!: ', req.user);
    //create new user
    var user = new User({
      githubId      : req.user._json.id,
      name          : req.user._json.name,
      location      : req.user._json.location,
      email         : req.user._json.email,
      company       : req.user._json.company,
      hireable      : req.user._json.hireable,
      bio           : req.user._json.bio,
      githubProfile : req.user._json.html_url,
      githubSince   : req.user._json.created_at,
      reposNum      : req.user._json.public_repos,
      followers     : req.user._json.followers,
      starredRepos  : req.user._json.starred_url,
      profilePhoto  : req.user._json.avatar_url
    });
    // Now that the user is created, we'll attempt to save them to the
    // database.
    user.save(function(err, user){
      // If there is an error, it will come with some special codes and
      // information. We can customize the printed message based on
      // the error mongoose encounters
      if(err) {
        // By default, we'll show a generic message...
        var errorMessage = 'An error occured, please try again';
        // If we encounter this error, the duplicate key error,
        // this means that one of our fields marked as "unique"
        // failed to validate on this object.
        if(err.code === 11000){
          errorMessage = 'This user already exists.';
        }
        // Flash the message and redirect to the login view to
        // show it.
        req.flash('error', errorMessage);
        return res.redirect('/');
      }
    });
  },

  userdata: function(req,res){
    res.send(req.user);
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