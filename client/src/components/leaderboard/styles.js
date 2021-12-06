import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  trophy: {
    width:"100%",
    maxWidth: "3rem"
  },

  title:{
    fontSize: "2.5rem"
  },

 section:{
   padding: "40px 20px"
 },

 user:{
  backgroundColor:"#262626",
  marginBottom:"20px",
  padding: "20px",
  color: "grey"
 },

 userImage:{
   backgroundColor:"grey",
   margin: "0 10px"
 },

 userName:{
   display:"flex",
   alignItems:"center",
   color: "white",
   fontWeight:"bold",
   textTransform:"capitalize"
 },

 userPointsContainer:{
   textAlign:"right",
   color:"#68bbe5",
   fontWeight:"bold",
   fontSize:"18px"
 },

 userPoints:{
  color: "grey",
  fontWeight:"normal",
  fontSize:"14px"
 },

 userRank:{
   color:"grey"
 }

}));