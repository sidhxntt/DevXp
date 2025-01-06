import express, { Response, NextFunction, Router } from "express";
import { requireAuth } from "@clerk/express";
import prisma from "../utils/prisma";
import { AuthenticatedRequest } from "../types/Alltypes";
import set_fav from "../utils/set_favblogs";
import get_fav from "../utils/get_favblogs";
import fav_status from "../utils/fav_status";
import redis_connection from "../utils/redis_client";

const redis = redis_connection();
const router: Router = express.Router();

router.post(
  "/set_favblog",
  requireAuth(),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    set_fav(req, res, next, prisma.blogs, prisma.user, prisma.favorite, redis);
  }
);

router.get(
  "/get_favblog",
  requireAuth(),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    get_fav(req, res, next, prisma.user, prisma.favorite);
  }
);

router.post(
  "/fav_status",
  requireAuth(),
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    fav_status(req, res, next, prisma.blogs, prisma.user, prisma.favorite, redis);
  }
);

export default router;
