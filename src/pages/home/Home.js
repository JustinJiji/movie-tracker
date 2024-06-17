import React, { useState, useEffect, useCallback } from "react";
import Card from "../../components/others/Card";
import SearchBar from "../../components/others/SearchBar";
import SearchResult from "../../components/others/SearchResult";
import "./Home.css";
import {
  getPopularMovies,
  getPopularSeries,
  getTrendingBoth,
  getTrendingMovies,
  getTrendingSeries,
  getSearchedItem,
} from "../../api/Api";
import config from "../../config";
import Loader from "../../components/others/Loader";
import { FaTimes } from "react-icons/fa"; 

function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [msboth, setMsboth] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [activeButtonTrending, setActiveButtonTrending] = useState("Movie");
  const [activeButtonPopular, setActiveButtonPopular] = useState("Movie");
  const [searchedResult, setSearchedResult] = useState([]);
  const [error, setError] = useState(null);
  const [searchBG, setSearchBG] = useState(false);

  const handleToggleTrending = (button) => {
    setActiveButtonTrending(button);
  };

  const handleTogglePopular = (button) => {
    setActiveButtonPopular(button);
  };

  const handleSearch = async (query) => {
    try {
      const data = await getSearchedItem(query);
      setSearchedResult(data);
      setError(null);
      setSearchBG(true); // Show search overlay
    } catch (error) {
      setError("Failed to fetch search results");
      setSearchedResult([]);
    }
  };

  const handleCloseSearch = () => {
    setSearchBG(false); // Close search overlay
  };

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % msboth.length);
  }, [msboth.length]);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        const msboth = await getTrendingBoth();
        setMsboth(msboth);
        const trendingMovies = await getTrendingMovies();
        setTrendingMovies(trendingMovies);
        const trendingSeries = await getTrendingSeries();
        setTrendingSeries(trendingSeries);
        const popularMovies = await getPopularMovies();
        setPopularMovies(popularMovies);
        const popularSeries = await getPopularSeries();
        setPopularSeries(popularSeries);
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
    return <Loader />; // Loading
  }

  const currentSlide = msboth[currentSlideIndex];

  return (
    <div className="home">
      {searchBG ? (
        <div className="search-overlay">
          <div className="search-container searchbg-container">
            <SearchBar onSearch={handleSearch} />
            <FaTimes className="close-icon" onClick={handleCloseSearch} />
            {/* Close button */}
          </div>
          <SearchResult results={searchedResult} />
        </div>
      ) : (
        <>
          <div
            className="header-image"
            style={{
              backgroundImage: `url(${config.backdropImgBaseUrl}${currentSlide.backdrop_path})`,
            }}
          >
            <div className="header-home-overlay">
              <div className="search-container">
                <SearchBar onSearch={handleSearch} />
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
                  ? trendingMovies.map((trendingMovie) => (
                      <Card
                        obj={trendingMovie}
                      />
                    ))
                  : trendingSeries.map((trendingSerie) => (
                      <Card
                        obj={trendingSerie}
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
                  ? popularMovies.map((popularMovie) => (
                      <Card
                        obj = {popularMovie}
                      />
                    ))
                  : popularSeries.map((popularSerie) => (
                      <Card
                        obj={popularSerie}
                        />
                    ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
