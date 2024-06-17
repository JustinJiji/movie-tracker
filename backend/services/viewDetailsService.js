const axios = require("axios");
const { TMDB_API_KEY, TMDB_BASE_URL } = require("../config/tmdb");

const fetchDetailsForType = async (media_type, id) => {
  const options = {
    method: "GET",
    url: `${TMDB_BASE_URL}/${media_type}/${id}`,
    params: { language: "en-US" },
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TMDB_API_KEY}`,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(`Error fetching details for ${media_type}:`, error);
    return null;
  }
};

const fetchMultiDetails = async (media_type, id) => {
  if (media_type!='undefined') {
    const data = await fetchDetailsForType(media_type, id);
    if (data) {
      return data;
    }
    throw new Error(`Failed to fetch details for ${media_type}`);
  } else {
    const movieData = await fetchDetailsForType("movie", id);
    if (movieData) {
      return movieData;
    }
    const tvData = await fetchDetailsForType("tv", id);
    if (tvData) {
      return tvData;
    }
    throw new Error("Failed to fetch details for both movie and tv");
  }
};

module.exports = { fetchMultiDetails };
