const axios = require("axios");

const fetchUpcomingMovies = async () => {
  try {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/upcoming",
      params: { language: "en-US", page: "1" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZTAzYzhiZjg3MWZhZmI4NzUyMjU0M2ZkZDYwOGFhMCIsInN1YiI6IjY2NmQ1OWYyNmIzYTk0MmQyOGVjMWNkMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AL1uq41P9vVLttjPOswfDZg-TRmeamVc-M4bggKILwM",
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
