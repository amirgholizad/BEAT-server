import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
} from "../controllers/blog-controller.js";

const blog = express.Router();

blog.get("/", getAllBlogs);
blog.get("/:id", getBlogById);
blog.post("/", createBlog);

export default blog;
