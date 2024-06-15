const axios = require("axios");
const { TMDB_API_KEY, TMDB_BASE_URL } = require("../config/tmdb");

const fetchPopularMovies = async () => {
  const options = {
    method: "GET",
    url: `${TMDB_BASE_URL}/movie/popular`,
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    throw error;
  }
};

const fetchPopularSeries = async () => {
  const options = {
    method: "GET",
    url: `${TMDB_BASE_URL}/tv/popular`,
    params: { language: "en-US", page: "1" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };
  try {
    const response = await axios.request(options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular series:", error);
    throw error;
  }
};

module.exports = { fetchPopularMovies, fetchPopularSeries };
