import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import login from "./routes/login.js";
import signup from "./routes/signup.js";
import root from "./routes/root.js";
import user from "./routes/user.js";
import indicator from "./routes/indicator.js";
import uploadRoute from "./routes/upload.js";
import bodyParser from "body-parser";
import blog from "./routes/blog.js";
import { createServer } from "http";
import { Server } from "socket.io";
import coinbase from "./routes/coinbase.js"; // Import the WebSocket route

dotenv.config();
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api", root);

// Use API routes
app.use("/api/login", login);
app.use("/api/signup", signup);
app.use("/api/user", user);
app.use("/api/indicator", indicator);
app.use("/api/upload", uploadRoute);
app.use("/api/blog", blog);
app.use("/api/covers", express.static("./public/uploads"));

// Use the WebSocket route
coinbase(io);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.listen(3001, () => {
  console.log("Socket.io server running on port 3001");
});
