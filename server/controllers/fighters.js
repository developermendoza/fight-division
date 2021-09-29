import Fighter from "../models/Fighter.js";
import mongoose from "mongoose";

export const getFighters = async (req, res) => {
  try {
    const fighters = await Fighter.find();
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*')
    res.status(200).json(fighters)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const addFighter = async (req, res) => {

    try {
      const { 
        firstname, 
        lastname, 
        nickname, 
        wins, 
        losses, 
        draws, 
        noContest, 
        dq, 
        weight, 
        isChampion, 
        rank, 
        organization, 
        odds, 
        image } = req.body;

        const newFighter = new Fighter({
          firstname,
          lastname,
          nickname,
          wins, 
          losses, 
          draws, 
          noContest,
          dq,
          rank,
          weight : mongoose.Types.ObjectId(weight),
          isChampion : isChampion && true,
          organization: mongoose.Types.ObjectId(organization),
          odds,
          image: firstname + ".png"
        });

        const data = await newFighter.save()

        res.status(200).json(data)
    } catch (error) {
      res.status(404).json(error)
    }

}