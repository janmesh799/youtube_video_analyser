const sendCallBackMail = require("../../controller/sendCallBackMail");

const requestCallBack = async (req, res) => {
  let errorCode = null;
  try {
    const { name, mobile, preferredSlot } = req.body;
    await sendCallBackMail("janmesh799@gmail.com", {
      name,
      mobile,
      preferredSlot,
    })
      .then(() => {
        res
          .status(200)
          .json({ success: true, message: "Call Back registered" });
      })
      .catch((err) => {
        throw new Error(`Call Back not registered due to ${err.message}`);
      });
    if (process.env.ravi_email) {
      await sendCallBackMail(process.env.ravi_email, {
        name,
        mobile,
        preferredSlot,
      })
        .then(() => {
          res
            .status(200)
            .json({ success: true, message: "Call Back registered" });
        })
        .catch((err) => {
          throw new Error(`Call Back not registered due to ${err.message}`);
        });
    }
  } catch (err) {
    res.status(errorCode || 500).json({
      success: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
};
module.exports = requestCallBack;
