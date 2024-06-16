const express = require("express");
const { getSearchedItem } = require("../controllers/searchController");

const router = express.Router();

router.get("/multi", getSearchedItem);

module.exports = router;
