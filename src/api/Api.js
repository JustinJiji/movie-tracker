import axios from "axios";

export const getTrendingMovies = async () => {
  try {
    const response = await axios.get("/trending/movies");
    return response.data; 
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const getTrendingSeries = async () => {
  try {
    const response = await axios.get("/trending/series");
    return response.data; 
  } catch (error) {
    console.error("Error fetching trending series:", error);
    throw error;
  }
};

export const getTrendingBoth = async () => {
    try {
        const response = await axios.get("/trending/all");
        return response.data.slice(0, 10);
    } catch (error) {
        console.error("Error fetching trending movies and series", error);
        throw error;
    }
};