import express from "express";
import { getNetworks } from "../controllers/networks.js";

const router = express.Router();

router.get("/", getNetworks);


export default router;