import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  footer: {
    borderRadius:"0",
    marginTop:"80px",
    color:"grey",
    paddingTop: "40px"
  },
  title:{
    color:"white",
    marginBottom:"20px"
  },

  description:{
    lineHeight:"25px"
  },

  links:{
    color: "#FDF100",
    fontWeight: "bold",
    fontStyle:"italic"
  },

  footerSection:{
    marginBottom: "40px"
  },

  bottomFooter:{
    backgroundColor:"#262626",
    padding: "10px 0",
    color:"grey",
    textAlign:"center",
    fontStyle:"italic"
  }
}));