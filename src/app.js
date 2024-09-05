import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import express from "express";

import { Database, Resource } from "@adminjs/prisma";
import { adminOptions } from "./admin.js";

AdminJS.registerAdapter({ Database, Resource });
const PORT = 4000;

const start = async () => {
  const app = express();

  const admin = new AdminJS(adminOptions);
  admin.watch();

  const adminRouter = AdminJSExpress.buildRouter(admin);
  // Attach the AdminJS router
  app.use(admin.options.rootPath, adminRouter);

  app.listen(PORT, () => {
    console.log(
      `AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`
    );
  });
};

start();
