import express from "express";
import { getWeights } from "../controllers/weights.js";

const router = express.Router();

router.get("/", getWeights);


export default router;