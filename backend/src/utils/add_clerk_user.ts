import { AuthenticatedRequest } from "../types/Alltypes";
import {  Response, NextFunction } from "express";
import { clerkClient } from "@clerk/express";

async function add_clerk_user(req: AuthenticatedRequest, res: Response, next: NextFunction, model: any) {
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
        const phoneNumber = phoneNumbers[0]?.phoneNumber || null;
  
        const name = fullName || null;
  
        const userExists = await model.findUnique({
          where: { Clerk_User_Id: id },
        });
  
        if (userExists) {
          console.log("User Exists:", userExists);
          return res.status(400).send("User already exists");
        }
  
        const newUser = await model.create({
          data: {
            Clerk_User_Id: id,
            email: emailAddress,
            phone_number: phoneNumber,
            name: name,
            createdAt: createdDate,
            updatedAt: updatedDate,
          },
        });
  
        console.log("User Created");

        return res.status(201).json({
          message: "User successfully created",
          user: newUser,
        });
      } catch (error) {
        next(error);
      }
  }

export default add_clerk_user