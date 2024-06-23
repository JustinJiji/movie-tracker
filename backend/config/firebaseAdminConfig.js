const admin = require("firebase-admin");
const serviceAccount = require("../firebase-adminsdk.json"); // Ensure correct path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
