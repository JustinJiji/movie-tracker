import React from "react";
import Card from "../../components/others/Card";
import SearchBar from "../../components/others/SearchBar";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <div className="search-container">
        <SearchBar />
      </div>
      <div className="home-content-container">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
export default Home;
