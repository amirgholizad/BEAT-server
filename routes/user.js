import express from "express";
import {
  getUserController,
  userAuthController,
  getUserById,
} from "../controllers/user-controller.js";

const user = express.Router();

user.get("/", getUserController);
user.get("/:id", getUserById);
user.get("/authorized", userAuthController);

export default user;
