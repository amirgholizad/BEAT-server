import express from "express";
import {
  getAllIndicators,
  getIndicatorById,
  getIndicatorWithUser,
  editIndicatorDB,
  createIndicatorDB,
} from "../controllers/indicator-controller.js";

const indicator = express.Router();

indicator.get("/", getAllIndicators);
indicator.get("/:id", getIndicatorById);
indicator.get("/:id/user", getIndicatorWithUser);
indicator.put("/:id", editIndicatorDB);
indicator.post("/", createIndicatorDB);

export default indicator;
