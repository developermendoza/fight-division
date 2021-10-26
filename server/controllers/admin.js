

import User from "../models/User.js";
import Event from "../models/Event.js";
import Network from "../models/Network.js";
import bcrypt from "bcrypt";
import isEmpty from "is-empty";
import { useForkRef } from "../../client/node_modules/@material-ui/core/index.js";

//  const UserControls = {
//   find: async (req, res) => {
//     console.log("req.body.id: ", req.body.id)
//     const found = await User.find({id})
//     console.log("found: ", found)
//     res.json(found);
//   },
//   all: async (req, res) => {
//     const allUsers = await User.find()
//     // console.log("allUsers", allUsers)
//     res.json(allUsers)
//   },
//   create: async(req, res) => {
//     const newUser = new User(req.body)
//     const savedUser = await newUser.save();
//     res.json(savedUser)
//   }
// }

// export default UserControls;
export const getUsers = async (req, res) => {

  let sort = JSON.parse(req.query.sort);
  let sortBy = sort[0];
  let orderBy = sort[1] === "ASC" ? -1 : 1

  try {
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*')

    const users = await User.find().sort({[sortBy]: orderBy});

    res.status(200).json(users)
  } catch (error) {
    res.status(404).json(error)
  }
}



export const getManyUsers = async (req, res) => {
  // const {id } = req.params;
  console.log("getManyUsers")
  // console.log("req", req.params)
  // try {
  //   const user = await User.findById(id);
  //   // console.log("user: ", user)
  //   res.status(200).json(user)
  // } catch (error) {
  //   res.status(404).json(error)
  // }
}





// export const getEvents = async (req, res) => {
//   try {
//     const events = await Event.find().populate("mainCardNetwork prelimNetwork earlyPrelimNetwork");
//     res.header('Access-Control-Expose-Headers', 'Content-Range')
//     res.header('Content-Range','bytes : 0-9/*')
//     res.status(200).json(events)
//   } catch (error) {
//     res.status(404).json(error)
//   }
// }

// export const getNetworks = async (req, res) => {
//   console.log("getNetworks")
//   try {
//     const networks = await Network.find();
//     res.header('Access-Control-Expose-Headers', 'Content-Range')
//     res.header('Content-Range','bytes : 0-9/*')
//     res.status(200).json(networks)
//   } catch (error) {
//     res.status(404).json(error)
//   }
// }
