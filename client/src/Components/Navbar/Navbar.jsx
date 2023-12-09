import React from "react";
import logo from "../../images/logo.png";

import "./Navbar.css"; // Import the CSS file
import CallBackModal from "../CallBackModal/CallBackModal";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="navbar-container">
        <div
          onClick={() => {
            navigate("/");
          }}
          className="logo-container"
        >
          <img className="logo-image" src={logo} alt="Logo" />
          <div className="logo-text">anchors</div>
          <div className="beta-badge">Beta</div>
        </div>
        <div className="second-part-container">
          <CallBackModal />

          <span
            onClick={() => {
              navigate("/other");
            }}
            className="other-video-button"
          >
            Other videos
          </span>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Navbar;
