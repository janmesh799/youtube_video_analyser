const apiKey = process.env.apiKey;

async function getSubscriberCount(channelId) {
  try {
    const apiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.items && data.items.length > 0) {
      const channel = data.items[0];
      const { statistics } = channel;

      return statistics.subscriberCount;
    } else {
      return 0;
      console.log("Channel not found");
    }
  } catch (error) {
    return 0;
    console.error("Error fetching data:", error);
  }
}

module.exports = getSubscriberCount;
