import home from "./home"
import user from "./user"
import { Application } from "express";
import webhook from "./webhook";
import addUser from "./addUser";
import addData from "./addData";
import UserfavBlogs from "./UserFav" 

const allRoutes = (app: Application) => {
  app.use("/", home);
  app.use("/user", user);
  app.use("/contentful/webhook", webhook);
  app.use("/add_user", addUser);
  app.use("/add_data", addData);
  app.use("/fav", UserfavBlogs);
};

export default allRoutes;
