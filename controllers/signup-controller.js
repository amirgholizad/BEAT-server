import { supabase } from "./supabase-controller.js";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";

import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

dotenv.config();
async function signupController(req, res) {
  const user_name = req.body.user_name;
  const email = req.body.email;
  const password = req.body.password;
  const decryptedPassword = CryptoJS.AES.decrypt(
    password,
    process.env.SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
  try {
    const signup = await knex("user").insert({
      user_name: user_name,
      email: email,
      password: password,
    });
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: decryptedPassword,
      options: {
        data: { user_name: user_name },
      },
    });
    res.status(200).json("Success");
  } catch (err) {
    res.status(500).send(`Error signing up: ${err}`);
  }
}

export default signupController;
