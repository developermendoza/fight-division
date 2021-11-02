import { useStyles } from './styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
function LandingHero({mainEvent}) {
  const matches = useMediaQuery('(min-width:600px)');

  const classes = useStyles();
  return (
    <div className={classes.root}>
    
      <div className={classes.image}>
      
        <Container>
        <Container maxWidth="lg" style={{top:"0",left:"0",zIndex:"-1" ,right:"0", display:"flex", position:"absolute", justifyContent:"center", textAlign:"center", margin:"auto"}}>
        </Container>

        <div className={classes.heroText} style={{width: matches  ? "40%" : "100%"}}>
          <h3 className="primary-text-color">LOREM IPSUM</h3>
          <h1>Underground Fighter</h1>
          <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, </p>
        </div>
        <br />
        <Button component={Link} to="/register" className="btn btn-secondary">Signup</Button>
        </Container>
      </div>
    </div>
  )
}

export default LandingHero
