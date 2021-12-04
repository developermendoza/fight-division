import Event from "../models/Event.js";
import Match from "../models/Match.js";
import mongoose from "mongoose";
export const getEvents = async (req, res) => {
  try {

    const events = await Event.find().populate("mainCardNetwork prelimNetwork earlyPrelimNetwork organization")

    res.status(200).json(events)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    const events = await Event.find({date: {$gte:today}}).populate("mainCardNetwork prelimNetwork earlyPrelimNetwork organization").populate({path:"mainEvent", populate:{path:"fighter1"}}).populate({path:"mainEvent", populate:{path:"fighter2"}})

    res.status(200).json(events)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const getUpcomingMainEvents = async (req, res) => {
  const today = new Date();
  try {
    const matches = await Match.find({isMainEvent:true}).populate("fighter1 fighter2 event weight").populate({path: "event", match: {date: {$gte:today}}});

    res.status(200).json(matches)
  } catch (error) {
    res.status(404).json(error)
  }
}
export const getUpcomingEvent = async (req, res) => {
  
  try {
    const today = new Date()
    const data = await Event.findOne({mainCardTime: {$gte:today}}).populate("mainCardNetwork prelimNetwork earlyPrelimNetwork").populate({path:"organization", populate:{path:"sport"}}).sort({mainCardTime: 1})
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*')

    const event = {
      id: data.id,
      ...data._doc
    }

    res.status(200).json(event)
    } catch (error) {
      res.status(404).json(error)
    }
}

export const getMainEvent = async (req, res) => {

  try {
    const { id } = req.params
    const event = await Match.findOne().sort({mainCardTime: -1});
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*')
    res.status(200).json(event)
  } catch (error) {
    res.status(404).json(error)
  }
}