import Redis from "ioredis";
import { AuthenticatedRequest } from "../types/Alltypes";
import { Response, NextFunction } from "express";

// async function set_fav(req: AuthenticatedRequest, res: Response, next: NextFunction, model1: any, model2: any, model3: any) {
//     try {
//         const { userId } = req.auth!;
//         const data = req.body;

//         const ExistingBlog = await model1.findUnique({
//           where: { title: data.title },
//         });

//         if (!ExistingBlog) {
//           return res.status(400).json({ message: "Blog not found" });
//         }

//         const ExistingUser = await model2.findUnique({
//           where: { Clerk_User_Id: userId },
//         });
//         if (!ExistingUser) {
//           return res.status(404).json({ message: "User not found" });
//         }

//         const favorite = await model3.findUnique({
//           where: {
//             userId_blogId: {
//               userId: ExistingUser.id,
//               blogId: ExistingBlog.id,
//             },
//           },
//         });

//         if (favorite) {
//           await model3.delete({
//             where: {
//               id: favorite.id,
//             },
//           });
//           return res.status(200).json({ message: "Blog unfavored" });
//         } else {
//           await model3.create({
//             data: {
//               userId: ExistingUser.id,
//               blogId: ExistingBlog.id,
//             },
//           });
//           return res.status(200).json({ message: "Blog favorited" });
//         }
//       } catch (error) {
//         next(error);
//       }
//   }

async function set_fav(
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

    // Cache key for favorite status and message
    const favoriteCacheKey = `favorite:${ExistingUser.id}:${data.title}`;

    const favorite = await model3.findUnique({
      where: {
        userId_blogId: {
          userId: ExistingUser.id,
          blogId: ExistingBlog.id,
        },
      },
    });

    if (favorite) {
      await model3.delete({
        where: {
          id: favorite.id,
        },
      });

      // Cache the unfavored message
      const unfavoredMessage = {
        userID: ExistingUser.id,
        user_email: ExistingUser.email,
        Favoured_Blog: data.title,
        favored: false,
        message: "Blog unfavored",
      };
      await redis.set(
        favoriteCacheKey,
        JSON.stringify(unfavoredMessage),
        "EX",
        3600
      );

      return res.status(200).json(unfavoredMessage);
    } else {
      // Add the favorite to the database
      await model3.create({
        data: {
          userId: ExistingUser.id,
          blogId: ExistingBlog.id,
        },
      });

      // Cache the favored message
      const favoredMessage = {
        userID: ExistingUser.id,
        user_email: ExistingUser.email,
        Favoured_Blog: data.title,
        favored: true,
        message: "Blog favorited",
      };
      await redis.set(
        favoriteCacheKey,
        JSON.stringify(favoredMessage),
        "EX",
        3600
      ); // Cache for 1 hour

      return res.status(200).json(favoredMessage);
    }
  } catch (error) {
    next(error);
  }
}

export default set_fav;
