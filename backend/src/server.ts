import express, { Express, Request, Response, NextFunction } from "express";
import "dotenv/config";
import connectToDatabase from "./db";
import errorHandling from "./controllers/error";
import cors from "cors";
import allRoutes from "./routes/INDEX";

const app: Express = express();

const port = process.env.PORT_NUMBER || 4000; 
const server = process.env.SERVER || "http://localhost";

app.use(express.json({ limit: "50mb" })); 
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

allRoutes(app);

app.use(errorHandling);

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase(); 
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
