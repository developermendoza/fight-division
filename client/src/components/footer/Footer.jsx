import { Container, Grid } from '@material-ui/core'
import React from 'react'
import { useStyles } from './styles';
import { Link, useHistory, useLocation,useParams } from "react-router-dom";

function Footer() {
  const classes = useStyles();
  const location = useLocation();

  if (location.pathname === "/admin" || location.pathname === `/admin/events` || location.pathname === `/admin/fighters` || location.pathname === `/admin/matches`) return null


  return (
    <>
    <footer className={`section ${classes.footer}`}>
      <Container>
        <Grid container space={2} justify="space-between">
          <Grid className={classes.footerSection} item xs={12} md={3}>
          <img style={{width:"200px"}} src="./images/logo-icon.png" alt="" />
            <p className={classes.description}> It was <Link style={{color:"grey"}} to="/admin">popularised</Link> in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </Grid>
          <Grid className={classes.footerSection} item xs={12} md={2}>
            <h4 className={classes.title}>EXPLORE</h4>
            <ul className={classes.description}>
              <li>Home</li>
              <li>Upcoming Event</li>
              <li>About</li>
              <li>Leaderboard</li>
            </ul>
          </Grid>
          <Grid className={classes.footerSection} item xs={12} md={2}>
            <h4 className={classes.title}>CONTACT</h4>
            <ul>
              <li>fightdivision@gmail.com</li>
            </ul>
          </Grid>
          <Grid className={classes.footerSection} item xs={12} md={2}>
            <h4 className={classes.title}>JOIN</h4>
            <Link className={classes.links} to="/register">Register</Link><span> | </span>
            <Link className={classes.links} to="/login">Login</Link>
          </Grid>
        </Grid>
      </Container>
      
    </footer>
    <div className={classes.bottomFooter}>
    <Container>
      <small>&copy; 2021 All rights reserved. <span>Fight Division</span></small>
    </Container>
    </div>
    </>
  )
}

export default Footer
