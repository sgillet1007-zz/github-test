var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  _id                 : {type: String,required: true, unique: true},
  name                : String,
  location            : String,
  email               : String,
  company             : String,
  hireable            : String,
  bio                 : String,
  githubProfile       : String,
  githubSince         : String,
  githubSince_mm/yyyy : String, //string formatting to create
  reposNum            : Number,
  followers           : Number,
  starredRepos        : String,
  languages           : String, //GET request to starredRepos URL
  profilePhoto        : String
});

var User = mongoose.model('user', userSchema);
module.exports = User;