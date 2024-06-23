// middleware/authMiddleware.js
const admin = require("../config/firebaseAdminConfig");

function isAdmin(req, res, next) {
  const idToken =
    req.headers.authorization && req.headers.authorization.split("Bearer ")[1]; // Extract token
  if (!idToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      if (decodedToken.isAdmin) {
        req.adminId = decodedToken.uid;
        next();
      } else {
        res.status(403).json({ message: "Unauthorized access" });
      }
    })
    .catch((error) => {
      console.error("Error verifying token:", error);
      res.status(401).json({ message: "Unauthorized" });
    });
}

module.exports = { isAdmin };
