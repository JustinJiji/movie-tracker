const {
  fetchTrendingBoth,
  fetchTrendingMovies,
  fetchTrendingSeries,
} = require("../services/trendingService");

const getTrendingBoth = async (req, res) => {
  try {
    const msboth = await fetchTrendingBoth();
    res.json(msboth);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch trending movies and series" });
  }
};

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

module.exports = { getTrendingBoth, getTrendingMovies, getTrendingSeries };
