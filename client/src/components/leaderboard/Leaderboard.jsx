import { Container, Paper, Grid, Avatar } from '@material-ui/core'
import React, { useEffect } from 'react';
import { useStyles } from './styles';
import { useDispatch, useSelector } from "react-redux"
import { getTopTenUsers } from "../../actions/users";

function Leaderboard({toptenUsers}) {
  // const dispatch = useDispatch();
  // const topTenUsers = useSelector(state => state.users.data)

  // useEffect(() => {
  //   dispatch(getTopTenUsers())
  // }, [dispatch]);

  // useEffect(() => {
  //   if(topTenUsers){
  //     console.log("topTenUsers: ", topTenUsers)
  //   }
  // }, [topTenUsers])

  const classes = useStyles();

  
  console.log("toptenUsers: ", toptenUsers)
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
          {toptenUsers ? toptenUsers.slice(0, 5).map( (user, i) => <Paper elevation={3} className={classes.user}>
              <Grid container  alignItems="center" justifyContent="space-between">
                <Grid item md={6} className={classes.userName}>
                  <p className={user.userRank}>{++i}</p>
                  <Avatar variant="circular" className={classes.userImage} src={user?.image}/>
                  <p>{user.username}</p>
                </Grid>
                <Grid item md={6} className={classes.userPointsContainer}>
                  <p>{user.totalPoints} <span className={classes.userPoints}>POINTS</span></p>
                </Grid>
              </Grid>
            </Paper> )  : <div>no users found</div>  }
          </Grid>
          <Grid item xs={12} md={6}>
          {toptenUsers ? toptenUsers.slice(5, 10).map( (user, j) => <Paper elevation={3} className={classes.user}>
              <Grid container  alignItems="center" justifyContent="space-between">
                <Grid item md={6} className={classes.userName}>
                  <p className={user.userRank}>{j + 6}</p>
                  <Avatar variant="circular" className={classes.userImage} src={user?.image}/>
                  <p>{user.username}</p>
                </Grid>
                <Grid item md={6} className={classes.userPointsContainer}>
                  <p>{user.totalPoints} <span className={classes.userPoints}>POINTS</span></p>
                </Grid>
              </Grid>
            </Paper> )  : <div>no users found</div>  }
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Leaderboard
