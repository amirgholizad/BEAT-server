import express from "express";

const root = express.Router();

root.get("/", (_req, res) => {
  res.send("Hello There!").status(200);
});

export default root;
