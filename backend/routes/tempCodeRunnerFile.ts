
import dotenv from 'dotenv';
dotenv.config();

console.log("Redis Config:", {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  });
  