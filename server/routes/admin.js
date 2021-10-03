import express from "express";
import { getUsers, addUser, deleteUser, getUser, updateUser, getEvents, getNetworks } from "../controllers/admin.js";
// import  UserControls  from "../controllers/admin.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUser);
router.post("/users", addUser);
router.patch("/users/:id", updateUser)
router.delete("/users/:id", deleteUser)

router.get("/events", getEvents);

router.get("/networks", getNetworks);

// let UserController = {
//   find: async (req,res) => {

//   }
// }
// router.get("/users", UserControls.all)
// router.post("/users/create", UserControls.create)
// router.get("/users/:id", UserControls.find)

export default router;