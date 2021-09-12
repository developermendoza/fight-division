import User from "../models/User.js";
import isEmpty from "is-empty";

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validateNewUser = async (user) => {
  user.email = user.email.trim()
  user.username = user.username.trim()
  user.password = user.password.trim()
  user.password2 = user.password2.trim()

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

  if(isEmpty(user.password2)){
    errors.password2 = "Please confirm your password";
  }

  if(!isEmpty(user.password) && user.password.length < 6){
    errors.password_length = "Password must be 6 characters or more"
  }

  if(!isEmpty(user.password) && !isEmpty(user.password2) && user.password !== user.password2){
    errors.passwords = "Passwords do not match.  Please enter your passwords again.";
  }

  const validatedEmail = validateEmail(user.email)
  if(!isEmpty(user.email) && !validatedEmail){
    errors.invalid_email = "Please provide a properly formatted email address";
  }

  const userFound = await User.findOne({email: user.email});

  if(userFound){
    errors.userFound = "This email is already registered.  Please use another email."
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

export const validateUser = (user) => {
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
    errors.invalid_email = "Please provide a properly formatted email address";
  }

  if(!isEmpty(errors)){
    return {
      isValidated: false,
      errors
    }
  }else{
    return {
      isValidated: true
    }
  }
}