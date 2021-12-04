import { Container, Grid, Paper, Radio, RadioGroup, Button, Avatar, Typography } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import { getUpcomingEvent, getUpcomingMainEvents } from "../../../actions/events";
import { addPicks } from "../../../actions/picks";
import { getMatchesByEventId, getUpcomingMainEventMatches } from "../../../actions/matches";
import { useDispatch, useSelector } from "react-redux";
import { getMatchOutcomeMethods } from "../../../actions/matchOutcomeMethods";
import _ from "lodash";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import moment from "moment";


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Select event', 'Select picks', 'Submit picks'];
}

function Picks() {
  const dispatch = useDispatch();
  const mainEvents = useSelector(state => state.events.data);
  const matches = useSelector(state => state.matches.data);
  const upcomingEvents = mainEvents?.filter( match => match.event !== null);
  const [event, setEvent] = useState({});
  const [eventID, setEventID] = useState(null);
    const matchOutcomeMethods = useSelector(state => state.matchOutcomeMethods.data);
  // const matches = useSelector(state => state.matches.data);
  const user = localStorage.getItem("authorized") ? JSON.parse(localStorage.getItem("authorized")) : null;
  const [showFullList, setShowFullList] = useState("")
  

  const [ fighterPicked, setFighterPicked ] = useState({});
  const [roundPicked, setRoundPicked] = useState({});
  const [outcomePicked, setOutcomePicked] = useState({})
  const [matchesPicked, setMatchesPicked] = useState({})
  const [stepEnabled, setStepEnabled] = useState("grey")

    const displayRounds = (roundNumb, matchId) => {

    const rounds = []
    for (var i = 1; i <= roundNumb; i++) {
      rounds.push(<Grid item xs={2} md={roundNumb < 5 ? 12 : 6}>
        <label className="picks-label">
          <Paper elevation={3} className={`picks-fighter round ${roundPicked[`match-${matchId}-rounds`] === `${i}` ? "selected" : "" }`}>
          <Radio 
            className="picks-radio" 
            value={i}
            checked={roundPicked[`match-${matchId}-rounds`] === `${i}`}
            /> 
          {i}
          </Paper>
        </label>
      </Grid>);
    }
    return rounds;
  }

  const handleEventChange = (e) => {
    setEvent({
     [e.target.name] : e.target.value
    });
    setEventID(e.target.value)
  }

  const showFullPicksList = () => {
  setShowFullList( showFullList === "" ? "show-full-list" : "" )
}

const handleSubmit = e => {
  e.preventDefault();

  const propertyNames = Object.keys(matchesPicked);
  const propertyValues = Object.values(matchesPicked);

  const matches = propertyValues.map( (match, i ) =>  {
    return {
      ...match,
      matchID: propertyNames[i]
    }
  })

  const userPicks = {
    userID: user.result._id,
    eventID: event._id,
    picks: matches
  }
  dispatch(addPicks(userPicks))
}

  const handleChange = (maxRounds ,matchOrder, matchID, selection, e) => {

    const DRAWID = "603d10b0ac9a88085e7c350f";
    const DECISIONID = "603d10a9ac9a88085e7c350e";

  if(selection==="fighter") {
    setFighterPicked({...fighterPicked,[e.target.name] : e.target.value})
  };

  if(selection==="round"){
    setRoundPicked({...roundPicked,[e.target.name] : e.target.value})
  }

  if(selection==="outcome"){
    setOutcomePicked({...outcomePicked,[e.target.name] : e.target.value})
  }

  if(e.target.value === DECISIONID|| e.target.value === DRAWID){
    matchesPicked[matchID].round = maxRounds.toString();
    roundPicked[`match-${matchID}-rounds`] = maxRounds.toString();
    if(e.target.value === DRAWID && fighterPicked[`match-${matchID}-fighter`]){
      const filterFighters = _.omit(fighterPicked, [`match-${matchID}-fighter`]);
      matchesPicked[matchID].fighter = "";
      matchesPicked[matchID].fighterID = "";
      setFighterPicked(filterFighters);
    }
  }

  if(outcomePicked[`match-${matchID}-outcome`] === DRAWID && selection === "fighter"){
    const filterOutcome= _.omit(outcomePicked, [`match-${matchID}-outcome`]);
    matchesPicked[matchID].outcome = "";
    matchesPicked[matchID].outcomeID = "";
    setOutcomePicked(filterOutcome);
  }

  if((outcomePicked[`match-${matchID}-outcome`] === DECISIONID || outcomePicked[`match-${matchID}-outcome`] === DRAWID) && selection === "round" && e.target.value !== maxRounds.toString()){
    const filterOutcome= _.omit(outcomePicked, [`match-${matchID}-outcome`]);
    matchesPicked[matchID].outcome = "";
    matchesPicked[matchID].outcomeID = "";
    setOutcomePicked(filterOutcome);
  }

  if(selection==="fighter") {
    setMatchesPicked({
      ...matchesPicked,
      [matchID]:{
        ...matchesPicked[matchID],
        matchOrder,
        fighterID: e.target.value,
        fighter:e.target.labels[0].attributes.fightername.value
      },
    })
  }
  if(selection==="round") {
    setMatchesPicked({
      ...matchesPicked,
      [matchID]:{
        ...matchesPicked[matchID],
        matchOrder,
        round:e.target.value
      },
    })
  }
  if(selection==="outcome") {
    setMatchesPicked({
      ...matchesPicked,
      [matchID]:{
        ...matchesPicked[matchID],
        matchOrder,
        outcome: e.target.labels[0].attributes.outcomename.value,
        outcomeID: e.target.value
      },
    });
  }
}
  
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const eventMatches = () => {
    // dispatch(getMatchesByEventId(eventID));

    // console.log("matches: ", matches)
   return(
    <Grid container spacing={3} direction="row" justifyContent="space-between">
    <Grid item xs={12} md={7} className="picks-container">
    {matches?.length > 0 ? matches.map( match => <Grid key={match._id} container direction="row" className="pick-container" justifyContent="space-between" alignItems="center" spacing={1}>
            <Grid item xs={12} md={5}>
            <p className="pick-section-title">SELECT FIGHTER</p>
            <RadioGroup
              name={`match-${match._id}-fighter`}
              onChange={ e => handleChange(match.maxRounds, match.matchOrder, match._id,"fighter", e)}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                <label className="picks-label" fightername={`${match.fighter1.firstname} ${match.fighter1.lastname}`}>
                  <Paper className={`picks-fighter ${fighterPicked[`match-${match._id}-fighter`] === match.fighter1._id ? "selected" : "" }`} elevation={3}>
                  <Radio className="picks-radio" value={match.fighter1._id} checked={fighterPicked[`match-${match._id}-fighter`] === match.fighter1._id}/>
                    <Avatar src={match.fighter1.image}/>
                      <div className="picks-fighter-name">
                        <p>{`${match.fighter1.firstname} ${match.fighter1.lastname}`}</p>
                        <p>{`${match.fighter1.wins}-${match.fighter1.losses}-${match.fighter1.draws}`}</p>
                      </div>
                      <div className="odds-container">
                        <span className="picks-odds favorite">-250</span>
                      </div>
                  </Paper>
                  </label>
                </Grid>
                <Grid item xs={12}>
                <label className="picks-label" fightername={`${match.fighter2.firstname} ${match.fighter2.lastname}`}>
                  <Paper elevation={3} className={`picks-fighter ${fighterPicked[`match-${match._id}-fighter`] === match.fighter2._id ? "selected" : "" }`} >
                  <Radio className="picks-radio" value={match.fighter2._id} checked={fighterPicked[`match-${match._id}-fighter`] === match.fighter2._id}/>
                    <Avatar src={match.fighter2.image}/>
                    <div className="picks-fighter-name">
                      <p>{`${match.fighter2.firstname} ${match.fighter2.lastname}`}</p>
                      <p>{`${match.fighter2.wins}-${match.fighter2.losses}-${match.fighter2.draws}`}</p>
                    </div>
                    <div className="odds-container">
                      <span className="picks-odds">+150</span>
                    </div>
                  </Paper>
                  </label>
                </Grid>
              </Grid>
              </RadioGroup>
            </Grid>
            <Grid item xs={12} md={2}>
              <p className="pick-section-title">SELECT ROUND</p>
              <RadioGroup
                name={`match-${match._id}-rounds`}
                onChange={ e => handleChange(match.maxRounds ,match.matchOrder, match._id,"round", e)}
              >
              <Grid container spacing={1} direction="row" justifyContent="space-between" alignItems="center">
              {displayRounds(match.maxRounds, match._id)}
              </Grid>
              </RadioGroup>
            </Grid>
            <Grid item xs={12} md={4}>
            <p className="pick-section-title">SELECT OUTCOME</p>
              <RadioGroup
                name={`match-${match._id}-outcome`}
                onChange={ e => handleChange(match.maxRounds,match.matchOrder, match._id,"outcome", e)}
              >
              <Grid container spacing={1}>
              {matchOutcomeMethods?.length > 0 && matchOutcomeMethods.map( outcome => <Grid key={outcome._id} item xs={4} md={6}>
                <label className="picks-label" outcomename={outcome.name}>
                  <Paper elevation={3} className={`picks-fighter outcome ${outcomePicked[`match-${match._id}-outcome`] === outcome._id ? "selected" : "" }`}>
                  <Radio 
                    className="picks-radio" 
                    value={outcome._id}
                    checked={outcomePicked[`match-${match._id}-outcome`] === outcome._id}
                    />
                      {outcome.name}
                  </Paper>
                  </label>
                </Grid>)}
              </Grid>
              </RadioGroup>
            </Grid>
        </Grid>) : "...loading"}
    </Grid>
    <Grid item xs={12} md={4} style={{background:"#1D1D1D"}} className={`picks-list ${Object.keys(matchesPicked).length > 0 && "show"} ${showFullList}`}>
    <div className="full-pick-list-tab" onClick={showFullPicksList}>
      {showFullList === "" ? <ExpandLessIcon fontSize="large"/> : <ExpandMoreIcon fontSize="large"/>}
    </div>
    <Grid container>
    <Grid item xs={12} style={{background:"#535353", padding:"10px", textAlign:"center", margin:"20px 5px"}}><h4>YOUR PICKS</h4></Grid>
    <Grid item xs={12} style={{background:"#535353", padding:"10px", textAlign:"center", margin:"20px 5px"}}>
    <form action="" style={{display:"flex"}} onSubmit={handleSubmit}>
      <Grid container style={{background:"#535353",margin:"5px", fontSize:"12px", fontWeight:"bold"}}>
        <Grid style={{color:"black"}} container direction="row" justifyContent="space-between" alignItems="center"> 
          <Grid item xs={3} style={{textAlign:"center"}}>FIGHTER</Grid>
          <Grid item xs={3} style={{textAlign:"center"}}>ROUND</Grid>
          <Grid item xs={3} style={{textAlign:"center"}}>OUTCOME</Grid>
          <Grid item xs={3} style={{textAlign:"center"}}>REMOVE</Grid>
        </Grid>
        {Object.keys(matchesPicked).map( matchID => <Grid key={matchID} style={{background:"#242424", margin:"10px 0"}} container spacing={1} direction="row" justifyContent="space-around" alignItems="center">
          <Grid item xs={3} style={{textAlign:"center"}}>{matchesPicked[matchID].fighter}</Grid>
          <Grid item xs={3} style={{textAlign:"center"}}>{matchesPicked[matchID].round}</Grid>
          <Grid item xs={3} style={{textAlign:"center"}}>{matchesPicked[matchID].outcome}</Grid>
          <Grid item xs={3} style={{textAlign:"center", color:"#E34234"}}><DeleteForeverIcon onClick={()=>removePick(matchID)} /></Grid>
        </Grid>) }
        {Object.keys(matchesPicked).length > 0 && <div style={{margin:"20px auto", textAlign:"center"}}>
        <Button type="submit" style={{marginBottom:"20px"}} variant="contained" color="primary">SUBMIT PICKS</Button>
        </div>}
      </Grid>
    </form>
    </Grid>
      </Grid>
    </Grid>
  </Grid>
   )
  }

  const events = () => (
    <div style={{backgroundColor:"#111111", marginTop:"20px"}}>
      <Container>
        <Grid container>
        {upcomingEvents?.length > 0 && upcomingEvents.map( match => <Grid item spacing={1} xs={12}>
          <label style={{cursor:"pointer"}}>
            <RadioGroup
            name={`event-${match.event._id}`}
            onChange={handleEventChange}
            >
              <Paper style={{backgroundColor:"#262626", padding:"10px", margin:"10px 0", display:"flex"}}>
                <Grid container spacing={1} justifyContent="space-between" alignItems="center">
                  <Grid item xs={4}>
                    <h4 style={{color: event[`event-${match.event._id}`] === match.event._id ? "white" :'grey', fontSize:"16px"}}>{match.event.name}</h4>
                    <p style={{color: event[`event-${match.event._id}`] === match.event._id ? "white" :"dimgrey",fontSize:"14px"}}>{moment(match.event.date).format("MMMM DD, YYYY")}</p>
                  </Grid>
                  <Grid item xs={4} style={{textAlign:"left",color: event[`event-${match.event._id}`] === match.event._id ? "white" :'grey'}}>
                    <Grid container spacing={1} justifyContent="space-between">
                      <Grid style={{textAlign:"center", margin:"auto"}}  item xs={12} md={5}><h4 style={{textTransform:"uppercase"}}>{match.fighter1.firstname} {match.fighter1.lastname}</h4></Grid>
                      <Grid style={{textAlign:"center", margin:"auto"}}  item xs={12} md={2}><p>vs</p></Grid>
                      <Grid style={{textAlign:"center", margin:"auto"}}  item xs={12} md={5}><h4 style={{textTransform:"uppercase"}}>{match.fighter2.firstname} {match.fighter2.lastname}</h4></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4} style={{textAlign:"right"}}>
                    <Radio
                      value={match.event._id}
                      checked={event[`event-${match.event._id}`] === match.event._id}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </RadioGroup>
          </label> 
          </Grid> )}
        </Grid>
      </Container>
    </div>
  )

  // const submitPicks = () => {
  //   getMatchesByEventId(event.id)
  //   return(

  //   )
  // }


  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return  events();
      case 1:
        return  eventMatches();
      case 2:
        return 'Submit picks';
      default:
        return 'Unknown stepIndex';
    }
  }

  const removePick = (match) => {

  const filterMatches = _.omit(matchesPicked, [match]);
  const filterFighters = _.omit(fighterPicked, [`match-${match}-fighter`]);
  const filterRounds = _.omit(roundPicked, [`match-${match}-rounds`]);
  const filterOutcome= _.omit(outcomePicked, [`match-${match}-outcome`]);

  setMatchesPicked(filterMatches);
  setFighterPicked(filterFighters);
  setRoundPicked(filterRounds);
  setOutcomePicked(filterOutcome);
}

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const enableStep = () => {
    // setStepEnabled("blue")
    if(activeStep === 0 && eventID === null){
      // setStepEnabled("blue")
      return true 
    }else{
      return false
    }
  }

    useEffect(() => {
    dispatch(getUpcomingMainEvents());
    dispatch(getMatchOutcomeMethods())
    if(eventID){
      dispatch(getMatchesByEventId(eventID));
    }
  }, [dispatch, eventID])
//   const dispatch = useDispatch()
//   const event = useSelector(state => state.events.data);
//   const matchOutcomeMethods = useSelector(state => state.matchOutcomeMethods.data);
//   const matches = useSelector(state => state.matches.data);
//   const user = localStorage.getItem("authorized") ? JSON.parse(localStorage.getItem("authorized")) : null;
//   const [showFullList, setShowFullList] = useState("")
  

//   const [ fighterPicked, setFighterPicked ] = useState({});
//   const [roundPicked, setRoundPicked] = useState({});
//   const [outcomePicked, setOutcomePicked] = useState({})
//   const [matchesPicked, setMatchesPicked] = useState({})
  

//   useEffect(() => {
//     dispatch(getUpcomingEvent())
//     dispatch(getMatchOutcomeMethods())
//   }, [dispatch])

//   useEffect(() => {
//     if(event){
//       dispatch(getMatchesByEventId(event.id))
//     }
//   }, [event, dispatch])

//   const displayRounds = (roundNumb, matchId) => {

//     const rounds = []
//     for (var i = 1; i <= roundNumb; i++) {
//       rounds.push(<Grid item xs={2} md={roundNumb < 5 ? 12 : 6}>
//         <label className="picks-label">
//           <Paper elevation={3} className={`picks-fighter round ${roundPicked[`match-${matchId}-rounds`] === `${i}` ? "selected" : "" }`}>
//           <Radio 
//             className="picks-radio" 
//             value={i}
//             checked={roundPicked[`match-${matchId}-rounds`] === `${i}`}
//             /> 
//           {i}
//           </Paper>
//         </label>
//       </Grid>);
//     }
//     return rounds;
//   }
// const handleChange = (maxRounds ,matchOrder, matchID, selection, e) => {

//     const DRAWID = "603d10b0ac9a88085e7c350f";
//     const DECISIONID = "603d10a9ac9a88085e7c350e";

//   if(selection==="fighter") {
//     setFighterPicked({...fighterPicked,[e.target.name] : e.target.value})
//   };

//   if(selection==="round"){
//     setRoundPicked({...roundPicked,[e.target.name] : e.target.value})
//   }

//   if(selection==="outcome"){
//     setOutcomePicked({...outcomePicked,[e.target.name] : e.target.value})
//   }

//   if(e.target.value === DECISIONID|| e.target.value === DRAWID){
//     matchesPicked[matchID].round = maxRounds.toString();
//     roundPicked[`match-${matchID}-rounds`] = maxRounds.toString();
//     if(e.target.value === DRAWID && fighterPicked[`match-${matchID}-fighter`]){
//       const filterFighters = _.omit(fighterPicked, [`match-${matchID}-fighter`]);
//       matchesPicked[matchID].fighter = "";
//       matchesPicked[matchID].fighterID = "";
//       setFighterPicked(filterFighters);
//     }
//   }

//   if(outcomePicked[`match-${matchID}-outcome`] === DRAWID && selection === "fighter"){
//     const filterOutcome= _.omit(outcomePicked, [`match-${matchID}-outcome`]);
//     matchesPicked[matchID].outcome = "";
//     matchesPicked[matchID].outcomeID = "";
//     setOutcomePicked(filterOutcome);
//   }

//   if((outcomePicked[`match-${matchID}-outcome`] === DECISIONID || outcomePicked[`match-${matchID}-outcome`] === DRAWID) && selection === "round" && e.target.value !== maxRounds.toString()){
//     const filterOutcome= _.omit(outcomePicked, [`match-${matchID}-outcome`]);
//     matchesPicked[matchID].outcome = "";
//     matchesPicked[matchID].outcomeID = "";
//     setOutcomePicked(filterOutcome);
//   }

//   if(selection==="fighter") {
//     setMatchesPicked({
//       ...matchesPicked,
//       [matchID]:{
//         ...matchesPicked[matchID],
//         matchOrder,
//         fighterID: e.target.value,
//         fighter:e.target.labels[0].attributes.fightername.value
//       },
//     })
//   }
//   if(selection==="round") {
//     setMatchesPicked({
//       ...matchesPicked,
//       [matchID]:{
//         ...matchesPicked[matchID],
//         matchOrder,
//         round:e.target.value
//       },
//     })
//   }
//   if(selection==="outcome") {
//     setMatchesPicked({
//       ...matchesPicked,
//       [matchID]:{
//         ...matchesPicked[matchID],
//         matchOrder,
//         outcome: e.target.labels[0].attributes.outcomename.value,
//         outcomeID: e.target.value
//       },
//     });
//   }
// }

// const removePick = (match) => {

//   const filterMatches = _.omit(matchesPicked, [match]);
//   const filterFighters = _.omit(fighterPicked, [`match-${match}-fighter`]);
//   const filterRounds = _.omit(roundPicked, [`match-${match}-rounds`]);
//   const filterOutcome= _.omit(outcomePicked, [`match-${match}-outcome`]);

//   setMatchesPicked(filterMatches);
//   setFighterPicked(filterFighters);
//   setRoundPicked(filterRounds);
//   setOutcomePicked(filterOutcome);
// }

// const showFullPicksList = () => {
//   setShowFullList( showFullList === "" ? "show-full-list" : "" )
// }

// const handleSubmit = e => {
//   e.preventDefault();

//   const propertyNames = Object.keys(matchesPicked);
//   const propertyValues = Object.values(matchesPicked);

//   const matches = propertyValues.map( (match, i ) =>  {
//     return {
//       ...match,
//       matchID: propertyNames[i]
//     }
//   })

//   const userPicks = {
//     userID: user.result._id,
//     eventID: event._id,
//     picks: matches
//   }
//   dispatch(addPicks(userPicks))
// }
console.log("activeStep: ", activeStep)
  return (
    <div>
    <div style={{background:"black", 
    height:"200px", 
    display:"flex",
    paddingTop:"80px",
    alignItems:"center" ,
    backgroundImage:"url(./images/hero/picks-hero.jpg)",
    backgroundRepeat:"no-repeat",
    backgroundPosition:"center",
    backgroundSize:"cover"
    }}>
    <Container>
    <h1>PICKS</h1>
    </Container>
    </div>

    <Container>
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel style={{backgroundColor:"#111111"}}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button
                style={{background:"grey"}}
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button disabled={enableStep()} variant="contained" style={{background:stepEnabled}} color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
      {/* <Grid container spacing={3} direction="row" justifyContent="space-between">
        <Grid item xs={12} md={7} className="picks-container">
        {matches?.length > 0 ? matches.map( match => <Grid key={match._id} container direction="row" className="pick-container" justifyContent="space-between" alignItems="center" spacing={1}>
                <Grid item xs={12} md={5}>
                <p className="pick-section-title">SELECT FIGHTER</p>
                <RadioGroup
                  name={`match-${match._id}-fighter`}
                  onChange={ e => handleChange(match.maxRounds, match.matchOrder, match._id,"fighter", e)}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <label className="picks-label" fightername={`${match.fighter1.firstname} ${match.fighter1.lastname}`}>
                      <Paper className={`picks-fighter ${fighterPicked[`match-${match._id}-fighter`] === match.fighter1._id ? "selected" : "" }`} elevation={3}>
                      <Radio className="picks-radio" value={match.fighter1._id} checked={fighterPicked[`match-${match._id}-fighter`] === match.fighter1._id}/>
                        <Avatar src={match.fighter1.image}/>
                          <div className="picks-fighter-name">
                            <p>{`${match.fighter1.firstname} ${match.fighter1.lastname}`}</p>
                            <p>{`${match.fighter1.wins}-${match.fighter1.losses}-${match.fighter1.draws}`}</p>
                          </div>
                          <div className="odds-container">
                            <span className="picks-odds favorite">-250</span>
                          </div>
                      </Paper>
                      </label>
                    </Grid>
                    <Grid item xs={12}>
                    <label className="picks-label" fightername={`${match.fighter2.firstname} ${match.fighter2.lastname}`}>
                      <Paper elevation={3} className={`picks-fighter ${fighterPicked[`match-${match._id}-fighter`] === match.fighter2._id ? "selected" : "" }`} >
                      <Radio className="picks-radio" value={match.fighter2._id} checked={fighterPicked[`match-${match._id}-fighter`] === match.fighter2._id}/>
                        <Avatar src={match.fighter2.image}/>
                        <div className="picks-fighter-name">
                          <p>{`${match.fighter2.firstname} ${match.fighter2.lastname}`}</p>
                          <p>{`${match.fighter2.wins}-${match.fighter2.losses}-${match.fighter2.draws}`}</p>
                        </div>
                        <div className="odds-container">
                          <span className="picks-odds">+150</span>
                        </div>
                      </Paper>
                      </label>
                    </Grid>
                  </Grid>
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} md={2}>
                  <p className="pick-section-title">SELECT ROUND</p>
                  <RadioGroup
                    name={`match-${match._id}-rounds`}
                    onChange={ e => handleChange(match.maxRounds ,match.matchOrder, match._id,"round", e)}
                  >
                  <Grid container spacing={1} direction="row" justifyContent="space-between" alignItems="center">
                  {displayRounds(match.maxRounds, match._id)}
                  </Grid>
                  </RadioGroup>
                </Grid>
                <Grid item xs={12} md={4}>
                <p className="pick-section-title">SELECT OUTCOME</p>
                  <RadioGroup
                    name={`match-${match._id}-outcome`}
                    onChange={ e => handleChange(match.maxRounds,match.matchOrder, match._id,"outcome", e)}
                  >
                  <Grid container spacing={1}>
                  {matchOutcomeMethods?.length > 0 && matchOutcomeMethods.map( outcome => <Grid key={outcome._id} item xs={4} md={6}>
                    <label className="picks-label" outcomename={outcome.name}>
                      <Paper elevation={3} className={`picks-fighter outcome ${outcomePicked[`match-${match._id}-outcome`] === outcome._id ? "selected" : "" }`}>
                      <Radio 
                        className="picks-radio" 
                        value={outcome._id}
                        checked={outcomePicked[`match-${match._id}-outcome`] === outcome._id}
                        />
                          {outcome.name}
                      </Paper>
                      </label>
                    </Grid>)}
                  </Grid>
                  </RadioGroup>
                </Grid>
            </Grid>) : "...loading"}
        </Grid>
        <Grid item xs={12} md={4} style={{background:"#1D1D1D"}} className={`picks-list ${Object.keys(matchesPicked).length > 0 && "show"} ${showFullList}`}>
        <div className="full-pick-list-tab" onClick={showFullPicksList}>
          {showFullList === "" ? <ExpandLessIcon fontSize="large"/> : <ExpandMoreIcon fontSize="large"/>}
        </div>
        <Grid container>
        <Grid item xs={12} style={{background:"#535353", padding:"10px", textAlign:"center", margin:"20px 5px"}}><h4>YOUR PICKS</h4></Grid>
        <Grid item xs={12} style={{background:"#535353", padding:"10px", textAlign:"center", margin:"20px 5px"}}>
        <form action="" style={{display:"flex"}} onSubmit={handleSubmit}>
          <Grid container style={{background:"#535353",margin:"5px", fontSize:"12px", fontWeight:"bold"}}>
            <Grid style={{color:"black"}} container direction="row" justifyContent="space-between" alignItems="center"> 
              <Grid item xs={3} style={{textAlign:"center"}}>FIGHTER</Grid>
              <Grid item xs={3} style={{textAlign:"center"}}>ROUND</Grid>
              <Grid item xs={3} style={{textAlign:"center"}}>OUTCOME</Grid>
              <Grid item xs={3} style={{textAlign:"center"}}>REMOVE</Grid>
            </Grid>
            {Object.keys(matchesPicked).map( matchID => <Grid key={matchID} style={{background:"#242424", margin:"10px 0"}} container spacing={1} direction="row" justifyContent="space-around" alignItems="center">
              <Grid item xs={3} style={{textAlign:"center"}}>{matchesPicked[matchID].fighter}</Grid>
              <Grid item xs={3} style={{textAlign:"center"}}>{matchesPicked[matchID].round}</Grid>
              <Grid item xs={3} style={{textAlign:"center"}}>{matchesPicked[matchID].outcome}</Grid>
              <Grid item xs={3} style={{textAlign:"center", color:"#E34234"}}><DeleteForeverIcon onClick={()=>removePick(matchID)} /></Grid>
            </Grid>) }
            {Object.keys(matchesPicked).length > 0 && <div style={{margin:"20px auto", textAlign:"center"}}>
            <Button type="submit" style={{marginBottom:"20px"}} variant="contained" color="primary">SUBMIT PICKS</Button>
            </div>}
          </Grid>
        </form>
        </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </Container>
    </div>
  )
}

export default Picks
