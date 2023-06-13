const { Schema, model } = require('mongoose');

const bandSchema = new Schema({
    bandname: {
        type: String,
        unique: true,
        required: true
    },
    genre: {
        type: String
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    stream_links: [{
        type: String,
        match: /^(https?:\/\/)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*)$/
    }],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ]
});

const Band = model('Band', bandSchema);

module.exports = Band;