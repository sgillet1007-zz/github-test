var express = require('express')
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var appController = require('./controllers/appController.js');
var mongoose = require('mongoose');

var GITHUB_CLIENT_ID = "52e94e8a791c959da470";
var GITHUB_CLIENT_SECRET = "9f218f39a652ee06ea5ce469ba6d2e027269a073";

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },

  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, profile);
    });
  }
));
 
mongoose.connect('mongodb://localhost/github-test');

// **********vvv*** Configure Express App ***
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger("combined"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieSession({secret: 'avery-ipa'}));
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

// **********vvv*** Load Server Routes ***
app.get('/', appController.root);
app.get('/rolodex', ensureAuthenticated, appController.rolodex)
app.get('/login', appController.login)
app.get('/auth/github', passport.authenticate('github'), appController.github);
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), appController.githubCallback);
app.get('/logout', appController.logout);

// **********vvv*** Middleware ***
// ensure user is logged in
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}
// error handling loaded after the loading the routes
if ('development' == app.get('env')) {
  app.use(errorHandler());
}
// **********vvv*** Initialize Server ***
var port = 3000;
var server = app.listen(port, function(){
  console.log('Express server listening on port ' + server.address().port);
});