import express, { Request, Response, NextFunction } from "express";
import { Queue } from "bullmq";
const router = express.Router();
import dotenv from 'dotenv';
import formatString from "../utils/formattingStrings";
import prisma from "../utils/prisma";
dotenv.config();


// Initialize BullMQ queue
const emailQueue = new Queue("user-emails", {
  connection: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || "13977"), 
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
  defaultJobOptions:{
    attempts: 3,
    removeOnComplete: true,
    removeOnFail: true
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany();

    const blog_name = req.body.fields.title['en-US'];
    const content_type = req.body.sys.contentType.sys.id;
    // Add each user's data to the BullMQ queue
    for (const user of users) {
      await emailQueue.add("send-email", {
        userId: user.id,
        email: user.email,
        name: user.name,
        blog_name,
        content_type: formatString(content_type),
      });
      console.log(`Queued email event for user: ${user.email}`);
      // run the job worker here (path of worker file is ../utils/worker.ts )
    }

    res.status(200).send("Webhook received and users processed");
  } catch (error) {
    next(error);
  }
});

export default router;
