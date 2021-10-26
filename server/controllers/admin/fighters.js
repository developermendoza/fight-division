
import Fighter from "../../models/Fighter.js";
import mongoose from "mongoose";
export const getFighters = async (req, res) => {
  try {
    const fighters = await Fighter.find().populate("weight organization");

    res.status(200).json(fighters)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const addFighter = async (req, res) => {
  try {
    let {
      firstname,
      lastname,
      nickname,
      wins,
      losses,
      draws,
      noContest,
      isChampion,
      rank,
      image,
      imageLeft,
      imageRight,
      organization,
      weight
    } = req.body

    const fighter = new Fighter({
      firstname,
      lastname,
      nickname,
      wins : parseInt(wins),
      losses : parseInt(losses),
      draws : parseInt(draws),
      noContest : noContest !== "" ? parseInt(noContest) : null,
      isChampion : isChampion === "yes" ? true : false,
      rank: rank !== "" ? parseInt(rank) : null,
      image,
      imageLeft,
      imageRight,
      organization: mongoose.Types.ObjectId(organization),
      weight: mongoose.Types.ObjectId(weight)
    })

    let result = await fighter.save();
    result = await result.populate("weight organization")
    res.status(200).json(result)

  } catch (error) {
    res.status(404).json(error)
  }
}

export const updateFighter = async (req, res) => {
  try {
    let {
      id,
      firstname,
      lastname,
      nickname,
      wins,
      losses,
      draws,
      noContest,
      isChampion,
      rank,
      image,
      imageLeft,
      imageRight,
      organization,
      weight
    } = req.body

    let update = {
      firstname,
      lastname,
      nickname,
      wins : parseInt(wins),
      losses : parseInt(losses),
      draws : parseInt(draws),
      noContest : noContest !== null ? parseInt(noContest) : null,
      isChampion : isChampion === "yes" ? true : false,
      rank: rank !== null  ? parseInt(rank) : null,
      image,
      imageLeft,
      imageRight,
      organization: mongoose.Types.ObjectId(organization),
      weight: mongoose.Types.ObjectId(weight)
    };
    let result = await Fighter.findByIdAndUpdate(id, update, {new: true})
    result = await result.populate("weight organization")

    res.status(200).json(result)

  } catch (error) {
    res.status(404).json(error)
  }
}