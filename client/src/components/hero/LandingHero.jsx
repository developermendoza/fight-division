import { useStyles } from './styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
function LandingHero() {
  const matches = useMediaQuery('(min-width:600px)');

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.image}>
        <Container>
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
