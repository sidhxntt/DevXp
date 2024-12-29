import { Worker } from "bullmq";
import nodemailer from "nodemailer";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Configure Nodemailer transporter for Gmail
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: parseInt(process.env.SMTP_PORT || "465"),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
});

// Define the worker
const worker = new Worker(
  "user-emails",
  async (job) => {
    const { userId, email, name, blog_name, content_type } = job.data;

    console.log(`Processing email for user ID: ${userId}`);

    // Sending email using Nodemailer
    try {
      const info = await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "New Blog Post Alert!",
        text: `Hi ! A new blog post is available. Check it out on our website!`,
        html: 
        `<div style="max-width: 42rem; padding: 2rem 1.5rem; margin: 0 auto; background-color: white; color: black; font-family: Arial, sans-serif; line-height: 1.5; background-color: #ffffff;">
          <div style="text-align: center;">
            <img style="height: 12rem; width: 42rem;" src="cid:logo@sid" alt="Logo">
          </div>
      
        <div style="margin-top: 2rem;">
          <h2 style="color: #374151; font-size: 1.5rem; font-weight: 500; margin-bottom: 1rem;">
            Hi ${name},
          </h2>
      
          <p style="color: #4b5563; font-size: 1rem; margin-top: 1rem; margin-bottom: 2rem;">
            A new blog post on <strong>${blog_name}</strong> in <strong>${content_type}</strong> section is available. Check it out now on 
            DevXP.
          </p>
      
          <a href="https://devxp.in/" style="text-decoration: none;">
            <button style="
                padding: 0.5rem 1.5rem;
                font-size: 0.875rem;
                font-weight: 500;
                text-transform: capitalize;
                background-color: #2563eb;
                color: white;
                border: none;
                border-radius: 0.375rem;
                cursor: pointer;
                transition: background-color 0.3s ease-in-out;
                display: inline-block;
              " onmouseover="this.style.backgroundColor='#1e4cb7'" onmouseout="this.style.backgroundColor='#2563eb'">
              Read Blog Post
            </button>
          </a>
      
          <p style="color: #4b5563; font-size: 1rem; margin-top: 2rem;">
            Happy Learning 🚀 <br>
          </p>
        </div>
      </div>`,
      attachments: [
        {
          filename: "logo.png",
          path: "https://devxp.s3.ap-south-1.amazonaws.com/Blue+and+Purple+Neon+Gamer+Logo+(1920+x+1080+px)+(1).png",
          cid: "logo@sid",
        }],
      });
  
      console.log(`Email sent successfully to recipient: ${info.messageId}`);
    } catch (error) {
      console.error(`Failed to send email:`, error);
    }
  },
  {
    connection: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || "13977"),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    },
  }
);

// Error handling
worker.on("error", (error) => {
  console.error("Worker encountered an error:", error);
});

worker.on("completed", (job) => {
  console.log(`Worker completed job with ID ${job.id}`);
});

export default worker;