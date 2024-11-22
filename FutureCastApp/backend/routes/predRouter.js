const express = require("express");
const router = express.Router();
const {
  getAllPredictions,
  createPrediction,
  getPredictionById,
  getPredictionByUsername,
  updatePrediction,
  deletePrediction,
  // patchPrediction
} = require("../controllers/predController");

// GET /predictions
router.get("/", getAllPredictions);

// POST /predictions
router.post("/", createPrediction);

// GET /predictions/:predictionId
router.get("/:predictionId", getPredictionById);

// GET /predictions/:username
router.get("/username/:username", getPredictionByUsername);

// PUT /predictions/:predictionId
router.put("/:predictionId", updatePrediction);

// DELETE /predictions/:predictionId
router.delete("/:predictionId", deletePrediction);

// Update prediction using PATCH
// router.patch('/:predictionId', patchPrediction)

module.exports = router;
