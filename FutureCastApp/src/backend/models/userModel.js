const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: false,
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    bio: {
      type: String,
      required: false,
    },
    followers: {
      type: [Number],
      required: false,
    },
    following: {
      type: [Number],
      required: false,
    },
    predictions: {
      type: [Number],
      required: false,
    },
    successfulPredictions: {
      type: [Number],
      required: false,
    },
    predictionScore: {
      type: Number,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
