const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const {
  getAllPredictions,
  createPrediction,
  getPredictionById,
  getPredictionsByUserId,
  getPredictionsByCategory,
  updatePrediction,
  deletePrediction,
  addComment,
  votePrediction,
  // patchPrediction
} = require("../controllers/predController");

// GET /predictions
router.get("/", getAllPredictions);

// GET /predictions/:predictionId
router.get("/:predictionId", getPredictionById);

// GET /predictions/:username
router.get("/byUserId/:userId", getPredictionsByUserId);

// GET /predictions/category/:category
router.get("/search/:category", getPredictionsByCategory);

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

// Update prediction using PATCH
// router.patch('/:predictionId', patchPrediction)

module.exports = router;
