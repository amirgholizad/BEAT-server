import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

async function signupController(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const signup = await knex("user").insert({
      email: email,
      password: password,
    });
    res.status(200).json("Success");
  } catch (err) {
    res.status(500).send(`Error signing up: ${err}`);
  }
}

export default signupController;
