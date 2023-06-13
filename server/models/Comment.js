const { Schema } = require('mongoose');
const reactionSchema = require('./Reaction');

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    reactions: [reactionSchema]
});

module.exports = commentSchema;