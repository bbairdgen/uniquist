const { Schema } = require('mongoose');

const reactionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reactionType: {
        type: String,
        enum: ['like', 'dislike'],
        required: true
    }
});

module.exports = reactionSchema;