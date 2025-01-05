import Redis from "ioredis";
import dotenv from 'dotenv';
dotenv.config();

const redis_connection = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const redis = new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || "13977"),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    });

    redis.on('connect', () => {
      console.log('Successfully connected to Redis!');
      resolve(); 
    });

    redis.on('error', (err) => {
      console.error('Redis connection error:', err);
      reject(err);  
    });
  });
};

export default redis_connection;
