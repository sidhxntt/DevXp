// import { Request, Response, NextFunction } from "express";
// import rc from "./redis_client";

// async function getAll(req: Request, res: Response, next: NextFunction, model: any) {
//   try {
//     const page = parseInt(req.query.page as string || "1", 10);
//     const limit = parseInt(req.query.limit as string || "10", 10);
//     const offset = (page - 1) * limit;

//     // Generate a cache key based on model name, page, and limit
//     const cacheKey = `${model.name}:${page}:${limit}`;

//     // Check if data is cached
//     const cachedData = await rc.get(cacheKey);

//     if (cachedData) {
//       try {
//         const parsedData = JSON.parse(cachedData);
//         return res.status(200).json(parsedData);
//       } catch (error) {
//         console.error("Error parsing cached data:", error);
//       }
//     }

//     // Fetch data from the database
//     const users = await model.findMany({
//       skip: offset,
//       take: limit,
//     });

//     const totalUsers = await model.count();

//     const responseData = {
//       meta: {
//         total: totalUsers,
//         page,
//         limit,
//         totalPages: Math.ceil(totalUsers / limit),
//       },
//       data: users,
//     };

//     // Store response in Redis cache with an expiration time (e.g., 1 hour)
//     await rc.setex(cacheKey, 3600, JSON.stringify(responseData));

//     return res.status(200).json(responseData);
//   } catch (error) {
//     next(error);
//   }
// }

// export default getAll;