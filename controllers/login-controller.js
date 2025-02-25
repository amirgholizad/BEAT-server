import CryptoJS from "crypto-js";
import { supabase } from "./supabase-controller.js";
import dotenv from "dotenv";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

async function loginController(req, res) {
  const user_name = req.body.user_name;
  const bodyEmail = req.body.email;
  const bodyPassword = CryptoJS.AES.decrypt(
    req.body.password,
    SECRET_KEY
  ).toString(CryptoJS.enc.Utf8);
  try {
    const login = await knex("user").where({ email: bodyEmail }).select("*");
    const dbPW = CryptoJS.AES.decrypt(login[0].password, SECRET_KEY).toString(
      CryptoJS.enc.Utf8
    );
    console.log(`${bodyPassword}` === `${dbPW}`);

    if (`${bodyPassword}` === `${dbPW}`) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: bodyEmail,
        password: bodyPassword,
      });
      console.log(data);
      if (error) {
        res.status(401).send("Password or Email is incorrect");
      } else {
        res.send(data);
      }
    } else {
      res.status(401).send("Password or Email is incorrect");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

export default loginController;
