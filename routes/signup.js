import express from "express";
import signupController from "../controllers/signup-controller.js";

const signup = express.Router();

signup.post("/", signupController);

export default signup;
