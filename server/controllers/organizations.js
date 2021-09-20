import Organization from "../models/Organization.js";
export const getOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.status(200).json(organizations)
  } catch (error) {
    res.status(404).json(error)
  }
}