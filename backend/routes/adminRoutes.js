// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUserFromFirestore,
  deleteUserFromAuth,
} = require("../services/firebaseAdminService");
const { isAdmin } = require("../middleware/authMiddleware");

// Fetch all users
router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Delete user endpoint
router.delete("/users/:uid", isAdmin, async (req, res) => {
  const { uid } = req.params;
  try {
    await deleteUserFromFirestore(uid);
    await deleteUserFromAuth(uid);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
});

module.exports = router;
