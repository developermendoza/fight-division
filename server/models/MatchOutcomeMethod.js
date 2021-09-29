import mongoose from "mongoose";

const matchOutcomeMethodSchema = mongoose.Schema({
  name: String,
});

const MatchOutcomeMethod = mongoose.model("MatchOutcomeMethod", matchOutcomeMethodSchema);
export default MatchOutcomeMethod;