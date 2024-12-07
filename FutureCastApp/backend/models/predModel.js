const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const predSchema = new Schema(
  {
    userId: {
      type: String,
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
      type: [String],
      required: true,
    },
    disagrees: {
      type: [String],
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    lastVoteDate: {
      type: Date,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('Prediction', predSchema);
