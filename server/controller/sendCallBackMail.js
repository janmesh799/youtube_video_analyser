const nodemailer = require("nodemailer");

const senderEmail = process.env.senderEmail;
const senderPass = process.env.senderPass;
const sendCallBackMail = async (receiverEmail, details) => {
  try {
    console.log(senderEmail, senderPass);
    ``;
    let mailTransporter = nodemailer.createTransport({
      //   service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: senderEmail,
        pass: senderPass,
      },
    });
    let mailDetails = {
      from: process.env.senderEmail,
      to: receiverEmail,
      subject: `call back request by ${details.name} `,
      html: `
      <h3> User Details </h3>
      <ul> 
      <li> <strong>Name: </strong>  ${details.name} </li>
      <li> <strong>Phone: </strong>  ${details.mobile} </li>
      <li> <strong>Preferred Time: </strong>  ${details.preferredSlot} </li>
      </ul> 
       `,
    };
    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.log("Error Occurs");
        console.log(err.message);
        return false;
      } else {
        console.log("Email sent successfully");
        console.log(data.response);
        return false;
      }
    });

    return true;
  } catch (err) {
    console.log(err.message);
    return false;
  }
};
module.exports = sendCallBackMail;
