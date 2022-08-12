const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    googleId: {
        type: String,
        required: false,
    },
}, { timestamps: true });

User.pre('save', async function(next) {
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

User.methods.validatePassword = async function(password) {
  return await bcrypt.compare(password, this.password).catch(err => {
    console.log(err.message);
  });
};

module.exports = mongoose.model('User', User);