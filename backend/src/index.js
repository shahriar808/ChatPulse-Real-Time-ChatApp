import express from "express";
import path from "path";
import authRouter from "./routes/auth-route.js";
import messageRouter from "./routes/message-route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import events from 'events';
import cors from "cors";
import bodyParser from "body-parser";
import { app, server } from "./lib/socket.js";

dotenv.config();
events.EventEmitter.defaultMaxListeners = 20;

const port = process.env.PORT;
const __dirname = path.resolve();

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
  connectDB();
});