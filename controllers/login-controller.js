import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

async function loginController(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const login = await knex("user").where("email", email);
    const bytes = CryptoJS.AES.decrypt(login.password, SECRET_KEY);

    if (bytes.toString(CryptoJS.enc.Utf8) === login.password) {
      res.send("Success");
    } else {
      res.send("Failed");
    }
  } catch (error) {
    console.error(error);
  }
}

export default loginController;
