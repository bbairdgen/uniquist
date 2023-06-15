const { Schema } = require('mongoose');
const reactionSchema = require('./Reaction');

const commentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    reactions: [reactionSchema],
    replies: [this]
});

module.exports = commentSchema;