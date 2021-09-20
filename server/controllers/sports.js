import Sport from "../models/Sport.js";
export const getSports = async (req, res) => {
  try {
    const sports = await Sport.find();
    res.status(200).json(sports)
  } catch (error) {
    res.status(404).json(error)
  }
}