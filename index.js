const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_LOGIN,
    pass: process.env.EMAIL_PASS,
  },
});

app.use(express.static(path.join(__dirname + "/public")));
app.use(express.json());

app.listen(PORT);

app.post("/sendmail", (req, res) => {
  const { email, name, content } = req.body;
  const mailOptions = {
    from: "patricjus1@gmail.com",
    to: "pgodlewski099@gmail.com",
    subject: `Portfolio Mail - ${name} - ${email}`,
    text: `
    CONTACT
    |${name}|${email}|
    CONTENT
    ${content}
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  res.status(200);
});
