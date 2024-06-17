import React from "react";
import { useNavigate } from "react-router-dom";
import "./Other.css";
import config from "../../config";

function Card({ obj, showMediaType }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/viewdetails/${obj.media_type}/${obj.id}`, {
      state: { name: obj.name || obj.title },
    });
  };

  return (
    <div className="card" onClick={handleClick}>
      <div
        className="card-image-container"
        style={{
          backgroundImage: `url(${config.posterImgBaseUrl}${obj.poster_path})`,
        }}
      ></div>
      <span className="text">{obj.title || obj.name}</span>
      {showMediaType ? (
        <span className="text" style={{ color: "white", opacity: "0.5" }}>
          {typeof obj.media_type === "string" ? (
            obj.media_type === "movie" ? (
              <>&bull; Movie &bull;</>
            ) : (
              <>&bull; Series &bull;</>
            )
          ) : (
            ""
          )}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Card;
