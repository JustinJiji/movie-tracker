const express = require("express");
const {
  getTrendingBoth,
  getTrendingMovies,
  getTrendingSeries,
} = require("../controllers/trendingController");

const router = express.Router();

router.get("/all", getTrendingBoth);
router.get("/movies", getTrendingMovies);
router.get("/series", getTrendingSeries);

module.exports = router;
