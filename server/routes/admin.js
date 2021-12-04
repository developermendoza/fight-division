import express from "express";

import { getUsers, addUser, deleteUser, getUser, updateUser } from "../controllers/admin/users.js";
import { adminUser } from "../controllers/admin/login.js";
import { getNetworks, getNetwork} from "../controllers/admin/networks.js";
import { getEvents, addEvent, deleteEvent, updateEvent } from "../controllers/admin/events.js";
import { getMatches, deleteMatch, addMatch, updateMatch } from "../controllers/admin/matches.js";
import { getFighters, addFighter, updateFighter } from "../controllers/admin/fighters.js";
import { getOrganizations } from "../controllers/admin/organizations.js";
import { getWeights } from "../controllers/admin/weights.js";
import { addPicks } from "../controllers/admin/picks.js";

const router = express.Router();

router.get("/users", getUsers);  // getList - works fine
router.get("/users/:id", getUser); // getOne
router.patch("/users/", updateUser) //update - not working properly
router.post("/users", addUser); // create - works but jumps to update after adding new user
router.delete("/users/:id", deleteUser) //delete - works fine

router.get("/events", getEvents); // getList - works fine
router.post("/events", addEvent);
router.delete("/events/:id", deleteEvent);
router.patch("/events/", updateEvent) 

router.get("/networks", getNetworks); // getList - works fine
router.get("/networks/:id", getNetwork); 

router.get("/matches", getMatches); 
router.delete("/matches/:id", deleteMatch); 
router.post("/matches", addMatch); 
router.patch("/matches", updateMatch); 

router.get("/fighters", getFighters); 
router.post("/fighters", addFighter); 
router.patch("/fighters", updateFighter); 

router.get("/organizations", getOrganizations); 

router.get("/weights", getWeights);

router.post("/picks", addPicks);

router.post("/", adminUser);


export default router;