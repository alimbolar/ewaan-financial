const nodemailer = require("nodemailer");
// CONFIG FOR SENDING EMAIL
const mailConfig = {
  host: "smtp.mailgun.org",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAILGUN_USER,
    pass: process.env.MAILGUN_PASSWORD,
  },
};

// CREATE TRANSPORTER
const transporter = nodemailer.createTransport(mailConfig);

exports.handler = function (event, context, callback) {
  try {
    // VERIFY IF TRANSPORTER WORKS FINE
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Ready to send emails");
      }
    });

    const messageData = JSON.parse(event.body);

    const country = event.headers["x-country"];
    const ip = event.headers["x-forwarded-for"].split(",").pop();

    const { email, name, mobile, message, subject, recipient } = messageData;

    const htmlMessage = () => {
      return `<div><strong>You have a new message from your website</strong></div>
      <ul><li><strong>Name : </strong> ${name}</li>
      <li><strong>Email :</strong> ${email}</li>
      <li><strong>Mobile : </strong> ${mobile}</li>
      <li><strong>Message :</strong> ${message}</li>
      </ul>
      <br/>
      <br/>
      <p><em>Message received from ${country}:${ip}</em></p>
      `;
    };
    const mailOptions = {
      from: email,
      to: recipient,
      subject: subject,
      text: message,
      html: htmlMessage(),
    };

    transporter.sendMail(mailOptions, (error, success) => {
      if (error) {
        console.log(error);
        callback(error);
      } else {
        console.log("email sent");
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            status: "success",
            data: "Thank you for your message. \r\n \r\n We will get back to you soon.",
          }),
        });
      }
    });
  } catch (error) {
    console.log(error);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        status: "fail",
        data: `Sorry. The message could not be sent due to this error : ${error.message}. \r\n  \r\n Please try again later. Or contact us on +91-9920019569`,
      }),
    });
  }
};
