const mongoose = require("mongoose");
const User = require("../models/userModel.js");

const addNotification = async (userId, message) => {
  if (!userId || !message) {
    return { status: 400, error: "Missing required fields" };
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return { status: 400, error: "Invalid user ID" };
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return { status: 404, error: "User not found" };
    }

    if (!user.settings.notifications.push) {
      return { status: 200, message: "Notifications are disabled" };
    }

    user.notifications.push(message);
    await user.save();
    return { status: 200, message: "Notification added" };
  } catch (error) {
    console.error("Failed to add notification:", error);
    return { status: 500, error: "Failed to add notification" };
  }
};

const clearNotifications = async (userId) => {
  if (!userId) {
    return { status: 400, error: "Missing required fields" };
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return { status: 400, error: "Invalid user ID" };
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return { status: 404, error: "User not found" };
    }

    user.notifications = [];
    await user.save();
    return { status: 200, message: "Notifications cleared" };
  } catch (error) {
    console.error("Failed to clear notifications:", error);
    return { status: 500, error: "Failed to clear notifications" };
  }
};

module.exports = {
  addNotification,
  clearNotifications,
};
