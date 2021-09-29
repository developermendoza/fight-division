import Event from "../models/Event.js";
import Match from "../models/Match.js";
import mongoose from "mongoose";
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*')
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

    console.log("event: ", event)

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

export const addEvent = async (req, res) => {
  

  try {
    let {name, location, venue, date, mainCardTime, prelimTime, earlyPrelimTime, mainCardNetwork, prelimNetwork, earlyPrelimNetwork, organization} = req.body;
  mainCardNetwork = mainCardNetwork !== "" ? mongoose.Types.ObjectId(mainCardNetwork) : null;
  prelimNetwork = prelimNetwork !== "" ? mongoose.Types.ObjectId(prelimNetwork) : null;
  earlyPrelimNetwork = earlyPrelimNetwork !== "" ? mongoose.Types.ObjectId(earlyPrelimNetwork) : null;
  organization = mongoose.Types.ObjectId(organization);
  date = new Date(date)
  mainCardTime = mainCardTime !== "" ? new Date(mainCardTime) : null;
  prelimTime = prelimTime !== "" ? new Date(prelimTime) : null;
  earlyPrelimTime = earlyPrelimTime !== "" ? new Date(earlyPrelimTime) : null;

  const event = new Event({
    name,
    location,
    venue,
    date,
    mainCardTime,
    prelimTime,
    earlyPrelimTime,
    mainCardNetwork,
    prelimNetwork,
    earlyPrelimNetwork,
    organization,
    createdAt: new Date(),
    updatedAt: null
  });

  console.log("event: ", event)

  const data = await event.save()

  console.log("data: ", data)

    res.status(200).json(data)
  } catch (error) {
    res.status(404).json(error)
  }
}