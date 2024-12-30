import express, { Express } from "express";
import "dotenv/config";
import error_handling from "./controllers/error";
import connectToDatabase from "./db";
import bodyParser from "body-parser";
import cors from "cors"; 
import allRoutes from "./routes/INDEX";

const app: Express = express();
const port = process.env.PORT_NUMBER;
const server = process.env.SERVER

app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};


app.use(cors(corsOptions));
app.use(cors());

const StartServer = async(): Promise<void> => {
  try {
    await connectToDatabase()
    app.listen(port, () => {
      console.log(`Example app is now listening at: ${server}🐳`);
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message);
    } else {
      console.log("An unknown error occurred");
    }
  }
};

allRoutes(app);
app.use(error_handling);

StartServer();
