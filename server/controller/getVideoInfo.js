const { default: axios } = require("axios");
const getSubscriberCount = require("./getSubscriberCount");

const apiKey = process.env.apiKey;

async function getVideoInfo(link) {
  try {
    const videoId = link.split("/watch?v=")[1];
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;
    console.log(apiUrl);
    const response = await axios.get(apiUrl);
    const data = await response.data;
    console.log(data);
    if (data.items && data.items.length > 0) {
      const video = data.items[0];
      const { snippet, statistics } = video;
      const subscribers = await getSubscriberCount(snippet.channelId);
      const details = {
        thumbnail: snippet.thumbnails.maxres.url,
        title: snippet.title,
        views: statistics.viewCount,
        likes: statistics.likeCount,
        comments: statistics.commentCount,
        uploadedOn: snippet.publishedAt,
        subscribers,
      };
      return details;
    } else {
      console.log("Video not found");
      return false;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
module.exports = getVideoInfo;
