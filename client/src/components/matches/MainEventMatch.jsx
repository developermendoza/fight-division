import Grid from '@material-ui/core/Grid';
import { useStyles } from './styles';
import moment from "moment";
import {Skeleton} from '@material-ui/lab';
import { Typography } from '@material-ui/core';

function MainEventMatch({mainEvent, upcomingEvent,upcomingEventLoading, mainEventLoading}) {
 const classes = useStyles();

  return (
    <Grid item  md={6}>
        <Typography  variant="h4">
          {mainEventLoading ? <Skeleton variant="rect" width={200} height={40} style={{backgroundColor:"grey"}}/> : `${mainEvent?.fighter1?.lastname.toUpperCase()} VS ${mainEvent?.fighter2?.lastname.toUpperCase()}` }
        </Typography>
        <div style={{fontSize:"16px", fontWeight:"bold"}}>
        <Typography className={classes.subText}>
          {upcomingEventLoading ? <Skeleton variant="rect" width={200} height={20} style={{backgroundColor:"grey"}}/> : upcomingEvent?.venue }
        </Typography>
        <Typography className={classes.subText}>
          {upcomingEventLoading ? <Skeleton variant="rect" width={250} height={20}  style={{backgroundColor:"grey"}}/> : upcomingEvent?.location }
        </Typography>
        <Typography>
          {upcomingEventLoading? <Skeleton width={250} height={20} style={{backgroundColor:"grey"}}/> : <>Maincard:  <span style={{fontWeight:"bold"}} className="primary-text-color">{moment(upcomingEvent.mainCardTime).format('LT')}</span></>}
        </Typography>
        <Typography>
          {upcomingEventLoading? <Skeleton width={250} height={20} style={{backgroundColor:"grey"}}/> : <>Prelims:  <span style={{fontWeight:"bold"}} className="primary-text-color"> {moment(upcomingEvent.prelimTime).format('LT')}</span></>}
        </Typography>
        </div>
    </Grid>
  )
}

export default MainEventMatch
