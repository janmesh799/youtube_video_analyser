const calculateEarnings = (details) => {
  try {
    console.log(details);
    const { likes, views, comments, subscribers } = details;
    return Math.min(subscribers, views) + 10 * comments + 5 * likes;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

module.exports = calculateEarnings;
