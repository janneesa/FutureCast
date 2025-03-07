const { default: mongoose } = require("mongoose");
const Prediction = require("../models/predModel.js");
const Comment = require("../models/commModel.js");
const User = require("../models/userModel.js");

// GET /predictions
const getAllPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({})
      .populate("comments")
      .sort({ createdAt: -1 });
    res.status(200).json(predictions);
  } catch (error) {
    res.status(404).json({ message: "Failed to retrieve predictions" });
  }
};

// POST /predictions
const createPrediction = async (req, res) => {
  try {
    const newPrediction = await Prediction.create({ ...req.body });
    res.status(201).json(newPrediction);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create prediction", error: error.message });
  }
};

// GET /predictions/:predictionId
const getPredictionById = async (req, res) => {
  const { predictionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(predictionId)) {
    return res.status(400).json({ message: "Invalid prediction ID" });
  }

  try {
    const prediction = await Prediction.findById(predictionId).populate(
      "comments"
    );
    if (prediction) {
      res.status(200).json(prediction);
    } else {
      res.status(404).json({ message: "Prediction not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve prediction" });
  }
};

// GET /predictions/byUserId/:username
const getPredictionsByUserId = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  try {
    const predictions = await Prediction.find({ userId });
    if (predictions.length >= 0) {
      res.status(200).json(predictions);
    } else {
      res.status(404).json({ error: "No predictions found for this user" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve predictions" });
  }
};

// GET /predictions/byCategory/:category
const getPredictionsByCategory = async (req, res) => {
  const { category } = req.params;
  if (!category) {
    return res.status(400).json({ message: "Invalid category" });
  }

  try {
    const predictions = await Prediction.find({ category });
    if (predictions.length >= 0) {
      res.status(200).json(predictions);
    } else {
      res.status(404).json({ error: "No predictions found for this category" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve predictions" });
  }
};

// GET /predictions/past
const getPastPredictions = async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const pastPredictions = await Prediction.find({
      lastVoteDate: { $lt: currentDate },
    }).populate("comments");
    res.status(200).json(pastPredictions);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve past predictions" });
  }
};

// GET /predictions/active
const getActivePredictions = async (req, res) => {
  try {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const activePredictions = await Prediction.find({
      lastVoteDate: { $gte: currentDate },
    }).populate("comments");

    // Calculate popularity and sort predictions
    const sortedPredictions = activePredictions
      .map((prediction) => ({
        ...prediction.toJSON(),
        popularity: prediction.agrees.length + prediction.disagrees.length,
      }))
      .sort((a, b) => b.popularity - a.popularity);

    res.status(200).json(sortedPredictions);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve active predictions" });
  }
};

const getFollowingPredictions = async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const following = user.following;

    const predictions = await Prediction.find({ userId: { $in: following } });

    // Calculate popularity and sort predictions
    const sortedPredictions = predictions
      .map((prediction) => ({
        ...prediction.toJSON(),
        popularity: prediction.agrees.length + prediction.disagrees.length,
      }))
      .sort((a, b) => b.popularity - a.popularity);

    res.status(200).json(sortedPredictions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch predictions", error });
  }
};

//PUT /predictions/:predictionId
const updatePrediction = async (req, res) => {
  const { predictionId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(predictionId)) {
    return res.status(400).json({ message: "Invalid prediction ID" });
  }

  try {
    const updatedPrediction = await Prediction.findByIdAndUpdate(
      predictionId,
      req.body,
      { new: true }
    );
    if (updatedPrediction) {
      res.status(200).json(updatedPrediction);
    } else {
      res.status(404).json({ message: "Prediction not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to update prediction" });
  }
};

// DELETE /predictions/:predictionId
const deletePrediction = async (req, res) => {
  const { predictionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(predictionId)) {
    return res.status(400).json({ message: "Invalid prediction ID" });
  }

  try {
    const deletedPrediction = await Prediction.findByIdAndDelete(predictionId);
    if (deletedPrediction) {
      res.status(200).json(deletedPrediction);
    } else {
      res.status(404).json({ message: "Prediction not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete prediction" });
  }
};

// POST /predictions/:predictionId/comments
const addComment = async (req, res) => {
  const { predictionId } = req.params;
  const { userId, username, comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(predictionId)) {
    return res.status(400).json({ message: "Invalid prediction ID" });
  }

  try {
    const newComment = await Comment.create({
      userId: userId.toString(),
      username,
      comment,
      likes: [],
    });

    const prediction = await Prediction.findByIdAndUpdate(
      predictionId,
      {
        $push: { comments: newComment._id },
      },
      { new: true }
    ).populate("comments");

    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    res.status(200).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({
      message: "Failed to add comment",
      error: error.message,
    });
  }
};

// PUT /predictions/:predictionId/vote
const votePrediction = async (req, res) => {
  const { predictionId } = req.params;
  const { userId, voteType } = req.body;

  if (!mongoose.Types.ObjectId.isValid(predictionId)) {
    return res.status(400).json({ message: "Invalid prediction ID" });
  }

  try {
    const prediction = await Prediction.findById(predictionId);
    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    prediction.agrees = prediction.agrees.filter(
      (id) => String(id) !== String(userId)
    );
    prediction.disagrees = prediction.disagrees.filter(
      (id) => String(id) !== String(userId)
    );

    // Add user to the appropriate array based on voteType
    if (voteType === "agrees") {
      prediction.agrees = prediction.agrees.concat([userId]);
    } else if (voteType === "disagrees") {
      prediction.disagrees = prediction.disagrees.concat([userId]);
    }

    prediction.markModified("agrees");
    prediction.markModified("disagrees");

    const savedPrediction = await prediction.save();
    res.status(200).json(savedPrediction);
  } catch (error) {
    res.status(500).json({ message: "Failed to vote on prediction" });
  }
};

const finalVotePrediction = async (req, res) => {
  const { predictionId } = req.params;
  const { userId, voteType } = req.body;

  if (!mongoose.Types.ObjectId.isValid(predictionId)) {
    return res.status(400).json({ message: "Invalid prediction ID" });
  }

  try {
    const prediction = await Prediction.findById(predictionId);
    if (!prediction) {
      return res.status(404).json({ message: "Prediction not found" });
    }

    prediction.trueVotes = prediction.trueVotes.filter(
      (id) => String(id) !== String(userId)
    );
    prediction.falseVotes = prediction.falseVotes.filter(
      (id) => String(id) !== String(userId)
    );

    // Add user to the appropriate array based on voteType
    if (voteType === "true") {
      prediction.trueVotes = prediction.trueVotes.concat([userId]);
    } else if (voteType === "false") {
      prediction.falseVotes = prediction.falseVotes.concat([userId]);
    }

    prediction.markModified("trueVotes");
    prediction.markModified("falseVotes");

    const savedPrediction = await prediction.save();
    res.status(200).json(savedPrediction);
  } catch (error) {
    res.status(500).json({ message: "Failed to final vote on prediction" });
  }
};

module.exports = {
  getAllPredictions,
  createPrediction,
  getPredictionById,
  getPredictionsByUserId,
  getPredictionsByCategory,
  getPastPredictions,
  getActivePredictions,
  getFollowingPredictions,
  updatePrediction,
  deletePrediction,
  addComment,
  votePrediction,
  finalVotePrediction,
};
