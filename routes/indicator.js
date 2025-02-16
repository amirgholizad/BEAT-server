import express from "express";
import {
  getAllIndicators,
  getIndicatorById,
} from "../controllers/indicator-controller.js";

const indicator = express.Router();

indicator.get("/", getAllIndicators);
indicator.get("/:id", getIndicatorById);

export default indicator;
