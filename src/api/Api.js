import axios from "axios";

// Function to get top 10 trending movies
export const getTrendingMovies = async () => {
  try {
    const response = await axios.get("/trending/movies");
    return response.data.slice(0, 10); // Get top 10
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

// Function to get top 10 trending series
export const getTrendingSeries = async () => {
  try {
    const response = await axios.get("/trending/series");
    return response.data.slice(0, 10); // Get top 10
  } catch (error) {
    console.error("Error fetching trending series:", error);
    throw error;
  }
};
