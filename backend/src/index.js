import express from "express";
import authRouter from "./routes/auth-route.js";
import messageRouter from "./routes/message-route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import events from 'events';
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
events.EventEmitter.defaultMaxListeners = 20;

const app = express();
const port = process.env.PORT || 5001;

// Increase the limit for the request payload size
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
  connectDB();
});