import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: String,
  username:String,
  password: String,
  rank: {
    type: Number,
    default: 0
  },
  matchOutcomePoints: {
    type: Number,
    default: 0
  },
  roundTotalPoints: {
    type: Number,
    default: 0
  },
  matchTotalPoints: {
    type: Number,
    default: 0
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  updatedAt: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const User = mongoose.model("User", userSchema);
export default User;