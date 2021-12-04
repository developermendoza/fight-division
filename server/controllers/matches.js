import Fighter from "../models/Fighter.js";
import Match from "../models/Match.js";
import mongoose from "mongoose";

export const getMatches = async (req, res) => {
  try {
    const matches = await Match.find();
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*')
    res.status(200).json(matches)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const getUpcomingMainEventMatches = async (req, res) => {
  const today = new Date();
  try {
    // const matches = await Match.find({isMainEvent:true}).populate("fighter1 fighter2 event weight");
    const matches = await Match.find({isMainEvent:true}).populate("fighter1 fighter2 event weight").populate({path: "event", match: {date: {$gte:today}}});

    console.log("matches ", matches.length)
    res.status(200).json(matches)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const getMatchesByEventId = async (req, res) => {
  try {
    const { id } = req.params;
    const matches = await Match.find({event: id}).populate("fighter1 fighter2 event weight").sort({matchOrder: 1});
    res.status(200).json(matches)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const getMainEventMatch = async (req, res) => {

  try {
    const {id} = req.params
    const mainEventMatch = await Match.findOne({event: id, isMainEvent:true}).populate("fighter1 fighter2 event weight");

    res.status(200).json(mainEventMatch)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const addMatch = async (req, res) => {
  try {
    let { 
      fighter1,
      fighter2,
      weight,
      isChampionshipFight,
      isMainEvent,
      isCoMainEvent,
      isMainCardFight,
      isPrelimFight,
      isEarlyPrilimFight,
      matchOrder,
      maxRounds,
      event
    } = req.body;

    fighter1 = mongoose.Types.ObjectId(fighter1)
    fighter2 = mongoose.Types.ObjectId(fighter2)
    weight = mongoose.Types.ObjectId(weight)
    event = mongoose.Types.ObjectId(event)

    if(isChampionshipFight !== null || isChampionshipFight === ""){
      if(isChampionshipFight === "true"){
        isChampionshipFight=true
      }else{
        isChampionshipFight=false
      }
    }

    if(isMainEvent !== null || isMainEvent === ""){
      if(isMainEvent === "true"){
        isMainEvent=true
      }else{
        isMainEvent=false
      }
    }

    if(isCoMainEvent !== null || isCoMainEvent === ""){
      if(isCoMainEvent === "true"){
        isCoMainEvent=true
      }else{
        isCoMainEvent=false
      }
    }

    if(isMainCardFight !== null || isMainCardFight === ""){
      if(isMainCardFight === "true"){
        isMainCardFight=true
      }else{
        isMainCardFight=false
      }
    }

    if(isPrelimFight !== null || isPrelimFight === ""){
      if(isPrelimFight === "true"){
        isPrelimFight=true
      }else{
        isPrelimFight=false
      }
    }

    if(isEarlyPrilimFight !== null || isEarlyPrilimFight === ""){
      if(isEarlyPrilimFight === "true"){
        isEarlyPrilimFight=true
      }else{
        isEarlyPrilimFight=false
      }
    }

    const match = new Match({
      fighter1, 
      fighter2, 
      weight, 
      isChampionshipFight, 
      isMainEvent, 
      isCoMainEvent, 
      isMainCardFight, 
      isPrelimFight, 
      isEarlyPrilimFight, 
      matchOrder, 
      maxRounds,
      event,
    });


    const data = await match.save()

    res.status(200).json(data)
  } catch (error) {
    console.log("error: ", error)
    res.status(404).json(error)
  }
}