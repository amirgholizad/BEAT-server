import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

async function loginController(req, res) {
  const bodyEmail = req.body.email;
  const bodyPassword = req.body.password;
  console.log(bodyEmail, bodyPassword);
  try {
    const login = await knex("user").where({ email: bodyEmail }).select("*");
    const dbHash = CryptoJS.AES.decrypt(login[0].password, SECRET_KEY);
    const dbPW = dbHash.toString(CryptoJS.enc.Utf8);
    console.log(dbPW, bodyPassword);

    if (`${bodyPassword}` === `${dbPW}`) {
      const token = CryptoJS.SHA256(login[0].id).toString();
      res.status(200).json({ token: token });
    } else {
      res.send("Failed");
    }
  } catch (error) {
    console.error(error);
  }
}

export default loginController;
