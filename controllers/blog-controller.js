import initKnex from "knex";
import configuration from "../knexfile.js";
import dotenv from "dotenv";
import { Links } from "react-router-dom";
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

export { createBlog };
