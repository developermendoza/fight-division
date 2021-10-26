import express from "express";
import { getEvents, getUpcomingEvent } from "../controllers/events.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/getUpcomingEvent", getUpcomingEvent);


export default router;