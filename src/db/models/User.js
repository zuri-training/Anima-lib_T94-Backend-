const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    FirstName:String,
    SecondName:String,
    Email:String,
    Password:String,
    googleId: String,
    secret: String
});

const User = mongoose.model('User',UserSchema);

module.exports = User;