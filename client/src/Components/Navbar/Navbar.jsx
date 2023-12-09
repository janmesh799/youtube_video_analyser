import React from "react";
import logo from "../../images/logo.png";

import "./Navbar.css"; // Import the CSS file
import CallBackModal from "../CallBackModal/CallBackModal";

const Navbar = () => {
  return (
    <>
      <div className="navbar-container">
        <div className="logo-container">
          <img className="logo-image" src={logo} alt="Logo" />
          <div className="logo-text">anchors</div>
          <div className="beta-badge">Beta</div>
        </div>
        <div className="second-part-container">
        <CallBackModal />
         
          <span className="other-video-button">Other videos</span>
        </div>
      </div>
      <div >
        
      </div>
    </>
  );
};

export default Navbar;
