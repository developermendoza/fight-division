import express from "express";
import { getFighters} from "../controllers/fighters.js";

const router = express.Router();

router.get("/", getFighters);


export default router;