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