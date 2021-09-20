import express from "express";
import { getUsers, addUser, deleteUser, getUser, updateUser } from "../controllers/admin.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", addUser);
router.put("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)


export default router;