import { Request, Response, NextFunction } from "express";
import getEmailPrefix from "./domain_removal";

interface UserInput {
  email: string;
}

async function post_user(req: Request, res: Response, next: NextFunction, model: any) {
  try {
    const { email } = req.body as UserInput;

    if (!email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingUser = await model.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const user = await model.create({
      data: {
        email,
        name: getEmailPrefix(email),
        subscribedAt: new Date(),
      },
    });

    return res.status(201).json({
      message: "Email registered successfully",
      user: user,
    });
  } catch (error) {
    next(error);
  } 
}

export default post_user;
