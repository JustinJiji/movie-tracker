import React, { useState, useEffect, useCallback } from "react";
import Card from "../../components/others/Card";
import SearchBar from "../../components/others/SearchBar";
import "./Home.css";
import {
  getTrendingBoth,
  getTrendingMovies,
  getTrendingSeries,
} from "../../api/Api";
import config from "../../config";

function Home() {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [msboth, setMsboth] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeButtonTrending, setActiveButtonTrending] = useState("Movie");
  const [activeButtonPopular, setActiveButtonPopular] = useState("Movie");

  const handleToggleTrending = (button) => {
    setActiveButtonTrending(button);
  };

  const handleTogglePopular = (button) => {
    setActiveButtonPopular(button);
  };

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % msboth.length);
  }, [msboth.length]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const msboth = await getTrendingBoth();
        setMsboth(msboth);
        const movies = await getTrendingMovies();
        setMovies(movies);
        const series = await getTrendingSeries();
        setSeries(series);
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

  if (msboth.length === 0) {
    console.log("Loading state");
    return <div>Loading...</div>; // Loading state
  }

  const currentSlide = msboth[currentSlideIndex];

  return (
    <div className="home">
      <div
        className="header-image"
        style={{
          backgroundImage: `url(${config.backdropImgBaseUrl}${currentSlide.backdrop_path})`,
        }}
      >
        <div className="header-home-overlay">
          <div className="search-container">
            <SearchBar />
          </div>
          <div className="header-texts">
            <div className="header-title">
              {currentSlide.title || currentSlide.name}
            </div>
            <div className="header-para">{currentSlide.overview}</div>
          </div>
          <div className="slide-indicators">
            {msboth.map((slide, index) => (
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
          <div className="home-cards-title">
            Trending
            <div className="home-cards-toggle-container">
              <div
                className={`home-cards-toggle-button ${
                  activeButtonTrending === "Movie" ? "active" : ""
                }`}
                onClick={() => handleToggleTrending("Movie")}
              >
                Movie
              </div>
              <div
                className={`home-cards-toggle-button ${
                  activeButtonTrending === "Series" ? "active" : ""
                }`}
                onClick={() => handleToggleTrending("Series")}
              >
                Series
              </div>
            </div>
          </div>
          <div className="home-cards-list">
            {activeButtonTrending === "Movie"
              ? movies.map((movie) => (
                  <Card
                    key={movie.id}
                    imgSrc={`${config.posterImgBaseUrl}${movie.poster_path}`}
                  />
                ))
              : series.map((serie) => (
                  <Card
                    key={serie.id}
                    imgSrc={`${config.posterImgBaseUrl}${serie.poster_path}`}
                  />
                ))}
          </div>
        </div>
        <div className="home-cards-container">
          <div className="home-cards-title">
            Popular
            <div className="home-cards-toggle-container">
              <div
                className={`home-cards-toggle-button ${
                  activeButtonPopular === "Movie" ? "active" : ""
                }`}
                onClick={() => handleTogglePopular("Movie")}
              >
                Movie
              </div>
              <div
                className={`home-cards-toggle-button ${
                  activeButtonPopular === "Series" ? "active" : ""
                }`}
                onClick={() => handleTogglePopular("Series")}
              >
                Series
              </div>
            </div>
          </div>
          <div className="home-cards-list">
            {activeButtonPopular === "Movie"
              ? movies.map((movie) => (
                  <Card
                    key={movie.id}
                    imgSrc={`${config.posterImgBaseUrl}${movie.poster_path}`}
                  />
                ))
              : series.map((serie) => (
                  <Card
                    key={serie.id}
                    imgSrc={`${config.posterImgBaseUrl}${serie.poster_path}`}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
