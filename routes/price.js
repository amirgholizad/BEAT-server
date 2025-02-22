import express from "express";
import { getHistory } from "../controllers/price-controller.js";

const price = express.Router();

price.get("/", getHistory);

export default price;
