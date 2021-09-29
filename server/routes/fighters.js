import express from "express";
import { getFighters, addFighter} from "../controllers/fighters.js";

const router = express.Router();

router.get("/", getFighters);
router.post("/addFighter", addFighter);


export default router;