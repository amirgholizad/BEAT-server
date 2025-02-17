import initKnex from "knex";
import configuration from "../knexfile.js";
import dotenv from "dotenv";
const knex = initKnex(configuration);

dotenv.config();

async function getAllIndicators(_req, res) {
  try {
    const indicators = await knex("indicator").select("*");
    res.status(200).json(indicators);
  } catch (error) {
    console.error(error);
  }
}

async function getIndicatorById(req, res) {
  try {
    const indicator = await knex("indicator")
      .where({ id: req.params.id })
      .select("*");
    res.status(200).json(indicator);
  } catch (error) {
    console.error(error);
  }
}

export { getAllIndicators, getIndicatorById };
