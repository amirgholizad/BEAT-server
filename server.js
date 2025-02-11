import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import login from "./routes/login.js";

dotenv.config();
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.use("/login", login);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
