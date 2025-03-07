const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const badgeChecker = require("../utils/badgeChecker.js");
const scoreChecker = require("../utils/scoreChecker.js");
const {
  addNotification,
  clearNotifications,
} = require("../utils/notificationHandler.js");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

// Handle user signup errors
const handleDuplicateError = (error, res) => {
  if (error.code === 11000) {
    const field = Object.keys(error.keyValue)[0];
    const value = error.keyValue[field];
    res.status(400).json({
      error: `${field} with value '${value}' already exists.`,
      message: `Duplicate key error. ${error.message}`,
    });
  } else {
    res.status(400).json({ message: error.message, error: error.message });
  }
};

// GET /users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: "Failed to retrieve users" });
  }
};

// POST /users
const createUser = async (req, res) => {
  const {
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
    settings,
  } = req.body;

  try {
    // Custom signup method in the User model
    const user = await User.signup(
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
    );

    if (user) {
      const token = generateToken(user._id);
      res.status(201).json({ user, token });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    handleDuplicateError(error, res);
  }
};

// POST /users/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    if (user) {
      const token = generateToken(user._id);
      res.status(200).json({ user, token });
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// GET /users/:userId
const getUserById = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

// GET /users/:username
const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json({ message: "Invalid username" });
  }

  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve user" });
  }
};

// GET /users/search/:searchWord
const searchUsers = async (req, res) => {
  const { searchWord } = req.params;
  if (!searchWord) {
    return res.status(400).json({ message: "Invalid search word" });
  }

  try {
    const users = await User.find({
      $or: [
        { name: { $regex: searchWord, $options: "i" } },
        { username: { $regex: searchWord, $options: "i" } },
      ],
    }).select("-email -settings -phone_number -date_of_birth");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to search users" });
  }
};

// PUT /users/:userId
const updateUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    // Fetch the user from the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user fields with req.body
    Object.assign(user, req.body);

    // Check and update badges
    const updatedBadges = badgeChecker(user);
    const updatedScore = scoreChecker(user);

    user.badges = updatedBadges;
    user.predictionScore = updatedScore;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    handleDuplicateError(error, res);
  }
};

// PUT /users/reset/:userId
const updateUserPassword = async (req, res) => {
  const { userId } = req.params;
  const { password, newPassword, confirmPassword } = req.body;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.resetPassword(
      userId,
      password,
      newPassword,
      confirmPassword
    );

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(`Error resetting password in user: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

// PUT /users/addNotification/:userId
const addNotificationToUser = async (req, res) => {
  const { userId } = req.params;
  const { message } = req.body;

  const response = await addNotification(userId, message);
  if (response.error) {
    return res.status(response.status).json({ message: response.error });
  }
  return res.status(response.status).json({ message: response.message });
};

// PUT /users/clearNotifications/:userId
const clearUserNotifications = async (req, res) => {
  const { userId } = req.params;

  const response = await clearNotifications(userId);
  if (response.error) {
    return res.status(response.status).json({ message: response.error });
  }
  return res.status(response.status).json({ message: response.message });
};

// DELETE /users/:userId
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete user", error: error.message });
  }
};

const googleAuth = async (req, res) => {
  const { email, name, username, avatar } = req.body;

  try {
    if (!email || !name) {
      return res.status(400).json({ error: "Email and name are required" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);

      // Use the existing signup method to create the user
      user = await User.signup(
        name,
        email,
        username,
        randomPassword, // This will be hashed in the signup method
        "", // phone_number
        new Date(), // Use the current date if date_of_birth is unknown
        "", // bio
        [], // followers
        [], // following
        [], // predictions
        [], // successfulPredictions
        0, // predictionScore
        avatar,
        {
          notifications: { email: true, push: true },
          preferences: { darkMode: false },
        } // settings
      );
    }

    // Generate a token and return the user object
    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (error) {
    console.error("Google Auth Error:", error.message);
    res.status(500).json({ error: "Failed to authenticate via Google" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  loginUser,
  updateUser,
  searchUsers,
  deleteUser,
  addNotificationToUser,
  clearUserNotifications,
  updateUserPassword,
  googleAuth,
};
