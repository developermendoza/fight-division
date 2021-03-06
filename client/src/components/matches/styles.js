import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  match:{
    backgroundColor:"#262626",
    padding: "10px",
    display:"flex",
    margin: "10px",
    color:"white"
  },
  fighterRecord:{
    color:"grey"
  },
  fighter:{
    backgroundColor:"grey"
  },
  fighterInfo:{
    marginLeft:"10px",
    marginRight:"10px"
  },

  odds:{
    color:"#68bbe5",
    fontWeight:"bold"
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
}));