import home from "./home"
import user from "./user"
import { Application } from "express";


const allRoutes = (app: Application) => {
  app.use("/", home);
  app.use("/user", user);
};

export default allRoutes;
