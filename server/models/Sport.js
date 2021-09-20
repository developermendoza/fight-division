import mongoose from "mongoose";

const sportSchema = mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const Sport = mongoose.model("Sport", sportSchema);
export default Sport;