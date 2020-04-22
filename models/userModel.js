const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A User must have a username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A User must have a password'],
  },
  image: {
    type: String,
    required: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
