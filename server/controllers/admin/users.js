
import User from "../../models/User.js"
import bcrypt from "bcrypt";
export const getUsers = async (req, res) => {
  try {

    // res.header('Access-Control-Expose-Headers', 'Content-Range')
    // res.header('Content-Range','bytes : 0-9/*')

    // let sort = JSON.parse(req.query.sort);
    // let sortBy = sort[0];
    // let orderBy = sort[1] === "ASC" ? -1 : 1

    const users = await User.find();

    res.status(200).json(users)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const getUser = async (req, res) => {
  const {id } = req.params;

  try {
    res.header('Access-Control-Expose-Headers', 'Content-Range')
    res.header('Content-Range','bytes : 0-9/*')
    const user = await User.findById(id);
    res.status(200).json(user)
  } catch (error) {
    res.status(404).json(error)
  }
}

export const updateUser = async (req, res) => {

 
  try {
    const udpate = {
      email:req.body.email,
      username:req.body.username,
      password:req.body.password,
      matchOutcomePoints: parseInt(req.body.matchOutcomePoints),
      matchTotalPoints: parseInt(req.body.matchTotalPoints),
      rank: parseInt(req.body.rank),
      roundTotalPoints: parseInt(req.body.roundTotalPoints),
      totalPoints: parseInt(req.body.totalPoints),
      updatedAt: new Date(),
      image:req.body.image,
    }
  
      const result = await User.findByIdAndUpdate(req.body._id, udpate, {new: true});
      res.status(200).send(result)

    } catch (error) {
      res.status(500).json(error)
  }

}

export const deleteUser = async (req, res) => {
  const {id} = req.params;
  console.log("deleteUser id: ", id)
  try {
    const result = await User.findByIdAndDelete(id);
    console.log("result: ", result)
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}



export const addUser = async (req, res) => {
  const user = req.body;

  try {
    const hashedPassword = await bcrypt.hash(user.password, 12);

    var newUser = new User({
      email: user.email,
      username: user.username,
      password: hashedPassword,
      image: user.image
    })

    const result = await newUser.save();

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({message:"Something went wrong"})
  }
}
