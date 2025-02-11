import react from "react";
import express from "express";

const login = express.Router();

login.get("/", (req, res) => {
  res.send("Hello from login route!");
});

export default login;
