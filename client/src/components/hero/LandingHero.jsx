import { useStyles } from './styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';
import Grow from '@material-ui/core/Grow';
import React, {useState, useEffect} from "react";

function HeroText(props){
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <div {...props}>
      <div className={classes.heroText} style={{width: matches  ? "40%" : "100%"}}>
          <h3 className="primary-text-color">PLAY TODAY</h3>
          <h1>Fight Division</h1>
          <p>Join to fight to become the best Fight Division member!</p>
        </div>
        <br />
        <Button component={Link} to="/register" className="btn btn-secondary">Signup</Button>
    </div>
  )
}
function LandingHero({mainEvent}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true)
  }, [])

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.image}>
        <Container>
        <Container maxWidth="lg" style={{top:"0",left:"0",zIndex:"-1" ,right:"0", display:"flex", position:"absolute", justifyContent:"center", textAlign:"center", margin:"auto"}}>
        </Container>
        <Grow direction="left" in={checked} mountOnEnter unmountOnExit>
        <HeroText/>
        </Grow>
        </Container>
      </div>
    </div>
  )
}

export default LandingHero
