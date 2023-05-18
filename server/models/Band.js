const { Schema, model } = require('mongoose');

const bandSchema = new Schema({
    bandname: {
        type: String,
        required: true,
        unqiue: true
    },
    genre: {
        type: String
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    stream_links: [{
        type: String
    }]
});

const Band = model('Band', bandSchema);

module.exports = Band;