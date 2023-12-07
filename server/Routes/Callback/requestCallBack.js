const sendCallBackMail = require("../../controller/sendCallBackMail");

const requestCallBack = async (req, res) => {
  let errorCode = null;
  try {
    const { name, mobile, preferredSlot } = req.body;
    let isSend = await sendCallBackMail("janmesh799@gmail.com", {
      name,
      mobile,
      preferredSlot,
    }) ;
    if(process.env.ravi_email){
      isSend |= await sendCallBackMail(process.env.ravi_email, {
        name,
        mobile,
        preferredSlot,
      }) ;
    }
    if (isSend) {
      res.status(200).json({ success: true, message: "Call Back registered" });
    } else {
      throw new Error("Call Back not registered");
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
