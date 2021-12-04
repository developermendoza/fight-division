import express from "express";
import { getMatches, addMatch, getMatchesByEventId, getUpcomingMainEventMatches} from "../controllers/matches.js";

const router = express.Router();

router.get("/", getMatches);
router.get("/upcomingMainEventMatches", getUpcomingMainEventMatches);
router.get("/getMatchesByEventId/:id", getMatchesByEventId);
router.post("/addMatch", addMatch);


export default router;