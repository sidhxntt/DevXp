import express, { Request, Response, NextFunction } from "express";
import { Queue } from "bullmq";
import prisma from "../prisma/prisma"; // Ensure prisma is correctly imported
import formatString from "../utils/formattingstrings";
const router = express.Router();


// Initialize BullMQ queue
const emailQueue = new Queue("user-emails", {
  connection: {
    host: "192.168.1.40", // Replace with your Redis host
    port: 6379,         // Replace with your Redis port
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
    }

    res.status(200).send("Webhook received and users processed");
  } catch (error) {
    next(error);
  }
});

export default router;
