import { Container } from "@material-ui/core"
import { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import Paper from '@material-ui/core/Paper';
import Countdown from "react-countdown";
import moment from "moment";
import {Typography} from '@material-ui/core';
import {Skeleton} from '@material-ui/lab';
// import { makeStyles } from '@material-ui/core/styles';


import MainEventMatch from "../matches/MainEventMatch";

function UpcomingEvent({upcomingEvent, upcomingEventLoading, mainEvent, mainEventLoading}) {
const classes = useStyles();


// Random component
const Completionist = () => <span>Event is in progress</span>;

// Renderer callback with condition
const renderer = ({days, hours, minutes, seconds, completed }) => {

  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <div style={{textAlign:"center"}}>
      <div className="primary-text-color" style={{display:"flex", justifyContent:"space-evenly"}}>
        <h3>{days}</h3>
        <h3>:</h3>
        <h3>{hours}</h3>
        <h3>:</h3>
        <h3>{minutes}</h3>
        <h3>:</h3>
        <h3>{seconds}</h3>
      </div>
      <div style={{display:"flex", justifyContent:"space-around", color:"grey"}}>
        <h4>DAYS</h4>
        <h4>HRS</h4>
        <h4>MINS</h4>
        <h4>SECS</h4>
      </div>
    </div>
  }
};

  return (
    <Container>
      <Paper className="paper" >
      <Grid container spacing={2} className="section">
          <Grid item  md={3}>
          <Typography variant="h2" style={{textTransform:"uppercase"}} className={`${classes.eventTitle} primary-text-color`}>
            {upcomingEventLoading ? <Skeleton style={{background:"grey"}} /> : upcomingEvent.name}
          </Typography>
          <Typography variant="p" className={classes.subText}>
            {upcomingEventLoading ? <Skeleton style={{background:"grey"}} /> : moment(upcomingEvent.date).format('dddd, MMMM DD YYYY') }
          </Typography>
          </Grid>
         <MainEventMatch mainEvent={mainEvent} upcomingEvent={upcomingEvent} upcomingEventLoading={upcomingEventLoading} mainEventLoading={mainEventLoading}/>
        <Grid item style={{textAlign:"center"}}  md={3}>
          <h2 className={classes.eventCounterText}>COUNTDOWN</h2>
          {!upcomingEvent.date ? <Skeleton style={{background:"grey"}} /> : <Countdown
          date={upcomingEvent.earlyPrelimTime || upcomingEvent.prelimTime || upcomingEvent.mainCardTime || upcomingEvent.date} 
          renderer={renderer}
          /> }
        </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default UpcomingEvent
