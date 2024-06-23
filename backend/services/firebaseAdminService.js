// services/firebaseAdminService.js
const admin = require("../config/firebaseAdminConfig");

async function getAllUsers() {
  try {
    const listUsersResult = await admin.auth().listUsers();
    return listUsersResult.users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

async function deleteUserFromFirestore(uid) {
  try {
    const db = admin.firestore();
    const userRef = db.collection("users").doc(uid);
    await userRef.delete();
    console.log("User deleted from Firestore");
  } catch (error) {
    console.error("Error deleting user from Firestore:", error);
    throw error;
  }
}

async function deleteUserFromAuth(uid) {
  try {
    await admin.auth().deleteUser(uid);
    console.log("User deleted from Authentication");
  } catch (error) {
    console.error("Error deleting user from Authentication");
    throw error;
  }
}

module.exports = {
  getAllUsers,
  deleteUserFromFirestore,
  deleteUserFromAuth,
};
