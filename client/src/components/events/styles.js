import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    color:"white",
  },
  eventTitle: {
    fontSize:"55px"
  },
  subText:{
    color:"#7D7D7D",
    fontSize:"16px",
    letterSpacing:"1px"
  },
  mainEventFighters:{
    fontSize:"24px",
    fontWeight: "bold"
  },
  eventCounter:{
    fontSize:"35px",
    fontWeight:"bold",
    letterSpacing: "4px"
  },
  eventCounterText:{
    letterSpacing:"4px"
  }
}));