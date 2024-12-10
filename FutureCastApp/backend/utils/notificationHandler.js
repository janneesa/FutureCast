const { default: mongoose } = require("mongoose");
const User = require("../models/userModel.js");

const addNotification = async (req, res) => {
  const { userId, message } = req.body;

  if (!userId || !message) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }
};
