import express, { Request, Response, NextFunction, Router } from "express";
import "dotenv/config";
import { clerkClient, requireAuth } from "@clerk/express";
import prisma from "../utils/prisma";

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
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
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

      const userExists = await prisma.user.findUnique({
        where: { Clerk_User_Id: id },
      });

      if (userExists) {
        console.log("User Exists:", userExists);
        return res.status(200).send("User already exists");
      }

      const newUser = await prisma.user.create({
        data: {
          Clerk_User_Id: id,
          email: emailAddress,
          phone_number: phoneNumber,
          name: fullName,
          createdAt: createdDate,
          updatedAt: updatedDate,
        },
      });

      console.log("User Created:", newUser);

      return res.status(201).json({
        message: "User successfully created",
        user: newUser,
      });

    } catch (error) {
      next(error);
    }
  }
);

router.post("/contentful", async (req: Request, res: Response, next: NextFunction) => {
  try { 
    const data = req.body;
    console.log(data)
    data.map((item: any) => {
      console.log(item.fields.title);
      console.log(item.sys.contentType.sys.id)
    });
    res.status(200).json({ message: "Data received successfully", data: req.body });
  } catch (error) {
    next(error);  
  }
});


export default router;
