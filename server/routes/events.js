import express from "express";
import { getEvents, getUpcomingEvent, getUpcomingEvents, getUpcomingMainEvents } from "../controllers/events.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/upcomingEvents", getUpcomingEvents);
router.get("/getUpcomingEvent", getUpcomingEvent);
router.get("/upcomingMainEvents", getUpcomingMainEvents);


export default router;