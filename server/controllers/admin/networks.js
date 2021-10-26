import Network from "../../models/Network.js";
export const getNetworks = async (req, res) => {
  try {
 
    const networks = await Network.find();
    res.status(200).json(networks)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const getNetwork = async (req, res) => {

  const {id } = req.params;
  try {
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*')
    const network = await Network.findById(id);
    res.status(200).json(network)
  } catch (error) {
    res.status(404).json(error)
  }
}
