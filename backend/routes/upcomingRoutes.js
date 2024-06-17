const express = require("express");
const { getUpcomingMovies } = require("../controllers/upcomingController");

const router = express.Router();

router.get("/upcoming", getUpcomingMovies);

module.exports = router;
