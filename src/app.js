import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";

import Connect from "connect-pg-simple";
import session from "express-session";

import { Database, Resource } from "@adminjs/prisma";
import { adminOptions, authenticateHandler } from "./admin.js";

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

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
