import { Request, Response, NextFunction } from "express";

interface UserInput {
  email: string;
  name?: string;
}

async function post_user(req: Request, res: Response, next: NextFunction, model: any){
    try {
        const {email, name } = req.body as UserInput;
       // Validate input
       if (!email) {
        return res.status(400).json({ error: "Missing required fields" });
      }
        // Check if a user with the same email or username already exists
        const existingUser = await model.findUnique({
          where: {email},
        });
    
        if (existingUser) {
          return res.status(400).json(
            { error: "Email already registered" }
          );
        }
  
        const User = await model.create({
          data: {
            email,
            name,
          },
        });
    
        return res.status(201).json({ message: "Email registeredsuccessfully", user: User});
      } catch (error) {
        next(error)
      }
}


export default post_user