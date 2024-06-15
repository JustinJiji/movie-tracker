const express = require("express");
const {
  getTrendingMovies,
  getTrendingSeries,
} = require("../controllers/trendingController");

const router = express.Router();

router.get("/movies", getTrendingMovies);
router.get("/series", getTrendingSeries);

module.exports = router;
