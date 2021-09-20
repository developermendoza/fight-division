import express from "express";
import { getMatches, addMatch, getMatchesByEventId} from "../controllers/matches.js";

const router = express.Router();

router.get("/", getMatches);
router.get("/getMatchesByEventId/:id", getMatchesByEventId);
router.post("/addMatch", addMatch);


export default router;