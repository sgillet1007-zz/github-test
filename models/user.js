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
  reposNum            : Number,
  followers           : Number,
  starredRepos        : String,
  starredReposArray   : Array,
  languagesList       : Array,
  languagesSumStrings : Array,
  profilePhoto        : String
});

var User = mongoose.model('user', userSchema);
module.exports = User;