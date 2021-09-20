import express from "express";
import { getEvents, getUpcomingEvent, addEvent } from "../controllers/events.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/getUpcomingEvent", getUpcomingEvent);
router.post("/addEvent", addEvent);


export default router;