const { Schema, model } = require('mongoose');
const favoriteSchema = require('./Favorite');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must be an email address!']
  },
  password: {
    type: String,
    required: true,
    minLength: 5
  },
  dateJoined: {
    type: Date,
    default: Date.now,
    required: true
  },
  favorites: [favoriteSchema],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  bands: [{
    type: Schema.Types.ObjectId,
    ref: 'Band'
  }]
});

// hash user password on user creation
userSchema.pre('save', function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// a method to verify an entered password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
