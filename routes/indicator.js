import express from "express";
import {
  getAllIndicators,
  getIndicatorById,
  getIndicatorWithUser,
} from "../controllers/indicator-controller.js";

const indicator = express.Router();

indicator.get("/", getAllIndicators);
indicator.get("/:id", getIndicatorById);
indicator.get("/:id/user", getIndicatorWithUser);

export default indicator;
