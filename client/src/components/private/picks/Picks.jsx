import { Container, FormControl,Box, Select, MenuItem, Drawer ,FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Button, Avatar, InputLabel } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import { getUpcomingEvent } from "../../../actions/events";
import { addPicks } from "../../../actions/picks";
import { getMatchesByEventId } from "../../../actions/matches";
import { useDispatch, useSelector } from "react-redux";
import { getMatchOutcomeMethods } from "../../../actions/matchOutcomeMethods";
import { useStyles } from './styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import _ from "lodash";
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

function Picks() {
  const matchesQuery = useMediaQuery('(min-width:600px)');
  const classes = useStyles();
  const dispatch = useDispatch()
  const event = useSelector(state => state.events.data);
  const matchOutcomeMethods = useSelector(state => state.matchOutcomeMethods.data);
  const matches = useSelector(state => state.matches.data);
  const [ round, setRound ] = useState({})
  const [ outcome, setOutcome ] = useState({})
  const [ fighter, setFighter ] = useState({})
  const [ fighterName, setFighterName ] = useState({})
  const [ outcomeName, setOutcomeName ] = useState({})
  const [ pickedMatches, setPickedMatches ] = useState([]);
  const [matchesDrawer, setMatchesDrawer] = React.useState({
    height: "auto"
  });
  const [showMatchesPicked, setShowMatchesPicked] = useState("hidden");
  const [disablePick, setDisablePick] = useState({})
  const [showMatchesPickedContent, setShowMatchesPickedContent ] = React.useState("none")
  const [eventId, setEventId ] = React.useState();
  const user = localStorage.getItem("authorized") ? JSON.parse(localStorage.getItem("authorized")) : null
  // const [clearPick, setClearPick] = useState({})



  const handleChange = (selection,matchId,e) => {

    const drawId = "603d10b0ac9a88085e7c350f";
    const decisionId = "603d10a9ac9a88085e7c350e";
    const noContestId = "603d10b9ac9a88085e7c3510";


    const findMatch = matches.find( match => match._id === matchId );

     if(selection === "round"){
      setRound({
        ...round,
        [e.target.name]: e.target.value
      })
      // if the outcome is decision or draw and the user picks a round that is not the last one
      if((outcome[`outcome-${matchId}`] === decisionId || outcome[`outcome-${matchId}`]=== drawId) &&( e.target.value !== findMatch.maxRounds.toString())) {
        // unselect the radio button
        setOutcome({
          ...outcome,
          [`outcome-${matchId}`]: false
        })
      }
    }

    if(selection === "outcome"){

      setOutcome({
        ...outcome,
        [e.target.name]: e.target.value
      })

      setOutcomeName({
        ...outcomeName,
        [e.target.name]:e.target.labels[0].attributes.outcomeName.value
      })

       // if user picks decision or draw
      if(( e.target.value === decisionId ||  e.target.value === drawId)){
        // select the last round automatically
        setRound({
          ...round,
          [`round-${matchId}`]: findMatch.maxRounds.toString()
        })
      }
      // if a fighter is selected and the user picks draw
      if(fighter[`fighter-${matchId}`] && (e.target.value === drawId || e.target.value === noContestId)  ){
        // unselect the selected fighter
        setFighter({
          ...fighter,
          [`fighter-${matchId}`]:false,
        })
      }
    }

    if(selection === "fighter"){


      setFighter({
        ...fighter,
        [e.target.name]:e.target.value,
      })

      setFighterName({
        ...fighterName,
        [e.target.name]:e.target.labels[0].attributes.fightername.value
      })

      // if the draw or no contest radio buttons are already selected
      if(outcome[`outcome-${matchId}`] === drawId || outcome[`outcome-${matchId}`] === noContestId){
        // unselect the outcome methods radio button
        setOutcome({
          ...outcome,
          [`outcome-${matchId}`]: false
        })
      }
    }
  }


  const displayRounds = (roundNumb, matchId) => {

    const rounds = []
    for (var i = 1; i <= roundNumb; i++) {
      rounds.push(<Grid item xs={roundNumb === 5 ? 2 : 4}>
        <label className={classes.round} style={{position:"relative", backgroundColor:round[`round-${matchId}`] === i.toString()  ? "#4A5CE1" : null, color: round[`round-${matchId}`] === i.toString()  ? "white":null, borderColor: round[`round-${matchId}`] === i.toString() ? "#4051C9" : null }}>
          <Radio 
            disabled={disablePick[`match-${matchId}`] === matchId}
            className={classes.radioButtons}
            value={i}
            checked={ round[`round-${matchId}`] === i}
          />
          Round {i}
        </label>
        </Grid>);
    }
    return rounds;
  }

  const addPick = (matchId) => {

    // check if the current pick has at least a fighter picked as a winner unless is a draw or no contest
      // if it is empty then show the user a message

      // if(fighter[`fighter-${matchId}`] === ""){
      //   console.log("empty")
      // }
      // const drawId = "603d10b0ac9a88085e7c350f";
      // const decisionId = "603d10a9ac9a88085e7c350e";
      // const noContestId = "603d10b9ac9a88085e7c3510";

    //  the user is allowed to either pick a fighter to win, or a method or a round individually
    // there has to be an outcome in either of those 3 
    // the use is not allowed to add a pick that is empty

    if(!fighter[`fighter-${matchId}`] && !outcome[`outcome-${matchId}`] && !round[`round-${matchId}`]){
      return
    }else{
      setPickedMatches([
        ...pickedMatches,
        {
          matchId: matchId,
          fighterId: fighter[`fighter-${matchId}`] ? fighter[`fighter-${matchId}`] : null,
          outcomeId: outcome[`outcome-${matchId}`] ? outcome[`outcome-${matchId}`]  : null,
          round: round[`round-${matchId}`] ? round[`round-${matchId}`] : null,
          fighterName: fighterName[`fighter-${matchId}`] ? fighterName[`fighter-${matchId}`] : null,
          outcomeName: outcomeName[`outcome-${matchId}`] ? outcomeName[`outcome-${matchId}`]  : null,
        }
      ]);

      setDisablePick({
        ...disablePick,
        [`match-${matchId}`]: matchId
      })
    }
  }

  const removePick = (matchId) => {
    const filteredMatches = pickedMatches.filter( pickedMatch => pickedMatch.matchId !== matchId);
    setPickedMatches(filteredMatches)
    setDisablePick({
      ...disablePick,
      [`match-${matchId}`]: !matchId
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const picks = {
      user: user.result._id,
      event: eventId,
      matches:pickedMatches
    }
    dispatch(addPicks(picks))
    // console.log("picked matches: ", pickedMatches)
  }

  useEffect(() => {
    dispatch(getUpcomingEvent())
    dispatch(getMatchOutcomeMethods())
  }, [dispatch])

  useEffect(() => {
    if(event){
      dispatch(getMatchesByEventId(event.id))
      setEventId(event.id)
    }
  }, [event, dispatch])
  

const fighter1Odds = matchesQuery ? {top: "auto", left: "auto", right:"10px", bottom:"10px"} : {top: "10px", left: "10px", right:"auto", bottom:"auto" }

const fighter2Odds = matchesQuery ? {top: "auto", right: "auto", left:"10px", bottom:"10px"} : {top: "10px", right: "10px", left:"auto", bottom:"auto" }
// console.log("pickedMatches: ", pickedMatches)
// console.log("outcomeName: ",outcomeName)
// console.log("event: ", event?._id)
// console.log("user: ", user.result._id)
  return (
    <Container>
    <form action="" id="submitPicks" onSubmit={handleSubmit}>
    <Grid container spacing={6}>

     {matches && matches.length > 0 && matches.map( ( match, i) => (
      <Grid item xs={12} md={6} lg={5}>
        <Paper className={classes.match}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel className={classes.formLabel} component="legend">SELECT FIGHTER</FormLabel>
              <RadioGroup
                aria-label="fighter-0"
                defaultValue={fighter.val}
                // name="fighter-6147adb7d8cd3e56f73fd12b"
                name={`fighter-${match._id}`}
                // onChange={(e) => handleChange("fighter","6147adb7d8cd3e56f73fd12b", e)}
                onChange={(e) => handleChange("fighter",match._id, e)}
              >
              <div style={{padding:"10px"}}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                <label fightername={`${match.fighter1.firstname} ${match.fighter1.lastname}`} className={`${classes.fighter} ${classes.fighter1}`} style={{backgroundColor: fighter[`fighter-${match._id}`] === match.fighter1._id ? "#4A5CE1" : null, flexDirection: matchesQuery? null : "column", height: matchesQuery? "auto" : "100px" }}>
                <Avatar className={classes.fighterImage} src={match.fighter1.image}/>
                <div className={classes.fighterNameContainer}>
                  <p className={classes.fighterName}>{match.fighter1.firstname} {match.fighter1.lastname}</p>
                  <p style={{color:"#CBCBCB"}}>{match.fighter1.wins}-{match.fighter1.losses}-{match.fighter1.draws}</p>
                </div>
                  <Radio
                  disabled={disablePick[`match-${match._id}`] === match._id}
                    value={match.fighter1._id}
                    checked={fighter[`fighter-${match._id}`] === match.fighter1._id}
                    className={classes.radioButtons}
                  />
                  <p className={`${classes.odds}`} style={fighter1Odds}>+250</p>
                </label>
                </Grid>
                <Grid item xs={6}>
                <label fightername={`${match.fighter2.firstname} ${match.fighter2.lastname}`}  className={`${classes.fighter} ${classes.fighter2}`} style={{backgroundColor: fighter[`fighter-${match._id}`] === match.fighter2._id ? "#4A5CE1" : null, flexDirection: matchesQuery? null : "column-reverse", height: matchesQuery? "auto" : "100px" }}>
                <p className={`${classes.odds}`} style={fighter2Odds}>-250</p>
                  <Radio
                  disabled={disablePick[`match-${match._id}`] === match._id}
                    // value="603a6783eeff209906a90abf"
                    value={match.fighter2._id}
                    checked={fighter[`fighter-${match._id}`] === match.fighter2._id}
                    className={classes.radioButtons}
                  />
                  <div className={classes.fighterNameContainer}>
                    <p className={classes.fighterName}>{match.fighter2.firstname} {match.fighter2.lastname}</p>
                    <p style={{color:"#CBCBCB"}}>{match.fighter2.wins}-{match.fighter2.losses}-{match.fighter2.draws}</p>
                  </div>
                  <Avatar className={classes.fighterImage} src={match.fighter2.image}/>
                </label>
                </Grid>
              </Grid>
              </div>
            </RadioGroup>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel className={classes.formLabel} component="legend">SELECT ROUND</FormLabel>
              <RadioGroup
                aria-label="rounds"
                defaultValue={round.val}
                name={`round-${match._id}`}
                onChange={(e)=> handleChange("round",match._id, e)}
              >
              <div style={{padding:"10px"}}>
              <Grid container style={{justifyContent:"space-between"}} spacing={match.maxRounds === 5 ? 1 : 2}>
                {displayRounds(match.maxRounds, match._id)}
              </Grid>
              </div>
            </RadioGroup>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" className={classes.formLabel}>SELECT OUTCOME</FormLabel>
              <RadioGroup
                aria-label="outcome"
                defaultValue={outcome.val}
                name={`outcome-${match._id}`}
                onChange={(e)=>handleChange("outcome", match._id, e)}
              >
              <div style={{padding:"10px"}}>
                <Grid container spacing={2}>
                {matchOutcomeMethods.length > 0 && matchOutcomeMethods.map( matchOutcome => (
                  <Grid item xs={4}>
                    <label outcomeName={matchOutcome.name} className={classes.outcome} style={{backgroundColor: outcome[`outcome-${match._id}`] === matchOutcome._id ? "#4A5CE1" :null }}>
                      <Radio 
                        disabled={disablePick[`match-${match._id}`] === match._id}
                        style={{position:"absolute", visibility:"hidden"}}
                        value={matchOutcome._id}
                        checked={outcome[`outcome-${match._id}`] === matchOutcome._id }
                      />
                      {matchOutcome.name}
                    </label>
                  </Grid>
                ))}
                </Grid>
              </div>
            </RadioGroup>
          </FormControl>
          </Grid>
          <Grid xs={12}>
            <div className={classes.matchPickBtnContainer}>
            <Button  disabled={disablePick[`match-${match._id}`] !== match._id } className={classes.matchClearBtn} variant="contained" color="primary" size="small"  onClick={()=>removePick(match._id)}  disableElevation><RemoveCircleIcon/>edit pick</Button>
            <Button disabled={disablePick[`match-${match._id}`] === match._id } className={classes.matchPickBtn} variant="contained" color="secondary" size="small"  onClick={()=>addPick(match._id)}  disableElevation><AddCircleIcon/>add pick</Button>
            </div>
          </Grid>
          </Grid>
        </Paper>
      </Grid>
     ))}
    </Grid>
      {/* <Button color="primary" variant="contained" type="submit">Submit Picks</Button> */}
      
    </form>
    {pickedMatches.length > 0 && <div style={{display:"flex", justifyContent:matchesQuery ? "end" : null}}>
    <Box style={{boxShadow:"rgb(0 0 0 / 25%) 0px 54px 55px, rgb(0 0 0 / 12%) 0px -12px 30px, rgb(0 0 0 / 12%) 0px 4px 6px, rgb(0 0 0 / 17%) 0px 12px 13px, rgb(0 0 0 / 9%) 0px -3px 5px",position:"fixed", bottom: matchesQuery ?"-80px" : "-13vh", backgroundColor:"#2E2D2D", borderRadius: "20px 20px 0 0", textAlign:"center", width: matchesQuery ? "45vh" :"auto", height:matchesDrawer.height, left: matchesQuery ? "auto" : "17px", right: matchesQuery ? "auto" : "17px"}}>
    <Badge style={{position:"absolute", left:"30px", top:"30px"}} badgeContent={pickedMatches.length} color="primary">
    </Badge>
      <button onClick={ ()=> { setMatchesDrawer({height: matchesDrawer.height === "auto" ? "100%" : "auto"});
        setShowMatchesPicked(showMatchesPicked === "hidden" ? "visible" : "hidden");
        setShowMatchesPickedContent(showMatchesPickedContent === "none"? "block" : "none")
       } } style={{display:"block", backgroundColor:"transparent", cursor:"pointer", width:"100%", border:"none"}}><div style={{width:"50px", backgroundColor:"#1E1E1E", height:"3px", borderRadius:"20px", textAlign:"center", margin:"30px auto 10px auto", boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"}}></div>
       <div style={{width:"80px", backgroundColor:"#1E1E1E", height:"3px", borderRadius:"20px", textAlign:"center", margin:"10px auto 10px auto", boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"}}></div>
       <div style={{width:"50px", backgroundColor:"#1E1E1E", height:"3px", borderRadius:"20px", textAlign:"center", margin:"10px auto 20px auto", boxShadow:"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)"}}></div>
       </button>
      <div style={{margin:"0 20px", fontSize:"10px", padding:"10px 0", fontWeight:"bold", color:"grey", visibility:showMatchesPicked}}>
      
      <Grid container style={{display:"flex" ,justifyContent:"space-between", backgroundColor:"#111111", padding:"10px"}}>
      <Grid item xs={4}>
        <p>FIGHTER PICKED</p>
      </Grid>
      <Grid item xs={4}>
        <p>ROUND PICKED</p>
      </Grid>
      <Grid item xs={4}>
        <p>OUTCOME PICKED</p>
      </Grid>
      </Grid>
      <br/>
       <div style={{display:showMatchesPickedContent}}>
       {pickedMatches.map( picked => <Grid container style={{display:"flex",marginBottom:"3px" ,justifyContent:"space-between", background:"darkgrey", color:"black", padding:"5px"}}>
        <Grid item xs={4}>
          <p>{picked.fighterName}</p>
        </Grid>
        <Grid item xs={4}>
          <p>{picked.round}</p>
        </Grid>
        <Grid item xs={4}>
          <p>{picked.outcomeName}</p>
        </Grid>
      </Grid>)}
      <br/> <br/>
      <Button fullWidth color="primary" size="large" variant="contained" form="submitPicks" type="submit">Submit Picks</Button>
       </div>
       
      {/* <Grid container style={{display:"flex", justifyContent:"space-between", background:"darkgrey", color:"black", padding:"5px"}}>
        <Grid item xs={4}>
          <p>Alexander Volkanovski</p>
        </Grid>
        <Grid item xs={4}>
          <p>4</p>
        </Grid>
        <Grid item xs={4}>
          <p>TKO</p>
        </Grid>
      </Grid> */}
      <br/>
      {/* <Grid container style={{display:"flex", justifyContent:"space-between", background:"darkgrey", color:"black", padding:"5px"}}>
        <Grid item xs={4}>
          <p>Alexander Volkanovski</p>
        </Grid>
        <Grid item xs={4}>
          <p>4</p>
        </Grid>
        <Grid item xs={4}>
          <p>TKO</p>
        </Grid>
      </Grid> */}
      </div>
    </Box>
    </div>}
    </Container>
  )
}

export default Picks
