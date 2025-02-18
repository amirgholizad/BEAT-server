import initKnex from "knex";
import configuration from "../knexfile.js";
import dotenv from "dotenv";
const knex = initKnex(configuration);
import { useState, useEffect } from "react";

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

async function getIndicatorWithUser(req, res) {
  try {
    const indicator = await knex("indicator")
      .join("user", "indicator.user_id", "user.id")
      .select("indicator.*", "user.user_name")
      .where("indicator.id", req.params.id);
    res.status(200).json(indicator);
  } catch (error) {
    console.error(error);
  }
}

async function editIndicatorDB(req, res) {
  const id = req.params.id;
  const indicator = {
    user_id: req.body.user_id,
    name: req.body.name,
    description: req.body.description,
    type: req.body.type,
    language: req.body.language,
    license: req.body.license,
    code: req.body.code,
    rating: req.body.rating,
    rating_count: req.body.rating_count,
  };
  try {
    await knex("indicator").where({ id: id }).update(indicator);
    res.status(200).json("Success");
  } catch (error) {
    console.error(error);
  }
}

async function createIndicatorDB(req, res) {
  try {
    const foundUser = await knex("user")
      .where({ user_name: req.body.user })
      .select("id");
    const indicator = {
      user_id: foundUser[0].id,
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      language: req.body.language,
      license: req.body.license,
      code: req.body.code,
      rating: "0",
      rating_count: "0",
    };
    await knex("indicator").insert(indicator);
    res.status(200).json("Success");
  } catch (error) {
    console.error(error);
  }
}

export {
  getAllIndicators,
  getIndicatorById,
  getIndicatorWithUser,
  editIndicatorDB,
  createIndicatorDB,
};
