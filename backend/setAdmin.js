// setAdmin.js

const admin = require("./config/firebaseAdminConfig");

// Function to set the custom claim
async function setAdminClaim(email) {
  try {
    // Find the user by email
    const user = await admin.auth().getUserByEmail(email);

    // Set custom claim
    await admin.auth().setCustomUserClaims(user.uid, { isAdmin: true });
    console.log(`Custom claim set for ${email}`);
  } catch (error) {
    console.error("Error setting custom claim:", error);
  }
}

// Run the function for the specific admin email
setAdminClaim("admin@admin.com");
