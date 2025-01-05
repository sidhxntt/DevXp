import express, { Request, Response, NextFunction, Router } from "express";
import prisma from "../utils/prisma";
import add_contentful_data from "../utils/add_contentful_data";

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  add_contentful_data(req, res, next, prisma.blogs);
});

export default router;
