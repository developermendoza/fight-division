import MatchOutcomeMethod from "../models/MatchOutcomeMethod.js";

export const getMatchOutcomeMethods = async (req, res) => {
  try {
    const matchOutcomeMethods = await MatchOutcomeMethod.find();
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*');
    console.log("matchOutcomeMethods: ", matchOutcomeMethods)
    res.status(200).json(matchOutcomeMethods)
  } catch (error) {
    res.status(404).json(error)
  }
}