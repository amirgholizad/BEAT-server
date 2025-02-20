import express from "express";
import { createBlog, getAllBlogs } from "../controllers/blog-controller.js";

const blog = express.Router();

blog.get("/", getAllBlogs);
// indicator.get("/:id", getIndicatorById);
// indicator.get("/:id/user", getIndicatorWithUser);
// indicator.put("/:id", editIndicatorDB);
blog.post("/", createBlog);

export default blog;
