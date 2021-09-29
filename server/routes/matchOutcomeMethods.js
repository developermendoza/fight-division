import express from "express";
import { getMatchOutcomeMethods } from "../controllers/matchOutcomeMethods.js";

const router = express.Router();

router.get("/", getMatchOutcomeMethods);


export default router;