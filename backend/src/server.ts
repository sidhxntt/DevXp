import express, { Express } from "express";
import "dotenv/config";
import connectToDatabase from "./utils/db";
import errorHandling from "./controllers/error";
import cors from "cors";
import allRoutes from "./routes/INDEX";
import redis_connection from "./utils/redis_client";

const app: Express = express();

const port = process.env.PORT_NUMBER 
const server = process.env.SERVER;

app.use(express.json({ limit: "50mb" })); 
app.use(
  cors({
    origin:  process.env.CLIENT, 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

allRoutes(app);

app.use(errorHandling);

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase(); 
    await redis_connection();
    app.listen(port, () => {
      console.log(`Server is running at ${server} 🚀`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error starting the server:", error.message);
    } else {
      console.error("An unknown error occurred while starting the server");
    }
  }
};

startServer();
