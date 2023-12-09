import React, { useState } from "react";
import LoadingBar from "react-top-loading-bar";
import Phone from "../../images/Phone.svg";
import axios from "axios";
import { toast } from "react-toastify";
import doneIcon from "../../images/doneIcon.svg";
import { useNavigate } from "react-router-dom";
import "./CallBackModal.css";

const APIURL =
  "https://youtube-video-analyser-backend.vercel.app/api/callback/request";
const Modal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [callBackDetails, setCallBackDetails] = useState({
    name: "",
    mobileNumber: "",
    preferredTime: "",
  });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setProgress(10);
      const data = {
        name: callBackDetails.name,
        mobile: callBackDetails.mobileNumber,
        preferredSlot: callBackDetails.preferredTime,
      };
      setProgress(40);

      const response = await axios.post(APIURL, data);
      setProgress(80);
      if (response.data.success) {
        setProgress(100);
        setCallBackSent(true);
      } else {
        setProgress(100);
        throw new Error(response.data.error);
      }
    } catch (err) {
      setProgress(100);
      toast.error(`call back registration failed due to ${err.message}`);
    }
  };
  const onChangeHandler = (e) => {
    setCallBackDetails({ ...callBackDetails, [e.target.name]: e.target.value });
  };
  const [callBackSent, setCallBackSent] = useState(false);
  if (!isOpen) {
    return null;
  }
  if (callBackSent) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          <div>
            <img alt={"done icon"} className="done-icon" src={doneIcon} />
            <p className="request-heading">Request a call back </p>
            <p className="callback-done-text">
              Our Team will call you shortly in 12-24 hrs
            </p>
            <p className="callback-done-text">Can’t you wait for call?</p>
            <button
              onClick={() => {
                onClose();
                navigate("/");
              }}
              className="check-another-button"
            >
              Check another video →
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="modal-overlay">
        <LoadingBar
          color={"red"}
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
        />
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>
            &times;
          </span>
          <span className="request-heading">Request a call back </span>
          <form onSubmit={onSubmitHandler} className="request-form">
            <input
              className="request-input"
              type="text"
              placeholder="Enter Name"
              name="name"
              onChange={onChangeHandler}
              value={callBackDetails.name}
            />
            <input
              className="request-input"
              type="text"
              placeholder="Mobile Number"
              name="mobileNumber"
              onChange={onChangeHandler}
              value={callBackDetails.mobileNumber}
            />
            <input
              className="request-input"
              type="text"
              value={callBackDetails.preferredTime}
              onChange={onChangeHandler}
              name="preferredTime"
              placeholder="Preferred Time"
            />
            <button
              type="submit"
              onClick={onSubmitHandler}
              className="request-submit"
            >
              Request a Call Back
            </button>
          </form>
        </div>
      </div>
    );
  }
};

const CallBackModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div onClick={openModal} className="request-call-back-button">
        <span>
          {" "}
          <img alt="phone icon" src={Phone} />
          Request a call back
        </span>
      </div>
      <div className="modal">
        <Modal isOpen={modalIsOpen} onClose={closeModal} />
      </div>
    </div>
  );
};

export default CallBackModal;
