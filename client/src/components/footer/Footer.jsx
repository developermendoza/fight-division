import { Container, Grid } from '@material-ui/core'
import React from 'react'
import { useStyles } from './styles';

function Footer() {
  const classes = useStyles();
  return (
    <footer className={`section ${classes.footer}`}>
      <Container>
        <Grid container space={2} justifyContent="space-between">
          <Grid item xs={12} md={3}>
            <h4 className={classes.title}>Underground Fighter</h4>
            <p className={classes.description}> It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </Grid>
          <Grid item xs={12} md={2}>
            <h4 className={classes.title}>EXPLORE</h4>
            <ul className={classes.description}>
              <li>Home</li>
              <li>Upcoming Event</li>
              <li>About</li>
              <li>Leaderboard</li>
            </ul>
          </Grid>
          <Grid item xs={12} md={2}>
            <h4 className={classes.title}>CONTACT</h4>
            <ul>
              <li>undergroundfighter@gmail.com</li>
            </ul>
          </Grid>
          <Grid item xs={12} md={2}>
            <h4 className={classes.title}>JOIN</h4>
            <a className={classes.links} href="/register">Register</a><span> | </span>
            <a className={classes.links} href="/login">Login</a>
          </Grid>
        </Grid>
      </Container>
      <div>

      </div>
    </footer>
  )
}

export default Footer
