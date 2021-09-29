import { Container, Paper, Grid, Avatar } from '@material-ui/core'
import React from 'react';
import { useStyles } from './styles';

function Leaderboard() {
  const classes = useStyles();
  return (
    <Container>
      <Paper className="paper">
        <Grid container spacing={2} className={`section ${classes.section}`} justifyContent="space-between">
          <Grid item>
            <h2 className={`primary-text-color ${classes.title}`}>LEADERBOARD</h2>
          </Grid>
          <Grid item>
            <img className={classes.trophy} src="images/icons/trophy.png" alt="trophy" />
          </Grid>
        </Grid>
      </Paper>

      <Paper className="paper">
        <Grid container spacing={2} className="section">
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className={classes.user}>
              <Grid container  alignItems="center" justifyContent="space-between">
                <Grid item md={6} className={classes.userName}>
                  <p className={classes.userRank}>1</p>
                  <Avatar variant="circular" className={classes.userImage} src="images/fighters/no-fighter.png" />
                  <p>User 1</p>
                </Grid>
                <Grid item md={6} className={classes.userPointsContainer}>
                  <p>108,525 <span className={classes.userPoints}>POINTS</span></p>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} className={classes.user}>
              <Grid container  alignItems="center" justifyContent="space-between">
                <Grid item md={6} className={classes.userName}>
                  <p className={classes.userRank}>2</p>
                  <Avatar variant="circular" className={classes.userImage} src="images/fighters/no-fighter.png" />
                  <p>User 2</p>
                </Grid>
                <Grid item md={6} className={classes.userPointsContainer}>
                  <p>108,525 <span className={classes.userPoints}>POINTS</span></p>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} className={classes.user}>
              <Grid container  alignItems="center" justifyContent="space-between">
                <Grid item md={6} className={classes.userName}>
                  <p className={classes.userRank}>3</p>
                  <Avatar variant="circular" className={classes.userImage} src="images/fighters/no-fighter.png" />
                  <p>User 3</p>
                </Grid>
                <Grid item md={6} className={classes.userPointsContainer}>
                  <p>108,525 <span className={classes.userPoints}>POINTS</span></p>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} className={classes.user}>
              <Grid container  alignItems="center" justifyContent="space-between">
                <Grid item md={6} className={classes.userName}>
                  <p className={classes.userRank}>4</p>
                  <Avatar variant="circular" className={classes.userImage} src="images/fighters/no-fighter.png" />
                  <p>User 4</p>
                </Grid>
                <Grid item md={6} className={classes.userPointsContainer}>
                  <p>108,525 <span className={classes.userPoints}>POINTS</span></p>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} className={classes.user}>
              <Grid container  alignItems="center" justifyContent="space-between">
                <Grid item md={6} className={classes.userName}>
                  <p className={classes.userRank}>5</p>
                  <Avatar variant="circular" className={classes.userImage} src="images/fighters/no-fighter.png" />
                  <p>User 5</p>
                </Grid>
                <Grid item md={6} className={classes.userPointsContainer}>
                  <p>108,525 <span className={classes.userPoints}>POINTS</span></p>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} className={classes.user}>
              <Grid container  alignItems="center" justifyContent="space-between">
                <Grid item md={6} className={classes.userName}>
                  <p className={classes.userRank}>6</p>
                  <Avatar variant="circular" className={classes.userImage} src="images/fighters/no-fighter.png" />
                  <p>User 6</p>
                </Grid>
                <Grid item md={6} className={classes.userPointsContainer}>
                  <p>108,525 <span className={classes.userPoints}>POINTS</span></p>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} className={classes.user}>
              <Grid container  alignItems="center" justifyContent="space-between">
                <Grid item md={6} className={classes.userName}>
                  <p className={classes.userRank}>7</p>
                  <Avatar variant="circular" className={classes.userImage} src="images/fighters/no-fighter.png" />
                  <p>User 7</p>
                </Grid>
                <Grid item md={6} className={classes.userPointsContainer}>
                  <p>108,525 <span className={classes.userPoints}>POINTS</span></p>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} className={classes.user}>
              <Grid container  alignItems="center" justifyContent="space-between">
                <Grid item md={6} className={classes.userName}>
                  <p className={classes.userRank}>8</p>
                  <Avatar variant="circular" className={classes.userImage} src="images/fighters/no-fighter.png" />
                  <p>User 8</p>
                </Grid>
                <Grid item md={6} className={classes.userPointsContainer}>
                  <p>108,525 <span className={classes.userPoints}>POINTS</span></p>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} className={classes.user}>
              <Grid container  alignItems="center" justifyContent="space-between">
                <Grid item md={6} className={classes.userName}>
                  <p className={classes.userRank}>9</p>
                  <Avatar variant="circular" className={classes.userImage} src="images/fighters/no-fighter.png" />
                  <p>User 9</p>
                </Grid>
                <Grid item md={6} className={classes.userPointsContainer}>
                  <p>108,525 <span className={classes.userPoints}>POINTS</span></p>
                </Grid>
              </Grid>
            </Paper>
            <Paper elevation={3} className={classes.user}>
              <Grid container  alignItems="center" justifyContent="space-between">
                <Grid item md={6} className={classes.userName}>
                  <p className={classes.userRank}>10</p>
                  <Avatar variant="circular" className={classes.userImage} src="images/fighters/no-fighter.png" />
                  <p>User 10</p>
                </Grid>
                <Grid item md={6} className={classes.userPointsContainer}>
                  <p>108,525 <span className={classes.userPoints}>POINTS</span></p>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Leaderboard
