const { Schema } = require('mongoose');

const favoriteSchema = new Schema({
  bandname: {
    type: String,
    required: true
  }
});

module.exports = favoriteSchema;
