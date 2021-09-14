

import User from "../models/User.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*')
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const addUser = async (req, res) => {
  const user = req.body;
  try {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const result = await User.create({ email:user.email, password: hashedPassword, username: user.username});
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export const deleteUser = async (req, res) => {
  const {id} = req.params;
  try {
    const result = await User.findByIdAndDelete(id);
    console.log("result: ", result)

    res.status(200).json({data:result})
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}