const { fetchUpcomingMovies } = require("../services/upcomingService");

const getUpcomingMovies = async (req, res) => {
  try {
    const movies = await fetchUpcomingMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).send("Error fetching upcoming movies");
  }
};

module.exports = { getUpcomingMovies };
