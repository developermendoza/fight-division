import express from "express";
import { getUsers, addUser, deleteUser } from "../controllers/admin.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", addUser);
router.delete("/users/:id", deleteUser)

export default router;