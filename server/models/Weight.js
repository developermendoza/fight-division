import mongoose from "mongoose";

const weightSchema = mongoose.Schema({
  name: String,
  number: Number,
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"Organization"
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

const Weight = mongoose.model("Weight", weightSchema);
export default Weight;