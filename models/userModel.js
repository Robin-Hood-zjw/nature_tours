const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'A user must have a name'],
    maxlength: [20, 'A user must have less or equal than 40 characters.'],
    minlength: [10, 'A user must have more or equal than 10 characters.'],
    // validate: [validator.isAlpha, 'Tour name must only contain characters']
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
    unique: true,
    minlength: 8,
    required: [true, 'Please provide your password.'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password.'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
