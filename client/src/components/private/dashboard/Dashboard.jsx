import { Container, Box, Avatar, Grid, Button} from "@material-ui/core";
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { useStyles } from './styles';
import moment from "moment";


function Dashboard() {
  const user = localStorage.getItem("authorized") ? JSON.parse(localStorage.getItem("authorized"))  : null;
  console.log("user: ", user.result)
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Box className={classes.box}>
        <Grid container>
          <Grid item xs={12} md={6}>
            <div className={classes.iconGrid}>
              <Avatar src={user.result.image} variant="rounded" className={classes.avatar}/>
              <div className={classes.buttonContainer}>
                <Button className={classes.editButton}><CreateOutlinedIcon /></Button>
                <Button className={classes.deleteButton}><DeleteForeverOutlinedIcon /></Button>
              </div>
            </div>
            <div className={classes.grid} >
              <div className={classes.textContainer}>
                <p>USERNAME</p>
                <p className={classes.text}>{user.result.username}</p>
              </div>
              <div className={classes.buttonContainer2}>
                <Button className={classes.editButton}><CreateOutlinedIcon /></Button>
              </div>
            </div>
            <div className={classes.grid}>
              <div className={classes.textContainer}>
                <p>EMAIL</p>
                <p className={classes.text}>{user.result.email}</p>
              </div>
              <div className={classes.buttonContainer2}>
                <Button className={classes.editButton}><CreateOutlinedIcon /></Button>
              </div>
            </div>
            <div className={classes.grid}>
              <div className={classes.textContainer}>
                <p>MEMBER SINCE</p>
                <p className={classes.text}>{moment(user.result.createdAt).format("MM/DD/YYYY")}</p>
              </div>
            </div>
            <div className={classes.grid}>
              <div className={classes.textContainer}>
                <p>WINNING PERCENTAGE</p>
                <p className={classes.text}>68%</p>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div className={classes.iconGrid2}>
              <p>RANK</p>
              <h2 className={classes.userName}>{user.result.rank}</h2>
            </div>
            <div className={classes.grid}>
              <div className={classes.textContainer}>
                <p>TOTAL POINTS</p>
                <p className={classes.text}>{user.result.totalPoints}</p>
              </div>
            </div>
            <div className={classes.grid}>
              <div className={classes.textContainer}>
                <p>FIGHTER PICKED TOTAL POINTS</p>
                <p className={classes.text}>105456</p>
              </div>
            </div>
            <div className={classes.grid}>
              <div className={classes.textContainer}>
                <p>ROUND PICKED TOTAL POINTS</p>
                <p className={classes.text}>{user.result.roundTotalPoints}</p>
              </div>
            </div>
            <div className={classes.grid}>
              <div className={classes.textContainer}>
                <p>OUTCOME PICKED TOTAL POINTS</p>
                <p className={classes.text}>{user.result.matchOutcomePoints}</p>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Dashboard
