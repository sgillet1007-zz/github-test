var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  githubId      : String,
  name          : String,
  location      : String,
  email         : String,
  company       : String,
  hireable      : String,
  bio           : String,
  githubProfile : String,
  githubSince   : String,
  reposNum      : Number,
  followers     : Number,
  starredRepos  : String,
  profilePhoto  : String
});

var User = mongoose.model('user', userSchema);
module.exports = User;