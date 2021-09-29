import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  bannerImg: {
    width:"100%",
    maxWidth: "500px"
  },

  title:{
    fontSize: "3rem"
  },

  banner:{
    borderRadius: "0",
    margin:"80px 0"
  },

  subTitle:{
    color: "grey",
    padding: "20px 0",
    fontSize: "1.5rem"
  },

  button:{
    color: "black",
    fontSize: "1.2rem",
    padding: "5px 45px!important"
  }
}));