import React, { useState } from "react";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faNewspaper,
  faBookmark,
  faHome,
  faPowerOff,
  faEye,

} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function Sidebar({ onSelecting, onSidebarHover }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleItemClick = (index) => {
    setActiveIndex(index);
    onSelecting(index);
  };

  const handleItemHover = (index) => {
    setHoverIndex(index);
  };

  const navigate = useNavigate();
  const menuItems = [
    { icon: faHome, label: "Home" },
    { icon: faEye, label: "Watched" },
    { icon: faBookmark, label: "Watchlist" },
    { icon: faNewspaper, label: "Upcoming" },
  ];

  return (
    <div>
      <aside
        className="sidebar"
        onMouseEnter={() => onSidebarHover(true)}
        onMouseLeave={() => onSidebarHover(false)}
      >
        <nav className="menu">
          <div className="logo">
            <span>MovieTracker</span>
            <span>MT</span>
          </div>
          <ul className="menu-main-options">
            {menuItems.map((item, index) => (
              <li
                key={index}
                className={`${activeIndex === index ? "active" : ""} ${
                  hoverIndex === index ? "hover" : ""
                }`}
                onClick={() => handleItemClick(index)}
                onMouseEnter={() => handleItemHover(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <FontAwesomeIcon icon={item.icon} fontSize={23} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <ul className="logout">
            <li onClick={() => navigate("/")}>
              <FontAwesomeIcon icon={faPowerOff} fontSize={23} />
              <span>Logout</span>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
