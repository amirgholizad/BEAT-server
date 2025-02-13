import express from "express";
import {
  getUserController,
  userAuthController,
} from "../controllers/user-controller.js";

const user = express.Router();

user.get("/", getUserController);
user.get("/authorized", userAuthController);

export default user;
