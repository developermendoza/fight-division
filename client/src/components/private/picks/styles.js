import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  match:{
    backgroundColor:"#1E1E1E"
  },

  fighter:{
    // margin:"10px",
    padding:"20px 5px",
    position:"relative",
    backgroundColor: "#404040",
    color: "#CBCBCB",
    display:"flex",
    // height: "90px",
    fontSize:"12px",
    alignItems:"center",
    fontWeight:"bold",
    borderRadius: "9px",
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    cursor:"pointer",
    justifyContent:"center"
  },
  // fighter1:{
  //   justifyContent:"start"
  // },
  
  // fighter2:{
  //   justifyContent:"end"
  // },


  rank:{
    display:"block", 
    height:"25px",
    width:"25px",
    backgroundColor:"#2A2929",
    color:"#F46B26",
    borderRadius:"50%",
    lineHeight:"25px"
  },

  fighterName:{
    display:"flex",
    alignItems:"center",
    margin: "0 5px"
  },
  [theme.breakpoints.up('md')]: {
    backgroundColor: 'red',
  },

  round:{
    display:"flex",
    borderRadius: "8PX",
    height: "50px",
    justifyContent:"center",
    alignItems:"center",
    color:"#cbcbcb",
    fontWeight:"bold",
    backgroundColor: "#404040",
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    fontSize:"12px",
    cursor:"pointer",
    textAlign:"center",
    padding: "0 15px"
  },

  outcome:{
    display:"flex",
    borderRadius: "8PX",
    height: "50px",
    justifyContent:"center",
    alignItems:"center",
    color:"#cbcbcb",
    fontWeight:"bold",
    backgroundColor: "#404040",
    boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
    fontSize:"12px",
    position:"relative",
    cursor:"pointer",
    textAlign:"center"
  },

  odds:{
    position:"absolute",
    color:"#78DFFF",
    backgroundColor:"#2A2929",
    padding:"2px 5px", 
    borderRadius:"5px"
  },

  formLabel:{
    color:"#DFDFDF", 
    fontStyle:"italic", 
    textAlign:"center", 
    padding:"10px", 
    fontWeight:"bold"
  },
  fighterImage:{
    width: "50px", 
    height:"50px"
  },
  fighterNameContainer:{
    textAlign:"center", 
    padding:"5px"
  },

  radioButtons:{
    visibility:"hidden", 
    position:"absolute"
  },

  matchPickBtnContainer:{
    padding: "30px 0 20px 0", 
    textAlign:"center",
    display:"flex",
    justifyContent:"space-around"
  },

  matchPickBtn:{
    backgroundColor:"#00e676",
    fontWeight:"bold",
    color:"#1E1E1E"
  },

  matchClearBtn:{
    backgroundColor:"#fff59d",
    fontWeight:"bold",
    color:"#1E1E1E"
  },
  
}));