import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  name: String,
  location: {
    type: String,
    default: null
  },
  venue: {
    type: String,
    default: null
  },
  date: {
    type: Date,
    default: null
  },
  mainCardTime: {
    type: Date,
    default: null
  },
  prelimTime: {
    type: Date,
    default: null
  },
  earlyPrelimTime:{
    type: Date,
    default: null
  },
  mainCardNetwork:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Network"
  },
  prelimNetwork:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Network"
  },
  earlyPrelimNetwork:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Network"
  },
  organization:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization"
  },
  createdAt:{
    type: Date,
    default: new Date()
  },
  updatedAt:{
    type: Date,
    default: null
  }
});

const Event = mongoose.model("Event", eventSchema);
export default Event;