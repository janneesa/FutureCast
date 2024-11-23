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
      select: false,
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
      type: [String],
      required: false,
    },
    following: {
      type: [String],
      required: false,
    },
    predictions: {
      type: [String],
      required: false,
    },
    successfulPredictions: {
      type: [String],
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
    settings: {
      notifications: {
        email: {
          type: Boolean,
          required: true,
        },
        push: {
          type: Boolean,
          required: true,
        },
      },
      preferences: {
        darkMode: {
          type: Boolean,
          required: true,
        },
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
