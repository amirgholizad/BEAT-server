import initKnex from "knex";
import configuration from "../knexfile.js";
import dotenv from "dotenv";
const knex = initKnex(configuration);

dotenv.config();

async function createBlog(req, res) {
  try {
    const foundUser = await knex("user")
      .where({ user_name: req.body.user })
      .select("id");

    const blog = {
      user_id: foundUser[0].id,
      title: req.body.title,
      links: req.body.links,
      files: req.body.files,
      content: req.body.content,
    };
    await knex("blog").insert(blog);
    res.status(200).json("Success");
  } catch (error) {
    console.error(error);
  }
}

async function getAllBlogs(req, res) {
  try {
    const blog = await knex("blog")
      .join("user", "blog.user_id", "user.id")
      .select("blog.*", "user.user_name");
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
  }
}

async function getBlogById(req, res) {
  const { id } = req.params;
  try {
    const blog = await knex("blog")
      .join("user", "blog.user_id", "user.id")
      .where("blog.id", id)
      .select("blog.*", "user.user_name");
    res.status(200).json(blog);
  } catch (error) {
    console.error(error);
  }
}

export { createBlog, getAllBlogs, getBlogById };
