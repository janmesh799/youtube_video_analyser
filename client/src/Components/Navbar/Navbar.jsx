import React from "react";
import logo from "../../images/logo.png";
import Phone from "../../images/Phone.svg";
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
          <div className="request-call-back-button">
            <span>
              {" "}
              <img src={Phone} />
              Request a call back
            </span>
          </div>
          <span className="other-video-button">Other videos</span>
        </div>
      </div>
      <CallBackModal />
    </>
  );
};

export default Navbar;
