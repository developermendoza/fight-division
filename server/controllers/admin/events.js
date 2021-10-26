
import Event from "../../models/Event.js";
import Match from "../../models/Match.js";
import mongoose from "mongoose";
export const getEvents = async (req, res) => {
  try {

    const events = await Event.find().populate("mainCardNetwork prelimNetwork earlyPrelimNetwork organization");

    res.status(200).json(events)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const addEvent = async (req, res) => {

  try {
    let {name, location, venue, date, mainCardTime, prelimTime, earlyPrelimTime, mainCardNetwork, prelimNetwork, earlyPrelimNetwork, organization} = req.body;

    mainCardNetwork = mainCardNetwork  ? mongoose.Types.ObjectId(mainCardNetwork) : null;
    prelimNetwork = prelimNetwork ? mongoose.Types.ObjectId(prelimNetwork) : null;
    earlyPrelimNetwork = earlyPrelimNetwork ? mongoose.Types.ObjectId(earlyPrelimNetwork) : null;
    organization = organization ? mongoose.Types.ObjectId(organization) : null;
    date = date ? new Date(date) : null,
    mainCardTime = mainCardTime ? new Date(mainCardTime) : null;
    prelimTime = prelimTime ? new Date(prelimTime) : null;
    earlyPrelimTime = earlyPrelimTime ? new Date(earlyPrelimTime) : null;

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
    let data = await event.save();

    data = await data.populate("mainCardNetwork prelimNetwork earlyPrelimNetwork organization")

    console.log("data: ", data)

    res.status(200).json(data)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const deleteEvent = async (req, res) => {
  const {id} = req.params;
  try {
    const result = await Event.findByIdAndDelete(id);
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

export const updateEvent = async (req, res) => {
  // const event = req.params;
  console.log("req.body: ", req.body)
  let {
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
  } = req.body

  try {
    let update = {
      name,
      location,
      venue,
      date:date ? new Date(date) : null,
      mainCardTime: mainCardTime ? new Date(mainCardTime) : null,
      prelimTime: prelimTime ? new Date(prelimTime) : null,
      earlyPrelimTime: earlyPrelimTime !== null ? new Date (earlyPrelimTime) : null ,
      mainCardNetwork: mainCardNetwork?._id ? mongoose.Types.ObjectId(mainCardNetwork._id) : mongoose.Types.ObjectId(mainCardNetwork),
      prelimNetwork: prelimNetwork?._id ? mongoose.Types.ObjectId(prelimNetwork._id) : mongoose.Types.ObjectId(prelimNetwork),
      earlyPrelimNetwork: earlyPrelimNetwork?._id ? mongoose.Types.ObjectId(earlyPrelimNetwork._id) : mongoose.Types.ObjectId(earlyPrelimNetwork),
      organization: organization?._id ? mongoose.Types.ObjectId(organization._id) : mongoose.Types.ObjectId(organization),
      updatedAt: new Date()
    }

    let result = await Event.findByIdAndUpdate(req.body._id, update, {new: true});
    result = await result.populate("mainCardNetwork prelimNetwork earlyPrelimNetwork organization")

    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}

