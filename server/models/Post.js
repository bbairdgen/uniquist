const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const commentSchema = require('./Comment');
const mediaSchema = require('./Media');

const postSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 5000
    },
    media: [mediaSchema],
    band: {
        type: Schema.Types.ObjectId,
        ref: 'Band'
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    reactions: [reactionSchema],
    comments: [commentSchema]
});

const Post = model('Post', postSchema);

module.exports = Post;