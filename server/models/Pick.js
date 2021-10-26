import mongoose from "mongoose";

const picksSchema = mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  event:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Event"
  },
  matches:[{
    match:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match"
    },
    fighter: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Fighter"
    },
    weight: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Weight"
    },
    round:{
      type: Number,
      default: null
    },
  }],
  updatedAt:{
    type: Date,
    default: null
  },
  createdAt:{
    type: Date,
    default: new Date()
  }
});

const Pick = mongoose.model("Pick", picksSchema);
export default Pick;