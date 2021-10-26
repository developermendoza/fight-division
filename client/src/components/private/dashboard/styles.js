import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  box:{
    backgroundColor:"#1E1E1E", 
    border:"1px solid #313131", 
    fontWeight:"bold"
  },

  avatar:{
    width:"80px", height:"75px"
  },

  iconGrid:{
    borderRight:"1px solid #313131", display:"flex", padding:"0 20px", justifyContent:"space-between",alignItems:"center",height:"120px",borderBottom:"1px solid #313131",color:"#808080"
  },

  iconGrid2:{
    borderRight:"1px solid #313131",padding:"20px", fontSize:"10px",height:"80px",borderBottom:"1px solid #313131", color:"#808080"
  },

  grid:{
    borderRight:"1px solid #313131", fontSize:"10px", padding:"20px", borderBottom:"1px solid #313131", color:"#808080", display:"flex", justifyContent:"space-between",alignItems:"start",height:"80px"
  },

  editButton:{
    border: "1px solid #313131",backgroundColor:"transparent", color:"grey" , padding:"5px 15px", borderRadius:"6px"
  },

  deleteButton:{
    border: "1px solid #313131",backgroundColor:"transparent", color:"grey" ,padding:"5px 15px", borderRadius:"6px", marginLeft:"20px"
  },

  buttonContainer:{
    color:"#313131", display:"flex", alignItems:"center", alignSelf:"flex-start", paddingTop:"20px"
  },

  buttonContainer2:{
    color:"#313131", display:"flex", alignItems:"center", alignSelf:"flex-start"
  },

  userName:{
    textAlign:"center", fontSize:"50px", color:"#818AFF"
  },

  textContainer:{
    lineHeight:"23px"
  },

  text:{
    fontSize:"20px", color:"white"
  }
}));