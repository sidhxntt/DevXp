import express, { Request, Response, NextFunction } from "express";
import post_user from "../utils/post_user";
const router = express.Router();
import prisma from "../../prisma/prisma"

router.post("/", async(req: Request, res:Response, next: NextFunction)=>{
    post_user(req, res, next, prisma.user)
  })

router.get("/", async(req: Request, res:Response, next: NextFunction)=>{
  res.json({message: "Hello from user route"})
})

export default router;
