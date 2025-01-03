import home from "./home"
import user from "./user"
import { Application } from "express";
import webhook from "./webhook";
import testing from "./testing";

const allRoutes = (app: Application) => {
  app.use("/", home);
  // app.use("/user", user);
  // app.use("/contentful/webhook", webhook);
  app.use("/testing", testing);
};

export default allRoutes;
