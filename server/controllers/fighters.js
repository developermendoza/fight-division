import Fighter from "../models/Fighter.js";

export const getFighters = async (req, res) => {
  try {
    const fighters = await Fighter.find();
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*')
    res.status(200).json(fighters)
  } catch (error) {
    res.status(404).json(error)
  }
}