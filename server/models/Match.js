import mongoose from "mongoose";

const matchSchema = mongoose.Schema({
  fighter1:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Fighter"
  },
  fighter2: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Fighter"
  },
  weight: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Weight"
  },
  isChampionshipFight:{
    type: Boolean,
    default: false
  },
  isMainEvent:{
    type: Boolean,
    default: false
  },
  isCoMainEvent:{
    type: Boolean,
    default: false
  },
  isMainCardFight:{
    type: Boolean,
    default: false
  },
  isPrelimFight:{
    type: Boolean,
    default: false
  },
  isEarlyPrilimFight:{
    type: Boolean,
    default: false
  },
  matchOrder: Number,
  maxRounds:{
    type: Number,
    default: 3
  },
  event:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Event"
  },
  result:{
    type: Object,
    winner:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Fighter",
      default: null
    },
    loser:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Fighter",
      default: null
    },
    matchOutcomeMethod:{
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref:"MatchOutcomeMethods"
    },
    round:{
      type: String,
      default: null
    },
  },
  updatedAt:{
    type: Date,
    default: null
  },
  fighter1_odds:{
    type: String,
    default: "0"
  },
  fighter2_odds:{
    type: String,
    default: "0"
  },
  createdAt:{
    type: Date,
    default: new Date()
  }
});

const Match = mongoose.model("Match", matchSchema);
export default Match;