const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "-@gmail.com",
    pass: "-",
  },
});

const scheduleEmail = (email1, email2, startTime) => {
  var mailOptions1 = {
    from: "-@gmail.com",
    to: `${email1}`,
    subject: "Interview Scheduled",
    text: `Hi.Your interview is scheduled at ${startTime}`,
  };
  transporter.sendMail(mailOptions1, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  var mailOptions2 = {
    from: "-@gmail.com",
    to: `${email2}`,
    subject: "Interview Scheduled",
    text: `Hi.Your interview is scheduled at ${startTime}`,
  };
  transporter.sendMail(mailOptions2, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = scheduleEmail;
