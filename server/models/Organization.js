import mongoose from "mongoose";

const organizationSchema = mongoose.Schema({
  name: String,
  sport:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sport"
  },
  createdAt:{
    type: Date,
    default : new Date()
  }
});

const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;