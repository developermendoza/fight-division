

import User from "../models/User.js";
import bcrypt from "bcrypt";
import isEmpty from "is-empty";

export const getUsers = async (req, res) => {
  console.log("getUsers")
  try {
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*')
    const users = await User.find();
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const getUser = async (req, res) => {
  console.log("getUser")
  const {id} = req.params;
  try {
    const user = await User.findById(id);
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

    // console.log("result._doc: ", result._doc)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export const deleteUser = async (req, res) => {
  console.log("deleteUser")
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
  console.log("req.body: ", req.body)
  console.log("req.params: ", req.params)
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