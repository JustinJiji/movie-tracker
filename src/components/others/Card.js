import React from "react";
import { useNavigate } from "react-router-dom";
import "./Other.css";
import config from "../../config";

function Card({ obj }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/viewdetails/${obj.media_type}/${obj.id}`,{
      state: {name: obj.name || obj.title}
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
    </div>
  );
}

export default Card;
