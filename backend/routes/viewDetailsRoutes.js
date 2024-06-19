const express = require("express");
const { getMultiDetails } = require("../controllers/viewDetailsController");

const router = express.Router();

router.get("/:media_type/:id", getMultiDetails);

module.exports = router;
