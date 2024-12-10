const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const {
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
  // patchPrediction
} = require("../controllers/predController");

// GET /predictions
router.get("/", getAllPredictions);

// GET /predictions/past
router.get("/past", getPastPredictions);

// GET /predictions/active
router.get("/active", getActivePredictions);

// GET /predictions/following
router.get("/following/:userId", getFollowingPredictions);

// GET /predictions/:predictionId
router.get("/:predictionId", getPredictionById);

// GET /predictions/:username
router.get("/byUserId/:userId", getPredictionsByUserId);

// GET /predictions/category/:category
router.get("/category/:category", getPredictionsByCategory);

router.use(requireAuth);

// POST /predictions
router.post("/", createPrediction);

// PUT /predictions/:predictionId
router.put("/:predictionId", updatePrediction);

// DELETE /predictions/:predictionId
router.delete("/:predictionId", deletePrediction);

// POST /predictions/:predictionId/comments
router.post("/:predictionId/comments", addComment);

// PUT /predictions/:predictionId/vote
router.put("/:predictionId/vote", votePrediction);

// PUT /predictions/:predictionId/finalVote
router.put("/:predictionId/finalVote", finalVotePrediction);

// Update prediction using PATCH
// router.patch('/:predictionId', patchPrediction)

module.exports = router;
