import "./MainVideoCard.css";
import viewIcon from "../../images/viewIcon.svg";
import likeIcon from "../../images/likeIcon.svg";
import commentIcon from "../../images/commentIcon.svg";

const MainVideoCard = (props) => {
  const data = props.data;
  console.log("main video", data);
  return (
    <>
      <h2>Results</h2>
      <div className="main-video-container">
        <div style={{ margin: "auto 0rem" }}>
          <img
            alt="thumbnail"
            className="main-video-thumbnail"
            src={data.details.thumbnail}
          />
          <p className="uploaded-on-text">
            Uploded On: {formatDate(data.details.uploadedOn)}
          </p>
        </div>
        <div className="stats-container">
          <h3>{data.details.title}</h3>
          <span className="stats-text">
            <img
              alt="views"
              style={{ margin: "0.5rem", opacity: "0.75" }}
              src={viewIcon}
            />
            &nbsp; {data.details.views}
          </span>
          <span className="stats-text">
            <img
              alt="likes"
              style={{ margin: "0.5rem", opacity: "0.75" }}
              src={likeIcon}
            />
            &nbsp; {data.details.likes}
          </span>
          <span className="stats-text">
            <img
              alt="comments"
              style={{ margin: "0.5rem", opacity: "0.75" }}
              src={commentIcon}
            />
            &nbsp; {data.details.comments}
          </span>
        </div>
        <div style={{ width: "40%" }}>
          <div className="earnings-box">
            {data.earnings} INR
            <button className="check-button">Check How?</button>
          </div>
        </div>
      </div>
    </>
  );
};

function formatDate(inputDate) {
  // Create a Date object from the input date string
  const date = new Date(inputDate);

  // Define months array for mapping month index to month name
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get individual date components
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = date.getDate();

  // Format the date string
  const formattedDate = `${months[monthIndex]} ${day}, ${year}`;

  return formattedDate;
}

export default MainVideoCard;
