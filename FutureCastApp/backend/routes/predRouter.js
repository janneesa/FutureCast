const express = require('express');
const router = express.Router();
const {
  getAllPredictions,
  createPrediction,
  getPredictionById,
  getPredictionByUsername,
  updatePrediction,
  deletePrediction,
  addComment,
  votePrediction,
  // patchPrediction
} = require('../controllers/predController');

// GET /predictions
router.get('/', getAllPredictions);

// POST /predictions
router.post('/', createPrediction);

// GET /predictions/:predictionId
router.get('/:predictionId', getPredictionById);

// GET /predictions/:username
router.get('/username/:username', getPredictionByUsername);

// PUT /predictions/:predictionId
router.put('/:predictionId', updatePrediction);

// DELETE /predictions/:predictionId
router.delete('/:predictionId', deletePrediction);

// POST /predictions/:predictionId/comments
router.post('/:predictionId/comments', addComment);

// PUT /predictions/:predictionId/vote
router.put('/:predictionId/vote', votePrediction);

// Update prediction using PATCH
// router.patch('/:predictionId', patchPrediction)

module.exports = router;
