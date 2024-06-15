const express = require("express");
const {
  getPopularMovies,
  getPopularSeries,
} = require("../controllers/popularController");

const router = express.Router();

router.get("/movies", getPopularMovies);
router.get("/series", getPopularSeries);

module.exports = router;
