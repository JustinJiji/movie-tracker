import React from "react";
import "./Other.css";

function Card({ imgSrc }) {
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${imgSrc})`,
      }}
    ></div>
  );
}

export default Card;
