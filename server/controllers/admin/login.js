import jwt from "jsonwebtoken";

export const adminUser = async (req, res) => {
  const user = req.body;

  let isValidated = false;

  if( user.email === process.env.adminEmail &&  user.password === process.env.adminPassword){
    isValidated = true
  }

  try {
    if(!isValidated){
      return res.status(400).json({error: "the credentials are not valid"})
    }else{
      const token = jwt.sign({email: user.email, isValidated}, process.env.ADMINSECRETORKEY, {expiresIn:"1h"});
      return res.status(200).json({isValidated, token})
    }
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}
