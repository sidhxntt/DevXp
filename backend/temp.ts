import dotenv from 'dotenv';
dotenv.config();

console.log(
    {
        redis:{
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT || "13977"),
            username: process.env.REDIS_USERNAME,
            password: process.env.REDIS_PASSWORD,
        },
        smtp:{
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "13977"),
            username: process.env.SMTP_USER,
            password: process.env.SMTP_PASSWORD,
        }
    }
)