import React from "react";
import "./Other.css";

function Card({ imgSrc ,title}) {
  return (
    <div className="card">
      <div
        className="card-image-container"
        style={{
          backgroundImage: `url(${imgSrc})`,
        }}
      ></div>
      <span className="text"> {title}</span>
    </div>
  );
}

export default Card;
