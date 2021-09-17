import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    color:"white",
  },
  image: {
    backgroundImage: 'url(images/hero/landing-hero.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height:"500px",
    width:"100%",
    display:"flex",
    alignItems:"center"
  },
}));