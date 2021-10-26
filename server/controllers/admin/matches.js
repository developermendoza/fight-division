import Match from "../../models/Match.js";
import mongoose from "mongoose";

export const getMatches= async (req, res) => {
  try {

    const matches = await Match.find().populate("event fighter1 fighter2 weight");
    res.status(200).json(matches)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const deleteMatch = async (req, res) => {
  const {id} = req.params;

  try {
    const result = await Match.findByIdAndDelete(id);
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export const updateMatch = async (req, res) => {
  const{
    id,
    fighter1,
    fighter2,
    weight,
    event,
    maxRounds,
    matchOrder,
    isEarlyPrilimFight,
    isPrelimFight,
    isMainCardFight,
    isCoMainEvent,
    isMainEvent,
    isChampionshipFight} = req.param;
  try {

    const update = new Match({
      fighter1: mongoose.Types.ObjectId(fighter1),
      fighter2:mongoose.Types.ObjectId(fighter2),
      weight: mongoose.Types.ObjectId(weight),
      event:mongoose.Types.ObjectId(event),
      maxRounds:parseInt(maxRounds),
      matchOrder:parseInt(matchOrder),
      isEarlyPrilimFight:isEarlyPrilimFight === "yes" ? true : false,
      isPrelimFight: isPrelimFight === "yes" ? true : false,
      isMainCardFight: isMainCardFight  === "yes" ? true : false,
      isCoMainEvent: isCoMainEvent === "yes" ? true : false,
      isMainEvent: isMainEvent === "yes" ? true : false,
      isChampionshipFight: isChampionshipFight === "yes" ? true : false
    })

    let result = await Match.findByIdAndUpdate(id, update, {new: true})
    result = result.populate("fighter1 fighter2, weight, event")
    res.status(200).send(result)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const addMatch = async (req, res) => {


  let {
    fighter1,
    fighter2,
    weight,
    event,
    maxRounds,
    matchOrder,
    isEarlyPrilimFight,
    isPrelimFight,
    isMainCardFight,
    isCoMainEvent,
    isMainEvent,
    isChampionshipFight
  } = req.body


  try {

    const match = new Match({
      fighter1: mongoose.Types.ObjectId(fighter1),
      fighter2:mongoose.Types.ObjectId(fighter2),
      weight: mongoose.Types.ObjectId(weight),
      event:mongoose.Types.ObjectId(event),
      maxRounds:parseInt(maxRounds),
      matchOrder:parseInt(matchOrder),
      isEarlyPrilimFight:isEarlyPrilimFight === "yes" ? true : false,
      isPrelimFight: isPrelimFight === "yes" ? true : false,
      isMainCardFight: isMainCardFight  === "yes" ? true : false,
      isCoMainEvent: isCoMainEvent === "yes" ? true : false,
      isMainEvent: isMainEvent === "yes" ? true : false,
      isChampionshipFight: isChampionshipFight === "yes" ? true : false
    })

    let result = await match.save();
    result = await result.populate("fighter1 fighter2 weight event")
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}
