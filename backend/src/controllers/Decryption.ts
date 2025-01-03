import 'dotenv/config';
import { Request, Response, NextFunction } from 'express';
import { clerkClient } from "@clerk/clerk-sdk-node";
import { JwtPayload as ClerkJwtPayload } from "@clerk/types";

interface CustomJwtPayload extends ClerkJwtPayload {
  sub: string;
  first_name?: string;
  last_name?: string;
  full_name?: string;
  primary_email?: string;
  profile_pic?: string;
  createdAt?: number;
  updatedAt?: number;
}

interface UserReq extends Request {
  user?: CustomJwtPayload;
}

// const decryptJWT = async (req: UserReq, res: Response, next: NextFunction) => {
//   try {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({ message: 'Token is required' });
//     }
//     const decoded = await clerkClient.verifyToken(token);
//     req.user = decoded as CustomJwtPayload;
//     next();
//   } catch (error) {
//     console.error('Error verifying token:', error);
//     return res.status(401).json({ message: 'Invalid or expired token' });
//   }
// };

// export default decryptJWT;
export type { CustomJwtPayload as JwtPayload };