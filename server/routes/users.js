import express from "express";
import { getUsers, registerUser, loginUser } from "../controllers/users.js";

const router = express.Router();

router.get("/list", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser)

export default router;