const { default: mongoose } = require('mongoose');
const Comment = require('../models/commModel.js');

// GET /comments
const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(404).json({ message: 'Failed to retrieve comments' });
  }
};

// POST /comments
const createComment = async (req, res) => {
  try {
    const newComment = await Comment.create({ ...req.body });
    res.status(201).json(newComment);
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Failed to create comment', error: error.message });
  }
};

// GET /comments/:commentId
const getCommentById = async (req, res) => {
  const { commentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: 'Invalid comment ID' });
  }

  try {
    const comment = await Comment.findById(commentId);
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve comment' });
  }
};

// GET /comments/:username
const getCommentByUsername = async (req, res) => {
  const { username } = req.params;
  if (!username) {
    return res.status(400).json({ message: 'Invalid username' });
  }

  try {
    const comment = await Comment.findOne({ username });
    if (comment) {
      res.status(200).json(comment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve comment' });
  }
};

//PUT /comments/:commentId
const updateComment = async (req, res) => {
  const { commentId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: 'Invalid comment ID' });
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      req.body,
      { new: true }
    );
    if (updatedComment) {
      res.status(200).json(updatedComment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to update comment' });
  }
};

// PUT /comments/:commentId/like
const likeComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: 'Invalid comment ID' });
  }

  try {
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const likeIndex = comment.likes.indexOf(userId);
    if (likeIndex > -1) {
      comment.likes.splice(likeIndex, 1);
    } else {
      comment.likes.push(userId);
    }

    comment.markModified('likes');
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error in likeComment:', error);
    res.status(500).json({ message: 'Failed to like comment' });
  }
};

// DELETE /comments/:commentId
const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({ message: 'Invalid comment ID' });
  }

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (deletedComment) {
      res.status(200).json(deletedComment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete comment' });
  }
};

module.exports = {
  getAllComments,
  createComment,
  getCommentById,
  getCommentByUsername,
  updateComment,
  likeComment,
  deleteComment,
};
