const express = require("express");
const router = express.Router();
const requireAuth = require("../middlewares/requireAuth");
const {
  getAllUsers,
  getUserById,
  getUserByUsername,
  createUser,
  loginUser,
  updateUser,
  searchUsers,
  deleteUser,
  addNotificationToUser,
  clearUserNotifications,
  updateUserPassword,
  googleAuth,
  // patchUser
} = require("../controllers/userController");

// GET /users
router.get("/", getAllUsers);

// POST /users
router.post("/", createUser);

// POST /users/login
router.post("/login", loginUser);

// POST /users/google-auth
router.post("/google-auth", googleAuth);

// GET /users/:userId
router.get("/:userId", getUserById);

// GET /users/:username
router.get("/username/:username", getUserByUsername);

// GET /users/search/:searchWord
router.get("/search/:searchWord", searchUsers);

router.use(requireAuth);

// PUT /users/:userId
router.put("/:userId", updateUser);

// PUT /users/reset/:userId
router.put("/reset/:userId", updateUserPassword);

// PUT /users/addNotification/:userId
router.put("/addNotification/:userId", addNotificationToUser);

// PUT /users/clearNotifications/:userId
router.put("/clearNotifications/:userId", clearUserNotifications);

// DELETE /users/:userId
router.delete("/:userId", deleteUser);

// Update user using PATCH
// router.patch('/:userId', patchUser)

module.exports = router;
