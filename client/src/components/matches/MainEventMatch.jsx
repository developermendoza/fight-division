import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';

function MainEventMatch({match}) {
 const classes = useStyles();

  return (
    <Grid item  md={6}>
        <p className={classes.mainEventFighters}>{ match? <>{match.fighter1.lastname.toUpperCase()} VS {match.fighter2.lastname.toUpperCase()}</> : <>No fighters available</> }</p>
        <p className={classes.subText}>{match?<>{match.event.venue}</>:<>No venue available</>}</p>
        <p className={classes.subText}>{match? <>{match.event.location}</>:<>No location availble</>}</p>
    </Grid>
  )
}

export default MainEventMatch
