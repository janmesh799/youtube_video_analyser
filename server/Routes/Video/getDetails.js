const getVideoInfo = require("../../controller/getVideoInfo");
const calculateEarnings = require("../../controller/calculateEarnings");
const getDetails = async (req, res) => {
  let errorCode = null;
  try {
    const link = req.headers.link;
    const details = await getVideoInfo(link);
    const earnings = calculateEarnings(details);
    if (details) {
      res.status(200).json({ success: true, details, earnings });
    } else {
      errorCode = 404;
      throw new Error("video not found");
    }
  } catch (err) {
    res.status(errorCode || 500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
module.exports = getDetails;
