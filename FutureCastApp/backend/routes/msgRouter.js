const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const {
  getMessagesBySender,
  getMessagesByReceiver,
  addMessage,
  deleteMessage,
} = require("../controllers/msgController");

router.use(requireAuth);

// GET /messages/sender/:sender
router.get("/sender/:sender", getMessagesBySender);

// GET /messages/receiver/:receiver
router.get("/receiver/:receiver", getMessagesByReceiver);

// POST /messages
router.post("/", addMessage);

// DELETE /messages/:messageId
router.delete("/:messageId", deleteMessage);

module.exports = router;