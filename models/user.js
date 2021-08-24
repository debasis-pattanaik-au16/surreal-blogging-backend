const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter a username'],
      unique: [true, 'Username must be unique'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please enter a email'],
      unique: [true, 'Email must be unique'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
    },
    profilePic: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User;
