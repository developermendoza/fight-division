import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { validateNewUser, validateUser } from "../validations/validation.js";


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

export const loginUser = async (req, res) => {
  const user = req.body;
  try {
    const { isValidated, errors } = await validateUser(user);
    if(!isValidated){
      return res.status(400).json(errors)
    }else{
      const existingUser = await User.findOne({email: user.email});
      const token = jwt.sign({email: existingUser.email, id:existingUser._id}, process.env.SECRETORKEY, {expiresIn:"1h"});
      return res.status(200).json({result:existingUser, token})
    }
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export const registerUser = async (req, res) => {

  try {
    const user = req.body;
    const {isValidated, errors} = await validateNewUser(user)
    if(!isValidated){
      return res.status(400).json(errors)
    }
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const result = await User.create({ email:user.email, password: hashedPassword, username: user.username, image:user.image});

    console.log("result: ", result)
    const token = jwt.sign({email: result.email, id: result._id}, process.env.SECRETORKEY, {expiresIn:"1h"});
    res.status(200).json({result, token})
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export const topten = async (req, res) => {
  try {
    const topTen = await User.find().sort({totalPoints: -1}).limit(10);
    res.status(200).json(topTen)
  } catch (error) {
    res.status(404).json(error)
  }
}


