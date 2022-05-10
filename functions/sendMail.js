const nodemailer = require("nodemailer");

exports.handler = function (event, context, callback) {
  const mailConfig = {
    host: "smtp.mailgun.org",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILGUN_USER,
      pass: process.env.MAILGUN_PASSWORD,
    },
  };
  const transporter = nodemailer.createTransport(mailConfig);

  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to send emails");
    }
  });

  const { email, name, mobile, message, subject, recipient } = event.body;

  const mailOptions = {
    from: email,
    to: recipient,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, success) => {
    if (error) {
      console.log(error);
      callback(error);
    } else {
      console.log("email sent");
      callback(null, {
        status: "success",
        message: "Email sent successfully",
      });
    }
  });
};
