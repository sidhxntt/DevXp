import home from "./home"
import user from "./user"
import { Application } from "express";
import webhook from "./webhook";

const allRoutes = (app: Application) => {
  app.use("/", home);
  app.use("/user", user);
  app.use("/contentful/webhook", webhook);
};

export default allRoutes;
