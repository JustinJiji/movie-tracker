const axios = require("axios");
const { TMDB_API_KEY, TMDB_BASE_URL } = require("../config/tmdb");

const fetchTrendingMovies = async () => {
  const options = {
    method: "GET",
    url: `${TMDB_BASE_URL}/trending/movie/day`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

const fetchTrendingSeries = async () => {
  const options = {
    method: "GET",
    url: `${TMDB_BASE_URL}/trending/tv/day`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error("Error fetching trending series:", error);
    throw error;
  }
};

module.exports = { fetchTrendingMovies, fetchTrendingSeries };
