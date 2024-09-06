const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "paradisesl.dev@gmail.com",
    pass: "pgdg urdb iuir trcs",
  },
});

app.post("/send-email", (req, res) => {
  const { to, message } = req.body;

  const mailOptions = {
    from: "paradisesl.dev@gmail.com",
    to: to,
    subject: "Congratulations! You got your visa approved!",
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
              body {
                  font-family: Arial, sans-serif;
                  color: #333;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
              }
              .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                  overflow: hidden;
              }
              .header {
                  background-color: #2f80ed;
                  color: #ffffff;
                  padding: 20px;
                  text-align: center;
              }
              .content {
                  padding: 20px;
              }
              .footer {
                  background-color: #f1f1f1;
                  text-align: center;
                  padding: 10px;
                  font-size: 12px;
              }
              a {
                  color: #2f80ed;
                  text-decoration: none;
              }
              .button {
                  display: inline-block;
                  padding: 10px 20px;
                  font-size: 16px;
                  color: #ffffff;
                  background-color: #2f80ed;
                  text-align: center;
                  border-radius: 4px;
                  text-decoration: none;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h1>Congratulations on your visa approval!</h1>
              </div>
              <div class="content">
                  <p>Hello,</p>
                  <p>Our team has reviewed your visa application:</p>
                  <p>${message}</p>
                  <p>Best regards,<br>Paradise Sri Lanka</p>
              </div>
              <div class="footer">
                  <p>© 2024 Paradise Sri Lanka. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
      res.status(500).send("Failed to send email");
    } else {
      console.log("Email sent:", info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
