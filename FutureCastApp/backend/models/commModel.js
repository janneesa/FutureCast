const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commSchema = new Schema(
    {
        userId: {
            type: Number,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
        likes: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Comment', commSchema);