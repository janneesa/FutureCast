const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

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
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    phone_number: {
      type: String,
      required: false,
      select: false,
    },
    date_of_birth: {
      type: Date,
      required: true,
      select: false,
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
    predictions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prediction",
      },
    ],
    badges: {
      type: [
        {
          name: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
      default: [],
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

// static signup method
userSchema.statics.signup = async function (
  name,
  email,
  username,
  password,
  phone_number,
  date_of_birth,
  bio,
  followers,
  following,
  predictions,
  successfulPredictions,
  predictionScore,
  avatar,
  settings
) {
  // validation
  if (!name || !email || !username || !password || !date_of_birth) {
    throw Error("All fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email not valid");
  }
  if (password.length < 8) {
    throw Error("Password must be at least 8 characters long");
  }
  if (username.length < 3) {
    throw Error("Username must be at least 3 characters long");
  }

  // check if email is already in use.
  const lowerCaseEmail = email.toLowerCase();
  const exists = await this.findOne({ lowerCaseEmail });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email: lowerCaseEmail,
    username,
    password: hash,
    phone_number,
    date_of_birth,
    bio,
    followers,
    following,
    predictions,
    successfulPredictions,
    predictionScore,
    avatar,
    settings,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Email and password are required");
  }

  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }

  const userObject = user.toJSON();
  delete userObject.password; // Remove the password field

  return userObject;
};

// static method to reset password
userSchema.statics.resetPassword = async function (
  id,
  currentPassword,
  newPassword,
  confirmPassword
) {
  // validations
  if (!currentPassword || !newPassword || !confirmPassword) {
    throw Error("All fields are required");
  }

  if (newPassword.length < 8 || confirmPassword.length < 8) {
    throw Error("Password must be at least 8 characters long");
  }

  if (newPassword !== confirmPassword) {
    throw Error("Passwords do not match");
  }

  const user = await this.findById(id).select("+password");
  if (!user) {
    throw Error("User not found. Id is invalid. Contact support");
  }

  const match = await bcrypt.compare(currentPassword, user.password);
  if (!match) {
    throw Error("current Password is incorrect");
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(confirmPassword, salt);

    user.password = hash;
    await user.save();
  } catch (error) {
    throw Error("Error hashing password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
