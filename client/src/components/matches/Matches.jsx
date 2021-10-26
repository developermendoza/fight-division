import { Container, Grid, Paper } from "@material-ui/core";
import { useState,useEffect } from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useStyles } from './styles';
import Avatar from '@material-ui/core/Avatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {Skeleton} from '@material-ui/lab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


function Matches({matches}) {
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const queryMatches = useMediaQuery('(min-width:960px)');
  const [ allMatches, setAllMatches ] = useState()
  const handleChange = (event,newValue) => {
    console.log("event: ", event)
    console.log("newValue: ", newValue)
    setValue(newValue);
  };


  useEffect(() => {
    if(matches.data){
      setAllMatches(matches.data)
    }
  }, [matches])

console.log("matches: ", matches)
  return (
    <Container>
      <Paper className="paper">
        <Grid container spacing={3} className="section">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="All Matches" {...a11yProps(0)} />
              <Tab label="Main Card" {...a11yProps(1)} />
              <Tab label="Prelims" {...a11yProps(2)} />
              <Tab label="Early Prelims" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel  value={value} index={0}>
          {/* <Grid container spacing={2}>  */}
          {matches.fetchInProgress ? <Grid container  spacing={2}> {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map(grid => (
            <Grid item  xs={12} md={6} >
          <Skeleton style={{background:"grey"}} height="100px" /> 
          
          </Grid> ))}</Grid>  : allMatches?.map( match => 
            <Grid container key={match.matchOrder}>
                <Grid item  xs={12} md={6}>
                  <Paper elevation={3} style={{justifyContent:"space-between", alignItems:"center"}} className={`${classes.match} ${classes.fighter1}`}>
                  <div style={{display:"flex"}}>
                  <Avatar variant="circular" className={classes.fighter} src={match.fighter1.image} />
                    <div className={`${classes.fighterInfo} ${classes.fighter1Info}`}>
                      <p>{match.fighter1.firstname} {match.fighter1.nickname ? `"${match.fighter1.nickname}"` : ""} {match.fighter1.lastname}</p>
                      <p className={classes.fighterRecord}>{match.fighter1.wins}-{match.fighter1.losses}-{match.fighter1.draws}</p>
                    </div>
                  </div>
                    <p className={classes.odds}>{match.fighter1_odds}</p>
                  </Paper>
                </Grid>
                <Grid item  xs={12} md={6} >
                  <Paper style={{alignItems:"center", justifyContent:"space-between",flexDirection: queryMatches ? "row" : "row-reverse", textAlign: queryMatches ? "right" : "left" }} className={`${classes.match}`}>
                  <p className={classes.odds}>{match.fighter2_odds}</p>
                  <div style={{display:"flex", flexDirection: queryMatches ?"row":"row-reverse"}}>
                    <div className={`${classes.fighterInfo} ${classes.fighter2Info}`}>
                      <p>{match.fighter2.firstname} {match.fighter2.nickname ? `"${match.fighter2.nickname}"` : ""}  {match.fighter2.lastname}</p>
                      <p className={classes.fighterRecord}>{match.fighter2.wins}-{match.fighter2.losses}-{match.fighter2.draws}</p>
                    </div>
                    <Avatar variant="circular" className={classes.fighter} src={match.fighter2.image} />
                  </div>
                  </Paper>
                </Grid>
              </Grid>
              )}
              </TabPanel>
            {/* {allMatches ? allMatches.map( match => 
            <Grid container key={match.matchOrder}>
                <Grid item  xs={12} md={6}>
                  <Paper elevation={3} style={{justifyContent:"space-between", alignItems:"center"}} className={`${classes.match} ${classes.fighter1}`}>
                  <div style={{display:"flex"}}>
                  <Avatar variant="circular" className={classes.fighter} src={match.fighter1.image} />
                    <div className={`${classes.fighterInfo} ${classes.fighter1Info}`}>
                      <p>{match.fighter1.firstname} {match.fighter1.nickname ? `"${match.fighter1.nickname}"` : ""} {match.fighter1.lastname}</p>
                      <p className={classes.fighterRecord}>{match.fighter1.wins}-{match.fighter1.losses}-{match.fighter1.draws}</p>
                    </div>
                  </div>
                    <p className={classes.odds}>{match.fighter1_odds}</p>
                  </Paper>
                </Grid>
                <Grid item  xs={12} md={6} >
                  <Paper style={{alignItems:"center", justifyContent:"space-between",flexDirection: queryMatches ? "row" : "row-reverse", textAlign: queryMatches ? "right" : "left" }} className={`${classes.match}`}>
                  <p className={classes.odds}>{match.fighter2_odds}</p>
                  <div style={{display:"flex", flexDirection: queryMatches ?"row":"row-reverse"}}>
                    <div className={`${classes.fighterInfo} ${classes.fighter2Info}`}>
                      <p>{match.fighter2.firstname} {match.fighter2.nickname ? `"${match.fighter2.nickname}"` : ""}  {match.fighter2.lastname}</p>
                      <p className={classes.fighterRecord}>{match.fighter2.wins}-{match.fighter2.losses}-{match.fighter2.draws}</p>
                    </div>
                    <Avatar variant="circular" className={classes.fighter} src={match.fighter2.image} />
                  </div>
                  </Paper>
                </Grid>
              </Grid>) : <>No Matches Available</>} */}
          
          <TabPanel value={value} index={1}>
              {allMatches ? allMatches.map( match =>
                match.isMainCardFight && <Grid container key={match.matchOrder}>
                <Grid item  xs={12} md={6} >
                <Paper elevation={3} style={{justifyContent:"space-between", alignItems:"center"}} className={`${classes.match} ${classes.fighter1}`}>
                  <div style={{display:"flex"}}>
                  <Avatar variant="circular" className={classes.fighter} src={match.fighter1.image} />
                    <div className={`${classes.fighterInfo} ${classes.fighter1Info}`}>
                      <p>{match.fighter1.firstname} {match.fighter1.nickname ? `"${match.fighter1.nickname}"` : ""} {match.fighter1.lastname}</p>
                      <p className={classes.fighterRecord}>{match.fighter1.wins}-{match.fighter1.losses}-{match.fighter1.draws}</p>
                    </div>
                  </div>
                    <p className={classes.odds}>{match.fighter1_odds}</p>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} >
                <Paper style={{alignItems:"center", justifyContent:"space-between",flexDirection: queryMatches ? "row" : "row-reverse", textAlign: queryMatches ? "right" : "left" }} className={`${classes.match}`}>
                  <p className={classes.odds}>{match.fighter2_odds}</p>
                  <div style={{display:"flex", flexDirection: queryMatches ?"row":"row-reverse"}}>
                  <div className={`${classes.fighterInfo} ${classes.fighter2Info}`}>
                      <p>{match.fighter2.firstname} {match.fighter2.nickname ? `"${match.fighter2.nickname}"` : ""}  {match.fighter2.lastname}</p>
                      <p className={classes.fighterRecord}>{match.fighter2.wins}-{match.fighter2.losses}-{match.fighter2.draws}</p>
                    </div>
                    <Avatar variant="circular" className={classes.fighter} src={match.fighter2.image} />
                  </div>
                  </Paper>
                </Grid>
              </Grid>): <>No Matches Available</>}
          </TabPanel>
          <TabPanel value={value} index={2}>
              {allMatches ? allMatches.map( match => match.isPrelimFight &&
                  <Grid container key={match.matchOrder}>
                <Grid item xs={12} md={6} >
                <Paper elevation={3} style={{justifyContent:"space-between", alignItems:"center"}} className={`${classes.match} ${classes.fighter1}`}>
                  <div style={{display:"flex"}}>
                  <Avatar variant="circular" className={classes.fighter} src={match.fighter1.image} />
                    <div className={`${classes.fighterInfo} ${classes.fighter1Info}`}>
                      <p>{match.fighter1.firstname} {match.fighter1.nickname ? `"${match.fighter1.nickname}"` : ""}  {match.fighter1.lastname}</p>
                      <p className={classes.fighterRecord}>{match.fighter1.wins}-{match.fighter1.losses}-{match.fighter1.draws}</p>
                    </div>
                  </div>
                    <p className={classes.odds}>{match.fighter1_odds}</p>
                  </Paper>
                </Grid>
                <Grid item  xs={12} md={6} >
                <Paper style={{alignItems:"center", justifyContent:"space-between",flexDirection: queryMatches ? "row" : "row-reverse", textAlign: queryMatches ? "right" : "left" }} className={`${classes.match}`}>
                  <p className={classes.odds}>{match.fighter2_odds}</p>
                  <div style={{display:"flex", flexDirection: queryMatches ?"row":"row-reverse"}}>
                  <div className={`${classes.fighterInfo} ${classes.fighter2Info}`}>
                      <p>{match.fighter2.firstname} {match.fighter2.nickname ? `"${match.fighter2.nickname}"` : ""}  {match.fighter2.lastname}</p>
                      <p className={classes.fighterRecord}>{match.fighter2.wins}-{match.fighter2.losses}-{match.fighter2.draws}</p>
                    </div>
                    <Avatar variant="circular" className={classes.fighter} src={match.fighter2.image} />
                  </div>
                  </Paper>
                </Grid>
              </Grid>): <>No Matches Available</>}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {allMatches ? allMatches.map( match => match.isEarlyPrilimFight &&
              <Grid container key={match.matchOrder}>
                <Grid item xs={12} md={6} >
                <Paper elevation={3} style={{justifyContent:"space-between", alignItems:"center"}} className={`${classes.match} ${classes.fighter1}`}>
                  <div style={{display:"flex"}}>
                  <Avatar variant="circular" className={classes.fighter} src={match.fighter1.image} />
                    <div className={`${classes.fighterInfo} ${classes.fighter1Info}`}>
                      <p>{match.fighter1.firstname} {match.fighter1.nickname ? `"${match.fighter1.nickname}"` : ""}  {match.fighter1.lastname}</p>
                      <p className={classes.fighterRecord}>{match.fighter1.firstname} {match.fighter1.nickname ? `"${match.fighter1.nickname}"` : ""} {match.fighter1.lastname}</p>
                    </div>
                  </div>
                    <p className={classes.odds}>{match.fighter1_odds}</p>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={6} >
                <Paper style={{alignItems:"center", justifyContent:"space-between",flexDirection: queryMatches ? "row" : "row-reverse", textAlign: queryMatches ? "right" : "left" }} className={`${classes.match}`}>
                  <p className={classes.odds}>{match.fighter2_odds}</p>
                  <div style={{display:"flex", flexDirection: queryMatches ?"row":"row-reverse"}}>
                  <div className={`${classes.fighterInfo} ${classes.fighter2Info}`}>
                      <p>{match.fighter2.firstname} {match.fighter2.nickname ? `"${match.fighter2.nickname}"` : ""}  {match.fighter2.lastname}</p>
                      <p className={classes.fighterRecord}>{match.fighter2.wins}-{match.fighter2.losses}-{match.fighter2.draws}</p>
                    </div>
                    <Avatar variant="circular" className={classes.fighter} src={match.fighter2.image} />
                  </div>
                  </Paper>
                </Grid>
              </Grid>): <>No Matches Available</>}
          </TabPanel>
        </Box>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Matches
