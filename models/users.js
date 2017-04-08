var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Define our user schema
var UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  type: String,
  debt: Number,
  picture: String,
  funds: Number,
  matricula: String,
  contribuintes: []
});

UserSchema.plugin(passportLocalMongoose);
// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
