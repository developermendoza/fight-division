import express from "express";
import { registerUser, loginUser, topten, getUsers } from "../controllers/users.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser)
router.get("/getUsers", getUsers)
router.get("/topten", topten)


export default router;