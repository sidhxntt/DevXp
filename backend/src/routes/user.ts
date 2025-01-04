import express, { Request, Response, NextFunction } from "express";
import post_user from "../utils/post_user";
import prisma from "../utils/prisma";
const router = express.Router();

router.post("/", async(req: Request, res:Response, next: NextFunction)=>{
    post_user(req, res, next, prisma.subscribing_User)
  })

router.get("/", async(req: Request, res:Response, next: NextFunction)=>{
  res.json({message: "Hello from user route"})
})

export default router;
