import { clerkClient } from "@clerk/express";
import { AuthenticatedRequest } from "../types/Alltypes";
import {  Response, NextFunction } from "express";

async function get_fav(req: AuthenticatedRequest, res: Response, next: NextFunction, model1: any, model2: any) {
    try {
        const { userId } = req.auth!;
        const user = await clerkClient.users.getUser(userId);
        const { id } = user;
  
        const userExists = await model1.findUnique({
          where: { Clerk_User_Id: id },
        });
  
        if (!userExists) {
          return res.status(404).json({ message: "User not found" });
        }
  
        const UserFavBlogs = await model2.findMany({
          where: { userId: userExists.id },
          include: {
            Blog: true,
          },
        });
  
        return res.status(200).json({
          "User Fav Blogs": UserFavBlogs,
        });
      } catch (error) {
        next(error);
      }
  }

export default get_fav