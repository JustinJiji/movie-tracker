import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import "./ViewDetails.css";
import config from "../../config";
import Loader from "../../components/others/Loader";
import { getMultiDetails } from "../../api/Api";
import { MdTranslate } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaBookmark, FaEye } from "react-icons/fa";

function ViewDetails() {
  const { media_type, id } = useParams();
  const location = useLocation();
  const { name } = location.state || {};
  const [obj, setObj] = useState({});
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [media_type, id]);

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
          <div className="adding-button">
            <FaBookmark size={18} />
            &nbsp; Add to Watchlist
          </div>
          <div className="adding-button">
            <FaEye size={18}/>
            &nbsp; Add to Watched
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewDetails;
