// backend/controllers/userController.js
const express = require("express");
const router = express.Router();
const {
  getUserByUid,
  updateUser,
} = require("../services/firebaseAdminService");

// GET user by UID
router.get("/:uid", async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await getUserByUid(uid);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT update user
router.put("/:uid", async (req, res) => {
  const { uid } = req.params;
  const newData = req.body;
  try {
    await updateUser(uid, newData);
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
