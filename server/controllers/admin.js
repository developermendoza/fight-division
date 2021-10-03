

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
  console.log("getUsers")
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

export const getUser = async (req, res) => {
  const {id} = req.params;
  try {
    const user = await User.findById(id);
    // console.log("user: ", user)
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const addUser = async (req, res) => {
  console.log("addUser")
  const user = req.body;
  try {
    const hashedPassword = await bcrypt.hash(user.password, 12);

    var newUser = new User({
      email: user.email,
      username: user.username,
      password: hashedPassword
    })

    const result = await newUser.save();

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export const deleteUser = async (req, res) => {
  const {id} = req.params;
  try {
    const result = await User.findByIdAndDelete(id);

    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export const updateUser = async (req, res) => {

  console.log("updateUser");
  // console.log("req.body: ", req.body)
  // console.log("req.params: ", req.params)
  // const {id} = req.params;
  // const {username, email, password} = req.body;

  // const user = new User({
  //   username,
  //   email,
  //   password
  // })
  // try {
  //   user = await User.findById(id);
  //   res.status(200).send(user)
  // } catch (error) {
  //   res.status(500).json({message:"Something went wrong"})
  // }
}

// export const UserController = {
//   find: async (req, res) => {
    
//     const {id} = req.params;
//     let found = await User.find()
//   }
// }


export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("mainCardNetwork prelimNetwork earlyPrelimNetwork");
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*')
    res.status(200).json(events)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const getNetworks = async (req, res) => {
  console.log("getNetworks")
  try {
    const networks = await Network.find();
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*')
    res.status(200).json(networks)
  } catch (error) {
    res.status(404).json(error)
  }
}
