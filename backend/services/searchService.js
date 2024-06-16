const axios = require("axios");
const { TMDB_API_KEY, TMDB_BASE_URL } = require("../config/tmdb");

const fetchSearchedItem = async (query) => {
  const options = {
    method: "GET",
    url: `${TMDB_BASE_URL}/search/multi`,
    params: {
      query: query,
      include_adult: "false",
      language: "en-US",
      page: "1",
    },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };
  try {
    const response = await axios.request(options);
    // Filter out results with media_type: "person" and check for original_language
    const filteredResults = response.data.results.filter(
      (item) => item.media_type !== "person" && item.original_language === "en"
    );
    // Sort results by popularity
    const sortedResults = filteredResults.sort(
      (a, b) => b.popularity - a.popularity
    );
    return sortedResults;
  } catch (error) {
    console.error("Error fetching searched item:", error);
    throw error;
  }
};

module.exports = { fetchSearchedItem };
