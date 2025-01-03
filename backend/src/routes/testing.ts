import express, { Request, Response, NextFunction, Router } from "express";
import "dotenv/config";
import { clerkClient, requireAuth } from "@clerk/express";

const router: Router = express.Router();

// Extend the Request type to include the auth property
interface AuthenticatedRequest extends Request {
  auth?: {
    userId: string;
    sessionId: string;
    actor: string | null;
  };
}

router.get(
  "/",
  requireAuth(),
  async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.auth!;
      const user = await clerkClient.users.getUser(userId);
      const {
        id,
        emailAddresses,
        phoneNumbers,
        fullName,
        createdAt,
        updatedAt,
      } = user;
      const createdDate = new Date(createdAt).toISOString();
      const updatedDate = new Date(updatedAt).toISOString();
      const { emailAddress } = emailAddresses[0];
      const { phoneNumber } = phoneNumbers[0];
      console.log({
        id,
        emailAddress,
        phoneNumber,
        fullName,
        createdDate,
        updatedDate,
      });
      res.json({ user });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
