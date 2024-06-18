const axios = require("axios");
const { TMDB_API_KEY, TMDB_BASE_URL } = require("../config/tmdb");


const fetchUpcomingMovies = async () => {
  try {
    const options = {
      method: "GET",
      url: `${TMDB_BASE_URL}/movie/upcoming`,
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    };

    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    throw error;
  }
};

module.exports = { fetchUpcomingMovies };
