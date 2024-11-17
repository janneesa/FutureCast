const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const predSchema = new Schema(
    {
        userId: {
            type: Number,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        prediction: {
            type: String,
            required: true,
        },
        agrees: {
            type: [Number],
            required: true,
        },
        disagrees: {
            type: [Number],
            required: true,
        },
        comments: {
            type: Number,
            required: true,
        },
        lastVoteDate: {
            type: Date,
            required: true,
        },
        avatar: {
            type: String,
            required: false,
        },

    },
    { timestamps: true }
);

module.exports = mongoose.model('Prediction', predSchema);
