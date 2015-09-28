var express = require('express')
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var authController = require('./controllers/authController.js');
var userController = require('./controllers/userController.js');

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
 
mongoose.connect('mongodb://localhost/github_rolodex');

// **********vvv*** Configure Express App ***
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger("combined"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieSession({secret: 'chimay'}));
app.use(methodOverride());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

// **********vvv*** Load Server Routes ***
//render index view
app.get('/', userController.index);
//GET new logged in user's data save it to $scope.ghUserData and myApp.value('user_id',[])
app.get('/users/get', userController.me);
//GET user languages
app.get('/user/languages', userController.myLanguages);


//POST $scope.ghUserData to mongo db.  Mongo validation of "_id" property prevents overwriting.
app.post('/users/create', userController.postMe);
//GET user with "_id" === logged in user github "id" property.
app.get('/users/getUser', userController.getUser);
//PUT user
app.post('/users/putUser', userController.putUser);

//Render rolodex view
app.get('/rolodex', userController.rolodex);
//GET all users
app.get('/getUsers', userController.getUsers);

//** authentication routes **
app.get('/login', authController.login);
app.get('/auth/github', passport.authenticate('github'), authController.github);
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), authController.githubCallback);
app.get('/logout', authController.logout);
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