import User from "../models/User.js";
import isEmpty from "is-empty";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validateNewUser = async (user) => {

  user.email = user.email.trim()
  user.username = user.username.trim()
  user.password = user.password.trim()
  user.confirmPassword = user.confirmPassword.trim()

  const errors = {}

  if(isEmpty(user.email)){
    errors.email = "Please provide an email address";
  }

  if(isEmpty(user.username)){
    errors.username = "Please provide a username";
  }

  if(isEmpty(user.password)){
    errors.password = "Please provide a password";
  }

  if(isEmpty(user.confirmPassword)){
    errors.confirmPassword = "Please confirm your password";
  }

  if(!isEmpty(user.password) && user.password.length < 6){
    errors.password_length = "Password must be 6 characters or more"
  }

  if(!isEmpty(user.password) && !isEmpty(user.confirmPassword) && user.password !== user.confirmPassword){
    errors.passwords = "Passwords do not match.  Please enter your passwords again.";
  }

  const validatedEmail = validateEmail(user.email)
  if(!isEmpty(user.email) && !validatedEmail){
    errors.email = "Please provide a properly formatted email address";
  }

  const userEmailFound = await User.findOne({email: user.email});
  const usernameFound = await User.findOne({username: user.username});

  if(userEmailFound){
    errors.email = "This email is already registered.  Please use another email."
  }

  if(usernameFound){
    errors.username = "The username you are trying to use is already taken.  Please use another username."
  }

  if(!isEmpty(errors)){
    return {
      isValidated:false,
      errors
    }
  }else{
    return {
      isValidated: true
    }
  }
}

export const validateUser = async (user) => {
  user.email = user.email.trim()
  user.password = user.password.trim()

  const errors = {}

  if(isEmpty(user.email)){
    errors.email = "Please provide your email address";
  }

  if(isEmpty(user.password)){
    errors.password = "Please provide your password";
  }

  const validatedEmail = validateEmail(user.email)

  if(!isEmpty(user.email) && !validatedEmail){
    errors.email = "Please provide a properly formatted email address";
  }

  const existingUser = await User.findOne({email: user.email});

  if(validatedEmail && !existingUser){
    errors.email = "User email does not exist"
  }

  if(existingUser){
    const isPasswordCorrect = await bcrypt.compare(user.password, existingUser.password);
    if(!isEmpty(user.password) && !isPasswordCorrect){
      errors.password = "Password is incorrect";
    }
  }

  if(!isEmpty(errors)){
    return {
      isValidated: false,
      errors
    }
  }else{
    return {
      isValidated:true
    }
  }
}