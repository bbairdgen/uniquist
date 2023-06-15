const { Schema } = require('mongoose');

// Noah's Note 6/13/23
// The database will be equipped to handle attaching images and audio
// to posts, but fully implementing this feature is a low priority.

const mediaSchema = new Schema({
    mediaType: {
        type: String,
        enum: ['image', 'audio', 'link'],
        required: true
    },
    url: {
        type: String
    }
});

module.exports = mediaSchema;