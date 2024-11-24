const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  loginUser,
  updateUser,
  searchUsers,
  deleteUser,
  updateUserPassword,
  // patchUser
} = require("../controllers/userController");

// GET /users
router.get("/", getAllUsers);

// POST /users
router.post("/", createUser);

// POST /users/login
router.post("/login", loginUser);

// GET /users/:userId
router.get("/:userId", getUserById);

// GET /users/:username
router.get("/username/:username", getUserByUsername);

// GET /users/search/:searchWord
router.get("/search/:searchWord", searchUsers);

// PUT /users/:userId
router.put("/:userId", updateUser);

// PUT /users/reset/:userId
router.put("/reset/:userId", updateUserPassword);

// DELETE /users/:userId
router.delete("/:userId", deleteUser);

// Update user using PATCH
// router.patch('/:userId', patchUser)

module.exports = router;
