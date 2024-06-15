const {
  fetchTrendingMovies,
  fetchTrendingSeries,
} = require("../services/trendingService");

const getTrendingMovies = async (req, res) => {
  try {
    const movies = await fetchTrendingMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
};

const getTrendingSeries = async (req, res) => {
  try {
    const series = await fetchTrendingSeries();
    res.json(series);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trending series" });
  }
};

module.exports = { getTrendingMovies, getTrendingSeries };
