const express = require("express");
const router = express.Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController.js");

router.use(express.json()); // middleware to parse JSON bodies

router.get("/", getAllUsers);

router.use(auth); // middleware to check if user is authenticated

router.post("/", createUser);

router.get("/:userId", getUserById);

router.put("/:userId", updateUser);

router.delete("/:userId", deleteUser);

module.exports = router;
