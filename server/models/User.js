const { Schema, model } = require('mongoose');
const favoriteSchema = require('./Favorite');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: {
    type: String
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

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds)
  }

  next()
})

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password.this.password)
}

const User = model('User', userSchema);

module.exports = User;
