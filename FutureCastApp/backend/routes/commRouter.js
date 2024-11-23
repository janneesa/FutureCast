const express = require("express");
const router = express.Router();
const {
    getAllComments,
    createComment,
    getCommentById,
    getCommentByUsername,
    updateComment,
    deleteComment,
    // patchComment
} = require("../controllers/commController");

// GET /comments
router.get("/", getAllComments);

// POST /comments
router.post("/", createComment);

// GET /comments/:commentId
router.get("/:commentId", getCommentById);

// GET /comments/:username
router.get("/username/:username", getCommentByUsername);

// PUT /comments/:commentId
router.put("/:commentId", updateComment);

// DELETE /comments/:commentId
router.delete("/:commentId", deleteComment);

// Update comment using PATCH
// router.patch('/:commentId', patchComment)

module.exports = router;