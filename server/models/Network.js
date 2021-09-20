import mongoose from "mongoose";

const networkSchema = mongoose.Schema({
  name: String,
});

const Network = mongoose.model("Network", networkSchema);
export default Network;