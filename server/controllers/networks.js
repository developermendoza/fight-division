import Network from "../models/Network.js";
export const getNetworks = async (req, res) => {
  try {

    const networks = await Network.find();
    res.status(200).json(networks)
  } catch (error) {
    res.status(404).json(error)
  }
}