import express, { Response, NextFunction, Router } from "express";
import {  requireAuth } from "@clerk/express";
import add_clerk_user from "../utils/add_clerk_user";
import prisma from "../utils/prisma";
import { AuthenticatedRequest } from "../types/Alltypes";

const router: Router = express.Router();

router.get( "/", requireAuth(), async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    add_clerk_user(req, res, next, prisma.user)
  }
);

export default router;
