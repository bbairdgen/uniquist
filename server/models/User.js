const { Schema, model } = require('mongoose');
const favoriteSchema = require('./Favorite');

const userSchema = new Schema({
  username: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
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

const User = model('User', userSchema);

module.exports = User;
