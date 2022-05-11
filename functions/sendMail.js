const nodemailer = require("nodemailer");

exports.handler = async function (event, context, callback) {
  try {
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

    // VERIFY IF TRANSPORTER WORKS FINE
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Ready to send emails");
      }
    });

    const messageData = JSON.parse(event.body);

    // console.log(event);
    // console.log(messageData);

    const country = event.headers["x-country"];
    const ip = event.headers["x-forwarded-for"].split(",").pop();

    const { email, name, mobile, message, subject, recipient } = messageData;

    const mailOptions = {
      from: email,
      to: recipient,
      subject: subject,
      text: message,
      html: `<div>You have a new message from ${name}</div> 
  <ul><li>Name : ${name}</li>
  <li>Email : ${email}</li>
  <li>Mobile : ${mobile}</li>
  <li>Message : ${message}</li>
  </ul>
  <br/>
  <br/>
  <p><em>Message received from ${country}:${ip}</em></p>
  `,
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
            data: "Thank you for your message. \r\n We will get back to you soon.",
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
        data: `Sorry. The message could not be sent due to this error : ${error.message}. \r\n  Please try again later. Or contact us on +91-9920019569`,
      }),
    });
  }
};
