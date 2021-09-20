import mongoose from "mongoose";

const fighterSchema = mongoose.Schema({
  firstname: String,
  lastname: String,
  nickname: {
    type: String,
    default: null
  },
  wins: Number,
  losses: Number,
  draws: {
    type: Number,
    default: 0
  },
  noContest:{
    type: Number,
    default: null
  },
  dq:{
    type: Number,
    default: null
  },
  weight:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Weight"
  },
  isChampion:{
    type: Boolean,
    default: false
  },
  rank:{
    type: Number,
    default: null
  },
  organization:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization"
  },
  createdAt:{
    type: Date,
    default: new Date()
  },
  odds:{
    type: String,
    default: null
  },
  image:{
    type: String,
    default: null
  },
  updatedAt:{
    type: Date,
    default: null
  }
});

const Fighter = mongoose.model("Fighter", fighterSchema);
export default Fighter;