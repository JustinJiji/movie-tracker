import axios from "axios";

//Trending
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

//Popular

export const getPopularMovies = async () => {
  try {
    const response = await axios.get("/popular/movies");
    return response.data;
  } catch (error) {
    console.log("Error fetching popular movies", error);
    throw error;
  }
};

export const getPopularSeries = async () => {
  try {
    const response = await axios.get("/popular/series");
    return response.data;
  } catch (error) {
    console.log("Error fetching popular series", error);
    throw error;
  }
};

//Search
export const getSearchedItem = async (query) => {
  try {
    const response = await axios.get("/search/multi", { params: { query } });
    return response.data;
  } catch (error) {
    console.error("Error fetching trending series:", error);
    throw error;
  }
};

//view details

export const getMultiDetails = async (media_type, id) => {
  try {
    const response = await axios.get(`/viewdetails/${media_type}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching multi details", error);
    throw error;
  }
};

//upcoming

export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get("/movie/upcoming");
    return response.data;
  } catch (error) {
    console.error("Error fetching multi details", error);
    throw error;
  }
};