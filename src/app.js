import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";

import Connect from "connect-pg-simple";
import session from "express-session";

import nodemailer from "nodemailer";
import bodyParser from "body-parser";

import { Database, Resource } from "@adminjs/prisma";
import { adminOptions, authenticateHandler, prisma } from "./admin.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "paradisesl.dev@gmail.com",
    pass: "pgdg urdb iuir trcs",
  },
});

AdminJS.registerAdapter({ Database, Resource });
const PORT = 4000;

const DEFAULT_ADMIN = {
  email: "admin@example.com",
  password: "password",
};

const start = async () => {
  const app = express();

  const admin = new AdminJS(adminOptions);
  admin.watch();

  const ConnectSession = Connect(session);
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === "production",
    },
    tableName: "session",
    createTableIfMissing: true,
  });

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate: authenticateHandler,
      cookieName: "adminjs",
      cookiePassword: "sessionsecret",
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: "sessionsecret",
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    }
  );

  // const adminRouter = AdminJSExpress.buildRouter(admin);

  app.use(admin.options.rootPath, adminRouter);

  app.get("/api/applicants", async (req, res) => {
    try {
      const applicants = await prisma.applicant.findMany({});
      res.json(applicants);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/check", async (req, res) => {
    const { firstName, lastName, countryCode, sex, applicantId } = req.body;
    try {
      const redNoticeUrl = `https://ws-public.interpol.int/notices/v1/red?forename=${encodeURIComponent(
        firstName
      )}&name=${encodeURIComponent(lastName)}&nationality=${encodeURIComponent(
        countryCode
      )}&ageMax=120&ageMin=18&sexId=${encodeURIComponent(
        sex
      )}&arrestWarrantCountryId=${encodeURIComponent(
        countryCode
      )}&page=1&resultPerPage=200`;

      const yellowNoticeUrl = `https://ws-public.interpol.int/notices/v1/yellow?forename=${encodeURIComponent(
        firstName
      )}&name=${encodeURIComponent(lastName)}&nationality=${encodeURIComponent(
        countryCode
      )}&ageMax=120&ageMin=18&sexId=${encodeURIComponent(
        sex
      )}&arrestWarrantCountryId=${encodeURIComponent(
        countryCode
      )}&page=1&resultPerPage=200`;

      // Send requests to the Interpol API for both Red and Yellow Notices in parallel
      const [redResponse, yellowResponse] = await Promise.all([
        axios.get(redNoticeUrl, {
          headers: {
            "accept-language": "en-US,en;q=0.9",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 OPR/112.0.0.0",
          },
        }),
        axios.get(yellowNoticeUrl, {
          headers: {
            "accept-language": "en-US,en;q=0.9",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 OPR/112.0.0.0",
          },
        }),
      ]);

      // Extract relevant data from both responses
      const redNotices = redResponse.data._embedded?.notices || [];
      const yellowNotices = yellowResponse.data._embedded?.notices || [];

      // Prepare response message
      const totalRedNotices = redNotices.length;
      const totalYellowNotices = yellowNotices.length;

      const message = [
        totalRedNotices > 0
          ? "Interpol found ${totalRedNotices} red notice(s) for ${firstName} ${lastName}."
          : "No red notices found for ${firstName} ${lastName}.",
        totalYellowNotices > 0
          ? "Interpol found ${totalYellowNotices} yellow notice(s) for ${firstName} ${lastName}."
          : "No yellow notices found for ${firstName} ${lastName}.",
      ];

      const updatedRows = await prisma.applicant.updateMany({
        where: {
          applicantId: applicantId, // replace with the condition for selecting the rows to update
        },
        data: {
          status:
            totalRedNotices > 0
              ? "Rejected"
              : totalYellowNotices > 0
              ? "Flagged"
              : "Approved",
          reasonForReeject:
            totalRedNotices > 0
              ? `Interpol found ${totalRedNotices} red notice(s) for ${firstName} ${lastName}.`
              : totalYellowNotices > 0
              ? `Interpol found ${totalYellowNotices} yellow notice(s) for ${firstName} ${lastName}.`
              : "",
        },
      });

      res.json({
        message: message.join(" "),
        redNotices, // Send red notices to the frontend for further use
        yellowNotices, // Send yellow notices to the frontend for further use
      });
    } catch (error) {
      console.error("Error communicating with Interpol API:", error);
      res.status(500).json({
        message: "There was an error while checking Interpol notices.",
      });
    }
  });

  app.post("/api/applicants", async (req, res) => {
    try {
      const applicants = await prisma.applicant.findMany({});
      res.json(applicants);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
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

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
