// import { Request, Response, NextFunction } from "express";
// import rc from "./redis_client";

// async function getOne(req: Request, res: Response, next: NextFunction, model: any, id: string) {
//   try {
//     const parsedUserID = parseInt(id, 10);

//     if (isNaN(parsedUserID)) {
//       return res.status(400).json({ error: "Invalid user ID" });
//     }

//     const cacheKey = `${model.name}:${parsedUserID}`;
//     const cachedData = await rc.get(cacheKey);

//     if (cachedData) {
//       try {
//         const parsedData = JSON.parse(cachedData);
//         return res.status(200).json(parsedData);
//       } catch (error) {
//         console.error("Error parsing cached data:", error);
//       }
//     }

//     // Fetch data from the database if not in cache
//     const user = await model.findUnique({
//       where: {
//         id: parsedUserID,
//       },
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Cache the fetched user data with an expiration (e.g., 1 hour)
//     await rc.setex(cacheKey, 3600, JSON.stringify(user));

//     return res.status(200).json(user);
//   } catch (error) {
//     next(error);
//   }
// }

// export default getOne;