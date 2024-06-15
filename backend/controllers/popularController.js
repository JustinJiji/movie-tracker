const {
  fetchPopularMovies,
  fetchPopularSeries,
} = require("../services/popularService");

const getPopularMovies = async (req, res) => {
  try {
    const popularMovies = await fetchPopularMovies();
    res.json(popularMovies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
};

const getPopularSeries = async (req, res) => {
  try {
    const popularSeries = await fetchPopularSeries();
    res.json(popularSeries);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch popular series" });
  }
};

module.exports = { getPopularMovies, getPopularSeries };
