import express from "express";
import getUserController from "../controllers/user-controller.js";

const user = express.Router();

user.get("/", getUserController);

export default user;
