var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  githubId      : {type: String,required: true, unique: true},
  name          : String,
  location      : String,
  email         : String,
  company       : String,
  hireable      : String,
  bio           : String,
  githubProfile : {type: String, unique: true},
  githubSince   : String,
  reposNum      : Number,
  followers     : Number,
  starredRepos  : String,
  profilePhoto  : String
});

var User = mongoose.model('user', userSchema);
module.exports = User;