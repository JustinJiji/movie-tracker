import React, { useState, useEffect, useCallback } from "react";
import Card from "../../components/others/Card";
import SearchBar from "../../components/others/SearchBar";
import "./Home.css";
import { getTrendingMovies, getTrendingSeries } from "../../api/Api";

function Home() {
  const [movies, setMovies] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const imageBaseUrl =
    "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2";

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % movies.length);
  }, [movies.length]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const movies = await getTrendingMovies();
        // const series = await getTrendingSeries(); // Uncomment if you plan to use it later
        console.log("Fetched movies:", movies);
        setMovies(movies);
        // setSeries(series); // Uncomment if you plan to use it later
      } catch (error) {
        console.error("Failed to fetch trending data", error);
      }
    };

    fetchTrendingData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  if (movies.length === 0) {
    console.log("Loading state");
    return <div>Loading...</div>; // Loading state
  }

  const currentSlide = movies[currentSlideIndex];

  return (
    <div className="home">
      <div
        className="header-image"
        style={{ backgroundImage: `url(${imageBaseUrl}${currentSlide.backdrop_path})` }}
      >
        <div className="header-home-overlay">
          <div className="search-container">
            <SearchBar />
          </div>
          <div className="header-texts">
            <div className="header-title">{currentSlide.title}</div>
            <div className="header-para">{currentSlide.overview}</div>
          </div>
          <div className="slide-indicators">
            {movies.map((slide, index) => (
              <span
                key={index}
                className={index === currentSlideIndex ? "active" : ""}
                onClick={() => setCurrentSlideIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>

      <div className="home-content-container">
        <div className="home-cards-container">
          <div className="home-cards-title">Trending</div>
          <div className="home-cards-list">
            {Array.from({ length: 13 }).map((_, index) => (
              <Card key={index} />
            ))}
          </div>
        </div>
        <div className="home-cards-container">
          <div className="home-cards-title">Popular</div>
          <div className="home-cards-list">
            {Array.from({ length: 13 }).map((_, index) => (
              <Card key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
