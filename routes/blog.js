import express from "express";
import { createBlog } from "../controllers/blog-controller.js";

const blog = express.Router();

// indicator.get("/", getAllIndicators);
// indicator.get("/:id", getIndicatorById);
// indicator.get("/:id/user", getIndicatorWithUser);
// indicator.put("/:id", editIndicatorDB);
blog.post("/", createBlog);

export default blog;
