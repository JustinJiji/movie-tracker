import { useState } from "react";
import "./Main.css";
import Watched from "../watched/Watched";
import Watchlist from "../watchlist/Watchlist";
import Upcoming from "../upcoming/Upcoming";
import Home from "../home/Home";
import Sidebar from "../../components/sidebar/Sidebar";

const Main = () => {
  const [selectedContent, setSelectedContent] = useState(0);
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const renderContent = () => {
    switch (selectedContent) {
      case 0:
        return <Home />;
      case 1:
        return <Watched />;
      case 2:
        return <Watchlist />;
      case 3:
        return <Upcoming />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="main">
      <Sidebar
        onSelecting={setSelectedContent}
        onSidebarHover={setIsSidebarHovered}
      />
      <div className={`main-content ${isSidebarHovered ? "hovered":""}`}>{renderContent()}</div>
    </div>
  );
};

export default Main;
