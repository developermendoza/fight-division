import { Container, FormControl, FormControlLabel, FormLabel, Grid, Paper, Radio, RadioGroup, Button } from '@material-ui/core'
import React,{useEffect, useState} from 'react'
import { getUpcomingEvent } from "../../../actions/events";
import { getMatchesByEventId } from "../../../actions/matches";
import { useDispatch, useSelector } from "react-redux";

function Picks() {

  const dispatch = useDispatch()
  const event = useSelector(state => state.events.data);
  const matches = useSelector(state => state.matches.data);
  const [ round, setRound ] = useState({})
  const [ outcome, setOutcome ] = useState({})
  const [ fighter, setFighter ] = useState({})
  const [ fighterName, setFighterName ] = useState({})
  const [ pickedMatches, setPickedMatches ] = useState([]);

  const handleChange = (selection,e) => {

     if(selection === "round"){
      setRound({
        ...round,
        [e.target.name]: e.target.value
      })
    }

    if(selection === "outcome"){
      setOutcome({
        ...outcome,
        [e.target.name]: e.target.value
      })
    }

    if(selection === "fighter"){
      setFighter({
        ...fighter,
        [e.target.name]:e.target.value,
      })

      setFighterName({
        ...fighterName,
        [e.target.name]:e.target.labels[0].innerText
      })
    }
  }

  const addPick = (match) => {

    setPickedMatches([
      ...pickedMatches,
      {
        matchId: match,
        fighterId: fighter[`fighter-${match}`],
        outcomeId: outcome[`outcome-${match}`],
        round: round[`round-${match}`],
        fighterName: fighterName[`fighter-${match}`]
      }
    ])
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("picked matches: ", pickedMatches)
  }

  useEffect(() => {
    dispatch(getUpcomingEvent())
  }, [dispatch])

  useEffect(() => {
    if(event){
      dispatch(getMatchesByEventId(event.id))
    }
  }, [event, dispatch])

  // console.log("matches: ", matches)
  return (
    <Container>
    <form action="" onSubmit={handleSubmit}>
    <Grid container spacing={1}>
      <Grid item xs={12} md={6}>
        <Paper>
          <Grid container spacing={1}>
            <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Pick Fighter</FormLabel>
              <RadioGroup
                aria-label="fighter-0"
                defaultValue={fighter.val}
                name="fighter-6147adb7d8cd3e56f73fd12b"
                onChange={(e) => handleChange("fighter", e)}
                data-fighter={`Alexander "The Great" Volkanovski`}
              >
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="603a6783eeff209906a90abe" checked={fighter[`fighter-6147adb7d8cd3e56f73fd12b`] === "603a6783eeff209906a90abe"} control={<Radio />} label={`Alexander "The Great" Volkanovski`} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="603a6783eeff209906a90abf" checked={fighter[`fighter-6147adb7d8cd3e56f73fd12b`] === "603a6783eeff209906a90abf"} control={<Radio />} label={`Brian "T-City" Ortega`} />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Pick Round</FormLabel>
              <RadioGroup
                aria-label="rounds"
                defaultValue={round.val}
                name="round-6147adb7d8cd3e56f73fd12b"
                onChange={(e)=> handleChange("round", e)}
              >
              <Grid container>
                <Grid item xs={12} md={2}>
                  <FormControlLabel value="1" control={<Radio />} checked={ round[`round-6147adb7d8cd3e56f73fd12b`] === "1" } label={`Round 1`} />
                </Grid>
                <Grid item xs={12} md={2}>
                <FormControlLabel value="2" control={<Radio />} checked={ round[`round-6147adb7d8cd3e56f73fd12b`] === "2" } label={`Round 2`} />
                </Grid>
                <Grid item xs={12} md={2}>
                <FormControlLabel value="3" control={<Radio />} checked={ round[`round-6147adb7d8cd3e56f73fd12b`] === "3" } label={`Round 3`} />
                </Grid>
                <Grid item xs={12} md={2}>
                <FormControlLabel value="4" control={<Radio />} checked={ round[`round-6147adb7d8cd3e56f73fd12b`] === "4" } label={`Round 4`} />
                </Grid>
                <Grid item xs={12} md={2}>
                <FormControlLabel value="5" control={<Radio />} checked={ round[`round-6147adb7d8cd3e56f73fd12b`] === "5" } label={`Round 5`} />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Pick Fight Outcome</FormLabel>
              <RadioGroup
                aria-label="outcome"
                defaultValue={outcome.val}
                name="outcome-6147adb7d8cd3e56f73fd12b"
                onChange={(e)=>handleChange("outcome", e)}
              >
              <Grid container>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="knockout" control={<Radio />} checked={outcome[`outcome-6147adb7d8cd3e56f73fd12b`] === "knockout" } label={`Knockout`} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="technical knockout" control={<Radio />} checked={outcome[`outcome-6147adb7d8cd3e56f73fd12b`] === "technical knockout" } label={`Technical Knockout`} />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="submission" control={<Radio />} checked={outcome[`outcome-6147adb7d8cd3e56f73fd12b`] === "submission" } label={`Submission`} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="decision" control={<Radio />} checked={outcome[`outcome-6147adb7d8cd3e56f73fd12b`] === "decision" } label={`Decision`} />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="draw" control={<Radio />} checked={outcome[`outcome-6147adb7d8cd3e56f73fd12b`] === "draw" } label={`Draw`} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="no contest" control={<Radio />} checked={outcome[`outcome-6147adb7d8cd3e56f73fd12b`] === "no contest" } label={`No Contest`} />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
          </Grid>
          </Grid>
          <Button variant="contained" onClick={()=>addPick("6147adb7d8cd3e56f73fd12b")} color="primary">Add Pick</Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper>
          <Grid container spacing={1}>
            <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Pick Fighter</FormLabel>
              <RadioGroup
                aria-label="fighter"
                defaultValue={fighter.val}
                name="fighter-6147c38e4e8a0c53b5c0680c"
                onChange={(e)=>handleChange("fighter", e)}
              >
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="6061528f92885e854969cb39" checked={fighter[`fighter-6147c38e4e8a0c53b5c0680c`] === "6061528f92885e854969cb39"} control={<Radio />} label={`Valentina "Bullet" Shevchenko`} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="61450009fea31ef33305c52e" checked={fighter[`fighter-6147c38e4e8a0c53b5c0680c`] === "61450009fea31ef33305c52e"} control={<Radio />} label={`Lauren "Lucky" Murphy`} />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Pick Round</FormLabel>
              <RadioGroup
                aria-label="rounds"
                defaultValue={round.val}
                name="round-6147c38e4e8a0c53b5c0680c"
                onChange={(e)=>handleChange("round", e)}
              >
              <Grid container>
                <Grid item xs={12} md={2}>
                  <FormControlLabel value="1" control={<Radio />} checked={round[`round-6147c38e4e8a0c53b5c0680c`] === "1"} label={`Round 1`} />
                </Grid>
                <Grid item xs={12} md={2}>
                <FormControlLabel value="2" control={<Radio />} checked={round[`round-6147c38e4e8a0c53b5c0680c`] === "2"} label={`Round 2`} />
                </Grid>
                <Grid item xs={12} md={2}>
                <FormControlLabel value="3" control={<Radio />} checked={round[`round-6147c38e4e8a0c53b5c0680c`] === "3"} label={`Round 3`} />
                </Grid>
                <Grid item xs={12} md={2}>
                <FormControlLabel value="4" control={<Radio />} checked={round[`round-6147c38e4e8a0c53b5c0680c`] === "4"} label={`Round 4`} />
                </Grid>
                <Grid item xs={12} md={2}>
                <FormControlLabel value="5" control={<Radio />} checked={round[`round-6147c38e4e8a0c53b5c0680c`] === "5"} label={`Round 5`} />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
          </Grid>
          <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Pick Fight Outcome</FormLabel>
              <RadioGroup
                aria-label="outcome"
                defaultValue={outcome.val}
                name="outcome-6147c38e4e8a0c53b5c0680c"
                onChange={(e)=>handleChange("outcome", e)}
              >
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="knockout" control={<Radio />} checked={outcome[`outcome-6147c38e4e8a0c53b5c0680c`] === "knockout"} label={`Knockout`} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="technical knockout" control={<Radio />} checked={outcome[`outcome-6147c38e4e8a0c53b5c0680c`] === "technical knockout"} label={`Technical Knockout`} />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="submission" control={<Radio />} checked={outcome[`outcome-6147c38e4e8a0c53b5c0680c`] === "submission"} label={`Submission`} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="decision" control={<Radio />} checked={outcome[`outcome-6147c38e4e8a0c53b5c0680c`] === "decision"} label={`Decision`} />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="draw" control={<Radio />} checked={outcome[`outcome-6147c38e4e8a0c53b5c0680c`] === "draw"} label={`Draw`} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel value="no contest" control={<Radio />} checked={outcome[`outcome-6147c38e4e8a0c53b5c0680c`] === "no contest"} label={`No Contest`} />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
          </Grid>
          </Grid>
          <Button variant="contained" onClick={()=>addPick("6147c38e4e8a0c53b5c0680c")} color="primary">Add Pick</Button>
        </Paper>
      </Grid>
    </Grid>
      <Button color="primary" variant="contained" type="submit">Submit Picks</Button>
    </form>
    </Container>
  )
}

export default Picks
