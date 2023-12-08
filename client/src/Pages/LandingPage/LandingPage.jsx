import React, { useEffect, useState } from "react";
import axios from "axios";
import "./LandingPage.css"; // Import the corresponding CSS file
import youtubeIcon from "../../images/youtubeIcon.svg";
import playButton from "../../images/playButton.svg";
import MainVideoCard from "../../Components/MainVideoCard/MainVideoCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const queryParameters = new URLSearchParams(window.location.search);
  let searchedLink = queryParameters.get("link");
  if (searchedLink) searchedLink = searchedLink.trim();
  const [link, setLink] = useState("");
  const [data, setData] = useState({
    success: false,
    details: {
      thumbnail: "",
      title: "",
      views: "",
      likes: "",
      comments: "",
      uploadedOn: "",
      subscribers: "",
    },
    earnings: 0,
  });
  const linkHandler = (e) => {
    setLink(e.target.value);
  };
  useEffect(() => {
    console.log("searched link = ", searchedLink);
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          link: searchedLink,
        },
      };
      try {
        const response = await axios.get(
          "https://youtube-video-analyser-backend.vercel.app/api/video",
          config
        );

        const videoId = searchedLink.split("?v=")[1];

        let linksList = JSON.parse(localStorage.getItem("links")) || [];

        if (!linksList.includes(videoId)) {
          linksList.push(videoId);
          localStorage.setItem("links", JSON.stringify(linksList));
        }

        if (response.status === 200) {
          setData(response.data);
        }
      } catch (err) {
        console.log(err.message);
        toast.warn("Video Not Found");
      }
    };
    if (searchedLink) fetchData();
  }, [searchedLink]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100vw",
        justifyContent: "center",
        textAlign: "center",
        alignContent: "center",
        margin: "2rem auto",
      }}
    >
      <h1 className="heading-h1"> Discover your earning potential </h1>
      <h3 className="heading-h3">
        Turn your Youtube expertise into a lucrative income through resource
        sharing
      </h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form className="search-form">
          <div className="input-container">
            <img alt="youtubeicon" style={{ width: "20%" }} src={youtubeIcon} />
            <input
              placeholder="enter youtube video link"
              className="search-input"
              type="text"
              value={link}
              onChange={linkHandler}
            />
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(`/?link=${link}`);
            }}
            className="search-button"
          >
            Check Earning
          </button>
        </form>
      </div>
      <div className="play-art">
        <img alt="playicon" className="play-img" src={playButton} />
      </div>
      <div
        style={{
          margin: "auto",
        }}
      >
        {data.success && <MainVideoCard data={data} />}
      </div>
    </div>
  );
};

export default LandingPage;
