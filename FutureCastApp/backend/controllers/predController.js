const { default: mongoose } = require('mongoose');
const Prediction = require('../models/predModel.js');
const Comment = require('../models/commModel.js');

// GET /predictions
const getAllPredictions = async (req, res) => {
  try {
    const predictions = await Prediction.find({})
      .populate('comments')
      .sort({ createdAt: -1 });
    res.status(200).json(predictions);
  } catch (error) {
    res.status(404).json({ message: 'Failed to retrieve predictions' });
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
      .json({ message: 'Failed to create prediction', error: error.message });
  }
};

// GET /predictions/:predictionId
const getPredictionById = async (req, res) => {
  const { predictionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(predictionId)) {
    return res.status(400).json({ message: 'Invalid prediction ID' });
  }

  try {
    const prediction = await Prediction.findById(predictionId).populate(
      'comments'
    );
    if (prediction) {
      res.status(200).json(prediction);
    } else {
      res.status(404).json({ message: 'Prediction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve prediction' });
  }
};

// GET /predictions/:username
const getPredictionByUsername = async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json({ message: 'Invalid username' });
  }

  try {
    const prediction = await Prediction.findOne({ username });
    if (prediction) {
      res.status(200).json(prediction);
    } else {
      res.status(404).json({ message: 'Prediction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve prediction' });
  }
};

//PUT /predictions/:predictionId
const updatePrediction = async (req, res) => {
  const { predictionId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(predictionId)) {
    return res.status(400).json({ message: 'Invalid prediction ID' });
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
      res.status(404).json({ message: 'Prediction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update prediction' });
  }
};

// DELETE /predictions/:predictionId
const deletePrediction = async (req, res) => {
  const { predictionId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(predictionId)) {
    return res.status(400).json({ message: 'Invalid prediction ID' });
  }

  try {
    const deletedPrediction = await Prediction.findByIdAndDelete(predictionId);
    if (deletedPrediction) {
      res.status(200).json(deletedPrediction);
    } else {
      res.status(404).json({ message: 'Prediction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete prediction' });
  }
};

// POST /predictions/:predictionId/comments
const addComment = async (req, res) => {
  const { predictionId } = req.params;
  const { userId, username, comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(predictionId)) {
    return res.status(400).json({ message: 'Invalid prediction ID' });
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
    ).populate('comments');

    if (!prediction) {
      return res.status(404).json({ message: 'Prediction not found' });
    }

    res.status(200).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({
      message: 'Failed to add comment',
      error: error.message,
    });
  }
};

module.exports = {
  getAllPredictions,
  createPrediction,
  getPredictionById,
  getPredictionByUsername,
  updatePrediction,
  deletePrediction,
  addComment,
};
