import React from "react";
import "./Other.css";
// import { FiAlertOctagon } from "react-icons/fi";
import { TiThLargeOutline } from "react-icons/ti";

function Loader() {
  return (
    <div className="loader">
      <TiThLargeOutline className="loading-icon" />
    </div>
  );
}
export default Loader;
