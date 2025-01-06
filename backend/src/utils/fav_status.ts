import Redis from "ioredis";
import { AuthenticatedRequest } from "../types/Alltypes";
import {  Response, NextFunction } from "express";

async function fav_status(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
  model1: any,
  model2: any,
  model3: any,
  redis: Redis
) {
  try {
    const { userId } = req.auth!;
    const data = req.body;

    // Check if the blog exists
    const ExistingBlog = await model1.findUnique({
      where: { title: data.title },
    });

    if (!ExistingBlog) {
      return res.status(400).json({ message: "Blog not found" });
    }

    // Check if the user exists
    const ExistingUser = await model2.findUnique({
      where: { Clerk_User_Id: userId },
    });
    if (!ExistingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch favorite status from Redis cache
    const cachedStatus = await redis.get(`favorite:${ExistingUser.id}:${data.title}`);
    if (cachedStatus) {
      const parsedCache = JSON.parse(cachedStatus);
      return res.status(200).json({
        title: parsedCache.Favoured_Blog,
        favored: parsedCache.favored,
        message: "Fetched from cache",
      });
    }

    // Cache miss: Fetch from the database
    const favorite = await model3.findUnique({
      where: {
        userId_blogId: {
          userId: ExistingUser.id,
          blogId: ExistingBlog.id,
        },
      },
    });

    const favored = favorite !== null;

    // // Cache the result for future use
    // const cacheMessage = {
    //   userID: ExistingUser.id,
    //   user_email: ExistingUser.email,
    //   Favoured_Blog: data.title,
    //   favored,
    //   message: favored ? "Blog favorited" : "Blog not favorited",
    // };
    // await redis.set(`favorite:${ExistingUser.id}:${data.title}`, JSON.stringify(cacheMessage), "EX", 3600); // Cache for 1 hour

    return res.status(200).json({
      title: data.title,
      favored,
    });
  } catch (error) {
    next(error);
  }
}


export default fav_status