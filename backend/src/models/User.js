const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: [true, 'Please add a password'],
  },
}, {
  timestamps: true, // adds createdAt and updatedAt
});

module.exports = mongoose.model('User', userSchema);
