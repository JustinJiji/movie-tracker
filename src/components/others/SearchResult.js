import React from "react";
import "./Other.css";
import Card from "./Card";
import config from "../../config";

const SearchResult = ({ results }) => {
  if (results.length === 0) {
    return <div className="no-result">Not Found</div>;
  }

  return (
    <div className="search-results">
      {results.map((item) => (
        <Card
          imgSrc={`${config.posterImgBaseUrl}${item.poster_path}`}
          title={item.name || item.title}
        />
      ))}
    </div>
  );
};

export default SearchResult;
