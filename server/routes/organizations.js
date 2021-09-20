import express from "express";
import { getOrganizations } from "../controllers/organizations.js";

const router = express.Router();

router.get("/", getOrganizations);


export default router;