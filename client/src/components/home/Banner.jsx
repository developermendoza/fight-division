import React from 'react'
import { Button, Container, Grid } from "@material-ui/core"
import Paper from '@material-ui/core/Paper';
import { Link, useHistory, useLocation } from "react-router-dom";
import { useStyles } from './styles';

function Banner() {
  const classes = useStyles();
  return (
    <section className={`section ${classes.banner}`}>
    <Container>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center">
        <Grid item md="5">
          <h2 className={classes.title}>Become #1 Fighting Division King</h2>
          <p className={classes.subTitle}>Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software.</p>
          <Button component={Link} to="/register" color="inherit" className={`btn btn-secondary ${classes.button}`}>Join Now</Button>
        </Grid>
        <Grid item md="5">
          <img className={classes.bannerImg} src="images/banner/banner.png" alt="" />
        </Grid>
      </Grid>
    </Container>
    </section>
  )
}

export default Banner
