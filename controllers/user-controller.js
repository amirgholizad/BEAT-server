import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

async function getUserController(_req, res) {
  try {
    const userData = await knex("user").select("*");
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
  }
}

export default getUserController;
