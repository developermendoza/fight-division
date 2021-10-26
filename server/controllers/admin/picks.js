import Match from "../../models/Match.js";
import Pick from "../../models/Pick.js";
import mongoose from "mongoose";

export const addPicks= async (req, res) => {

  let {matches} = req.body
  let picks = []
  let picksMatch = [];
  console.log("req.body: ", req.body)
  // console.log("matches[0].matchId: ", matches[0].matchId)
  // console.log("matches[1].matchId: ", matches[1].matchId)
  try {
    // console.log("matches: ", matches)
    const picksFound = await Pick.findOne({user: req.body.user, event:req.body.event});
    // console.log("picksFound: ", picksFound)

    let test = []
    for(let i=0; i<picksFound.matches.length; i++){
     if(picksFound.matches[i].match.toString() === req.body.matches[i].matchId){
      test.push(picksFound.matches[i])
     }
    }
   
    // test.push("userpicksfound:", userpicksfound)
    console.log("test:", test)

    // const matchesPicked1 = picksFound.matches.length > matches.length? picksFound.matches.length : matches.length;

    // const matchesPicked2 = picksFound.matches.length < matches.length? picksFound.matches.length : matches.length;

    // for(let i=0; i<matchesPicked1.length; i++){
    //   if(matchesPicked1[i].match){

    //   }
    // }


    // check if the user has submitted for this event and also if the match has already been picked
    // if(picksFound && picksFound.matches.length > 0){
    //   if(picksFound.matches.length >= matches.length){
    //     for(let i=0; i < picksFound.matches.length; i++){
    //       if(picksFound.matches[i].match.toString() === matches[i].matchId){
       
    //           picksMatch.push(picksFound.matches[i])
    //         }
    //     }
    //   }
    // }

    // console.log("picksMatch: ", picksMatch);

    for(let i=0; i<matches.length; i++){
      picks.push({
        match: matches[i].matchId ? mongoose.Types.ObjectId(matches[i].matchId) : null,
        fighter: matches[i].fighterId ? mongoose.Types.ObjectId(matches[i].fighterId) : null,
        outcome: matches[i].outcomeId ? mongoose.Types.ObjectId(matches[i].outcomeId) : null,
        round: matches[i].round ? parseInt(matches[i].round) : null
      })
    }
    let userPicks = new Pick({
      user: mongoose.Types.ObjectId(req.body.user),
      event: mongoose.Types.ObjectId(req.body.event),
      matches: picks
    });



    let result = await userPicks.save();
    res.status(200).json(result)
  } catch (error) {
    res.status(404).json(error)
  }
}