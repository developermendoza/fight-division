import Weight from "../models/Weight.js";
export const getWeights = async (req, res) => {
  try {
    const weights = await Weight.find();
    res.status(200).json(weights)
  } catch (error) {
    res.status(404).json(error)
  }
}