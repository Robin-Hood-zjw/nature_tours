/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A user must have a name'],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Please provider your email'],
    validate: [validator.isEmail, 'Please provide a valid email.'],
  },
  photo: String,
  password: {
    type: String,
    minlength: 8,
    select: false,
    required: [true, 'Please provide a password'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.passwordConfirm = undefined;
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
