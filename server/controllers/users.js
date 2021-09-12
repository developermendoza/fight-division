import User from "../models/User.js";

import bcrypt from "bcrypt";
import pjwt from "passport-jwt";
import jwt from "jsonwebtoken";
import passport from "passport";

import { validateNewUser } from "../validations/validation.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const registerUser = async (req, res) => {
  const user = req.body;
  const { errors, isValidated } = await validateNewUser(user);

  if(!isValidated){
    res.status(403).json(errors)
  }else{
    bcrypt.genSalt(10, (err, salt)=>{
      bcrypt.hash(user.password, salt, (err, hash)=>{
        const newUser = new User({
          email: user.email,
          username: user.username,
          password: hash
        });
        newUser.save()
          .then(data => {
            const payload = {
              id:data.id,
              username: data.username
            }

            jwt.sign(payload, process.env.SECRETORKEY, {
              expiresIn:31556926
            }, (err, token)=>{
              res.json({success:true, token: "Bearer " + token, data})
            })
            res.status(201)
          })
          .catch(error => {
            res.status(409)
            res.json(error)
        })
      })
    })
  }
}