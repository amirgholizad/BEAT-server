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

dotenv.config();
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const PORT = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());
app.use(
  cors({
    origin: CORS_ORIGIN,
  })
);

app.use("/", root);

app.use("/login", login);
app.use("/signup", signup);
app.use("/user", user);
app.use("/indicator", indicator);
app.use("/upload", uploadRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
