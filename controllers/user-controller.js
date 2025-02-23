import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
async function getUserController(_req, res) {
  try {
    const userData = await knex("user").select("*");
    res.status(200).json(userData);
  } catch (error) {
    console.error(error);
  }
}

async function userAuthController(req, res) {
  const token = req.headers.authorization.split(" ")[1];
  let decryptedToken = CryptoJS.AES.decrypt(token, process.env.SECRET_KEY);
  decryptedToken = decryptedToken.toString(CryptoJS.enc.Utf8);
  try {
    const user = await knex("user").where({ id: decryptedToken }).select("*");
    if (user.length > 0) {
      res.status(200).json("Authorized");
    } else {
      res.status(401).json("Unauthorized");
    }
  } catch (error) {
    console.error(error);
  }
}

async function getUserById(req, res) {
  try {
    const user = await knex("user").where({ id: req.params.id }).select("*");
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
  }
}

export { getUserController, userAuthController, getUserById };
