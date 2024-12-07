const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

const badgeChecker = require("../utils/badgeChecker.js");

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
      message: `${field} with value '${value}' already exists.`,
      error: `Duplicate key error. ${error.message}`,
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

    res.status(201).json({ message: "User created successfully" });
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
    user.badges = updatedBadges;

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

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  loginUser,
  updateUser,
  searchUsers,
  deleteUser,
  updateUserPassword,
};
