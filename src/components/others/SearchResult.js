import React from "react";
import "./Other.css";
import Card from "./Card";

const SearchResult = ({ results }) => {
  if (results.length === 0) {
    return <div className="no-result">Not Found</div>;
  }

  return (
    <div className="search-results">
      {results.map((item) => (
        <Card
          obj={item}
        />
      ))}
    </div>
  );
};

export default SearchResult;
