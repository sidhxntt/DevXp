import { AuthenticatedRequest } from "../types/Alltypes";
import {  Response, NextFunction } from "express";
import redis from "./redis_client";

async function fav_status(req: AuthenticatedRequest, res: Response, next: NextFunction, model1: any, model2: any, model3: any) {
    try {
        const { userId } = req.auth!;
        const data = req.body;
    
        const ExistingBlog = await model1.findUnique({
          where: { title: data.title },
        });
    
        if (!ExistingBlog) {
          return res.status(400).json({ message: "Blog not found" });
        }
        const ExistingUser = await model2.findUnique({
          where: { Clerk_User_Id: userId },
        });
        if (!ExistingUser) {
          return res.status(404).json({ message: "User not found" });
        }
    
        const favorite = await model3.findUnique({
          where: {
            userId_blogId: {
              userId: ExistingUser.id, 
              blogId: ExistingBlog.id,
            },
          },
        });
    
        const favored = favorite !== null; 
    
        res.status(200).json({
          title: ExistingBlog.title,
          favored: favored,
        });
      } catch (error) {
        next(error);
      }
  }

export default fav_status