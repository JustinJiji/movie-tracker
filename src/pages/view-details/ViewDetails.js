import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./ViewDetails.css";
import config from "../../config";
import Loader from "../../components/others/Loader";
import { getMultiDetails } from "../../api/Api";
import { MdTranslate } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaBookmark, FaEye, FaEyeSlash } from "react-icons/fa";
import { GoBookmarkSlashFill } from "react-icons/go";
import {
  addToWatchlist,
  addToWatched,
  removeFromWatchlist,
  removeFromWatched,
  getUserWatchedLists,
  getUserWatchlists,
} from "../../firebase/FirestoreUtils";

function ViewDetails() {
  const { media_type, id } = useParams();
  const location = useLocation();
  const { name } = location.state || {};
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(true);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [inWatched, setInWatched] = useState(false);
  const [watchlistButtonMessage, setWatchlistButtonMessage] = useState("");
  const [watchedButtonMessage, setWatchedButtonMessage] = useState("");

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMultiDetails(media_type, id);
        if (Array.isArray(data)) {
          if (data[0].name === name || data[0].title === name) {
            setObj(data[0]);
          } else {
            setObj(data[1]);
          }
        } else {
          setObj(data);
        }
        const userWatchedList = await getUserWatchedLists(); 
        const userWatchlist = await getUserWatchlists()
        setInWatchlist(
          userWatchlist.some(
            (item) => item.id === id && item.name === name
          )
        );
        setInWatched(
          userWatchedList.some(
            (item) => item.id === id && item.name === name
          )
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [media_type, id, name]);

  const handleWatchlistClick = async () => {
    if (inWatchlist) {
      try {
        await removeFromWatchlist(name, id);
        setWatchlistButtonMessage("Removed from watchlist.");
        setInWatchlist(false);
      } catch (error) {
        console.error("Failed to remove from watchlist:", error);
        setWatchlistButtonMessage("Failed to remove from watchlist.");
      }
    } else {
      try {
        await addToWatchlist(name, id);
        setWatchlistButtonMessage("Added to watchlist.");
        setInWatchlist(true);
      } catch (error) {
        console.error("Failed to add to watchlist:", error);
        setWatchlistButtonMessage("Failed to add to watchlist.");
      }
    }
    setTimeout(() => setWatchlistButtonMessage(""), 1000); // Clear message after 3 seconds
  };

  const handleWatchedClick = async () => {
    if (inWatched) {
      try {
        await removeFromWatched(name, id);
        setWatchedButtonMessage("Removed from watched.");
        setInWatched(false);

        // If inWatched is true and inWatchlist is also true, remove from watchlist
      } catch (error) {
        console.error("Failed to remove from watched:", error);
        setWatchedButtonMessage("Failed to remove from watched.");
      }
    } else {
      try {
        await addToWatched(name, id);
        setWatchedButtonMessage("Added to watched.");
        setInWatched(true);

        if (inWatchlist) {
          await removeFromWatchlist(name, id);
          setInWatchlist(false);
          setWatchlistButtonMessage(""); // Clear watchlist message if present
        }
      } catch (error) {
        console.error("Failed to add to watched:", error);
        setWatchedButtonMessage("Failed to add to watched.");
      }
    }
    setTimeout(() => {
      setWatchedButtonMessage("");
      if (!inWatchlist) {
        setWatchlistButtonMessage(""); // Clear watchlist message after 3 seconds
      }
    }, 1000); // Clear message after 3 seconds
  };

  if (loading) return <Loader />;

  return (
    <div
      className="header-image"
      style={{
        backgroundImage: `url(${config.backdropImgBaseUrl}${obj.backdrop_path})`,
      }}
    >
      <div className="header-home-overlay text-side-overlay">
        <div className="backbutton">
          <IoMdArrowRoundBack size={30} onClick={goBack} cursor={"pointer"} />
        </div>
        <div className="header-texts">
          <div className="genres-container">
            {obj.genres &&
              obj.genres.map((genre) => (
                <p key={genre.id} className="genres">
                  {genre.name}
                </p>
              ))}
          </div>
          <div className="header-title">{obj.title || obj.name}</div>
          <div className="header-para">{obj.overview}</div>
          <div className="header-stats">
            <div className="lan-runtime-container">
              <div className="lan-container">
                <MdTranslate className="lan" size={20} />
                {obj.spoken_languages &&
                  obj.spoken_languages.map((language) => (
                    <div key={language.iso_639_1} className="lan">
                      {language.english_name}
                    </div>
                  ))}
              </div>
              <div className="runtime">
                <IoIosTimer size={20} />
                <div style={{ marginLeft: "10px", marginRight: "10px" }}>
                  {`${
                    obj.runtime ||
                    (obj.episode_run_time && obj.episode_run_time[0]) ||
                    "N/A"
                  } min `}
                </div>
                {obj.number_of_episodes ? (
                  <>
                    &bull;&nbsp;
                    {`SS-${obj.number_of_seasons} / `}
                    {`EP-${obj.number_of_episodes}`}
                  </>
                ) : (
                  <>
                    &bull;&nbsp;&nbsp;
                    {obj.release_date
                      ? obj.release_date.slice(0, 4)
                      : "Unknown"}
                  </>
                )}
              </div>
            </div>
            <div className="rating-container">
              <div className="rating">
                <span>
                  {obj.vote_average ? obj.vote_average.toFixed(1) : "N/A"}
                </span>
                <span>/</span>
                <span>10</span>
                <span>{obj.vote_count ? `(${obj.vote_count})` : ""}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="adding-button-container">
          <div
            className={`adding-button ${inWatched ? "inactive" : ""}`}
            onClick={handleWatchlistClick}
            style={{ cursor: inWatched ? "not-allowed" : "pointer" }}
          >
            {watchlistButtonMessage || (
              <>
                {!inWatchlist ? (
                  <FaBookmark size={18} />
                ) : (
                  <GoBookmarkSlashFill size={18} />
                )}
                &nbsp;
                {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </>
            )}
          </div>
          <div className={`adding-button`} onClick={handleWatchedClick}>
            {watchedButtonMessage || (
              <>
                {!inWatched ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                &nbsp; {inWatched ? "Remove from Watched" : "Add to Watched"}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
