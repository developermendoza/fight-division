import { Container } from "@material-ui/core"
import { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import Paper from '@material-ui/core/Paper';
import Countdown from "react-countdown";
import moment from "moment";
import MainEventMatch from "../matches/MainEventMatch";

// Random component
const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ days ,hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span>{days}:{hours}:{minutes}:{seconds}</span>;
  }
};

function UpcomingEvent({upcomingEvent, mainEvent}) {
const [ event, setEvent ] = useState();
const [ match, setMatch ] = useState();
const classes = useStyles();




useEffect(() => {
  if(upcomingEvent){
    setEvent(upcomingEvent)
  }

  if(mainEvent){
    setMatch(mainEvent)
  }
},[upcomingEvent, mainEvent, match]);

const eventDate = (event) => {
  if(event.earlyPrelimTime){
    return event.earlyPrelimTime
  }else if(!event.earlyPrelimTime && event.prelimTime){
    return event.prelimTime
  }else{
    return event.mainCardTime;
  }
}

  return (
    <Container>
      <Paper className="paper" >
      <Grid container spacing={2} className="section">
          <Grid item  md={3}>
            <h2 className={`${classes.eventTitle} primary-text-color`}>{event? event.name.toUpperCase(): <>No event</>}</h2>
            <p className={classes.subText}>{ event? moment(event.date).format('dddd, MMMM DD YYYY') : <>No Event Date</>}</p>
          </Grid>
          {match ? <MainEventMatch match={match} />  : <>Loading...</>}
        <Grid item  md={3}>
          <h2 className={classes.eventCounterText}>COUNTDOWN</h2>
            <div> {event ?<><p className={`${classes.eventCounter} primary-text-color`}>{<Countdown
            date={eventDate(event)}
            renderer={renderer}
          />}</p><p className={classes.subText}>DAYS | HRS | MINS | SECS</p></> :<><p className={`${classes.eventCounter} primary-text-color`}>&#8734; : &#8734; : &#8734; : &#8734;</p><p className={classes.subText}>DAYS | HRS | MINS | SECS</p></>}</div>
        </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default UpcomingEvent
