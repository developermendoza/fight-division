import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    width: '100%',
  },

  imageItem: {
    display: "flex",
    margin: "10px 0"
  },
  imageContainer:{
    display:"flex",
    justifyContent:"center"
  },
  userImage:{
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    boxShadow: "0 0 50px #ccc"
  },

  // imageItemBtnWrapper: {
  //   display: "flex",
  //   flexDirection: "column",
  //   marginLeft: "10px",
  // },
  uploadImageWrapper:{
    // background: "grey",
    border: "6px dotted grey",
    textAlign: "center",
    height: "250px",
    display: "flex",
    flexDirection:"column",
    justifyContent: "center",
    alignItems: "center",
    transition:"all .4s",
    position:"relative",
  },
  imageUploadButton:{
    marginTop: "20px",
    zIndex:"3"
  //  marginBottom: "-60px"
  },

  imageWrapper:{
    position: "absolute",
    bottom: "0",
    left:"0",
    right:"0",
    top: "20%",
    zIndex:"2"
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center"
  }
}));