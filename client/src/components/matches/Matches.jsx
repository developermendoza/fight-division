import { Container, Grid, Paper } from "@material-ui/core";
import { useState, useEffect } from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { useStyles } from './styles';
import Avatar from '@material-ui/core/Avatar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
// import {Stack} from '@material-ui/core';
// import { deepOrange } from '@material/material/colors'

let fighters = [
  {
    id:"1", 
    firstname:"Alexander",
    lastname:"Volkanovski",
    nickname:"The Great",
    wins:11,
    losses:2,
    draws:0,
    noContest:3,
    dq:null,
    weightID:"1",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"2", 
    firstname:"Brian",
    lastname:"Ortega",
    nickname:"T-City",
    wins:11,
    losses:2,
    draws:0,
    noContest:1,
    dq:null,
    weightID:"1",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"3", 
    firstname:"Valentina",
    lastname:"Shevchenko",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"2",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"4", 
    firstname:"Lauren",
    lastname:"Murphy",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"2",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"5", 
    firstname:"Nick",
    lastname:"Diaz",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"3",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"6", 
    firstname:"Robbie",
    lastname:"Lawler",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"3",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"7", 
    firstname:"Curtis",
    lastname:"Blaydes",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"4",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"8", 
    firstname:"Jairzinho",
    lastname:"Rozenstruik",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"4",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"9", 
    firstname:"Jéssica",
    lastname:"Andrade",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"5",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"10", 
    firstname:"Cynthia",
    lastname:"Calvillo",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"5",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"11", 
    firstname:"Marlon",
    lastname:"Moraes",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"6",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"12", 
    firstname:"Merab",
    lastname:"Dvalishvili",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"6",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"13", 
    firstname:"Dan",
    lastname:"Hooker",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"7",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"14", 
    firstname:"Nasrat",
    lastname:"Haqparast",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"7",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"15", 
    firstname:"Shamil",
    lastname:"Abdurakhimov",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"2",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"16", 
    firstname:"Chris",
    lastname:"Daukaus",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"2",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"17", 
    firstname:"Manon",
    lastname:"Fiorot",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"6",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"18", 
    firstname:"Mayra",
    lastname:"Bueno Silva",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"6",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"19", 
    firstname:"Karl",
    lastname:"Roberson",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"4",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"20", 
    firstname:"Nick",
    lastname:"Maximov",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"4",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"21", 
    firstname:"Matthew",
    lastname:"Semelsberger",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"6",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
  {
    id:"22", 
    firstname:"Martin",
    lastname:"Sano Jr",
    nickname:"Bigi Boy",
    wins:11,
    losses:2,
    draws:0,
    noContest:null,
    dq:null,
    weightID:"6",
    isChampion:false,
    rank:4,
    organizationID:"603bda4fe516b830d617cb3d",
    createdAt:"Fri Feb 26 2021",
    image:"no-fighter.png",
    updatedAt:"Wed May 05 2021 15:08:07 GMT-0700 (Pacific Daylight Time)"

  },
]

let weightClass = [
  {
    id:"1",
    name:"strawweight",
    pounds: "115lbs"
  },
  {
    id:"2",
    name:"flyweight",
    pounds: "125lbs"

  },
  {
    id:"3",
    name:"bantamweight",
    pounds: "135lbs"
  },
  {
    id:"4",
    name:"featherweight",
    pounds: "145lbs"
  },
  {
    id:"5",
    name:"lightweight",
    pounds: "155lbs"
  },
  {
    id:"6",
    name:"welterweight",
    pounds: "170lbs"
  },
  {
    id:"7",
    name:"middleweight",
    pounds: "185lbs"
  },
  {
    id:"8",
    name:"light heavyweight",
    pounds: "205lbs"
  },
  {
    id:"9",
    name:"heavyweight",
    pounds: "265lbs"
  },
]

let apiMatches = [
  {
    id: "1",
    fighter1ID:"1",
    fighter2ID:"2",
    weightID:"1",
    isChampionshipFight:true,
    isMainEvent:true,
    isCoMainEvent:false,
    isMainCardFight:true,
    isPrelimFight:false,
    isEarlyPrilimFight:false,
    matchOrder:1,
    maxRounds:5,
    eventID:"1",
    createdAt:"Sun Feb 28 2021 19:12:10 GMT-0800 (Pacific Standard Time)",
    result: {
      winnerID:null,
      loserID:null,
      matchOutcomeMethodID:null,
      round:null,
    },
    updatedAt:null,
    fighter1_odds:"-250",
    fighter2_odds:"+250"
  },
  {
    id: "2",
    fighter1ID:"3",
    fighter2ID:"4",
    weightID:"2",
    isChampionshipFight:true,
    isMainEvent:false,
    isCoMainEvent:true,
    isMainCardFight:true,
    isPrelimFight:false,
    isEarlyPrilimFight:false,
    matchOrder:2,
    maxRounds:5,
    eventID:"1",
    createdAt:"Sun Feb 28 2021 19:12:10 GMT-0800 (Pacific Standard Time)",
    result: {
      winnerID:null,
      loserID:null,
      matchOutcomeMethodID:null,
      round:null,
    },
    updatedAt:null,
    fighter1_odds:"-250",
    fighter2_odds:"+250"
  },
  {
    id: "3",
    fighter1ID:"5",
    fighter2ID:"6",
    weightID:"3",
    isChampionshipFight:false,
    isMainEvent:false,
    isCoMainEvent:false,
    isMainCardFight:true,
    isPrelimFight:false,
    isEarlyPrilimFight:false,
    matchOrder:3,
    maxRounds:5,
    eventID:"1",
    createdAt:"Sun Feb 28 2021 19:12:10 GMT-0800 (Pacific Standard Time)",
    result: {
      winnerID:null,
      loserID:null,
      matchOutcomeMethodID:null,
      round:null,
    },
    updatedAt:null,
    fighter1_odds:"-250",
    fighter2_odds:"+250"
  },
  {
    id: "4",
    fighter1ID:"7",
    fighter2ID:"8",
    weightID:"4",
    isChampionshipFight:false,
    isMainEvent:true,
    isCoMainEvent:false,
    isMainCardFight:true,
    isPrelimFight:false,
    isEarlyPrilimFight:false,
    matchOrder:4,
    maxRounds:5,
    eventID:"1",
    createdAt:"Sun Feb 28 2021 19:12:10 GMT-0800 (Pacific Standard Time)",
    result: {
      winnerID:null,
      loserID:null,
      matchOutcomeMethodID:null,
      round:null,
    },
    updatedAt:null,
    fighter1_odds:"-250",
    fighter2_odds:"+250"
  },
  {
    id: "5",
    fighter1ID:"9",
    fighter2ID:"10",
    weightID:"5",
    isChampionshipFight:false,
    isMainEvent:false,
    isCoMainEvent:false,
    isMainCardFight:true,
    isPrelimFight:false,
    isEarlyPrilimFight:false,
    matchOrder:5,
    maxRounds:3,
    eventID:"1",
    createdAt:"Sun Feb 28 2021 19:12:10 GMT-0800 (Pacific Standard Time)",
    result: {
      winnerID:null,
      loserID:null,
      matchOutcomeMethodID:null,
      round:null,
    },
    updatedAt:null,
    fighter1_odds:"-250",
    fighter2_odds:"+250"
  },
  {
    id: "6",
    fighter1ID:"11",
    fighter2ID:"12",
    weightID:"6",
    isChampionshipFight:false,
    isMainEvent:false,
    isCoMainEvent:false,
    isMainCardFight:false,
    isPrelimFight:true,
    isEarlyPrilimFight:false,
    matchOrder:6,
    maxRounds:3,
    eventID:"1",
    createdAt:"Sun Feb 28 2021 19:12:10 GMT-0800 (Pacific Standard Time)",
    result: {
      winnerID:null,
      loserID:null,
      matchOutcomeMethodID:null,
      round:null,
    },
    updatedAt:null,
    fighter1_odds:"-250",
    fighter2_odds:"+250"
  },
  {
    id: "7",
    fighter1ID:"13",
    fighter2ID:"14",
    weightID:"7",
    isChampionshipFight:false,
    isMainEvent:false,
    isCoMainEvent:false,
    isMainCardFight:false,
    isPrelimFight:true,
    isEarlyPrilimFight:false,
    matchOrder:7,
    maxRounds:3,
    eventID:"1",
    createdAt:"Sun Feb 28 2021 19:12:10 GMT-0800 (Pacific Standard Time)",
    result: {
      winnerID:null,
      loserID:null,
      matchOutcomeMethodID:null,
      round:null,
    },
    updatedAt:null,
    fighter1_odds:"-250",
    fighter2_odds:"+250"
  },
  {
    id: "8",
    fighter1ID:"15",
    fighter2ID:"16",
    weightID:"2",
    isChampionshipFight:false,
    isMainEvent:false,
    isCoMainEvent:false,
    isMainCardFight:false,
    isPrelimFight:true,
    isEarlyPrilimFight:false,
    matchOrder:8,
    maxRounds:3,
    eventID:"1",
    createdAt:"Sun Feb 28 2021 19:12:10 GMT-0800 (Pacific Standard Time)",
    result: {
      winnerID:null,
      loserID:null,
      matchOutcomeMethodID:null,
      round:null,
    },
    updatedAt:null,
    fighter1_odds:"-250",
    fighter2_odds:"+250"
  },
  {
    id: "9",
    fighter1ID:"17",
    fighter2ID:"18",
    weightID:"6",
    isChampionshipFight:false,
    isMainEvent:false,
    isCoMainEvent:false,
    isMainCardFight:false,
    isPrelimFight:false,
    isEarlyPrilimFight:true,
    matchOrder:1,
    maxRounds:3,
    eventID:"1",
    createdAt:"Sun Feb 28 2021 19:12:10 GMT-0800 (Pacific Standard Time)",
    result: {
      winnerID:null,
      loserID:null,
      matchOutcomeMethodID:null,
      round:null,
    },
    updatedAt:null,
    fighter1_odds:"-250",
    fighter2_odds:"+250"
  },
  {
    id: "10",
    fighter1ID:"19",
    fighter2ID:"20",
    weightID:"4",
    isChampionshipFight:false,
    isMainEvent:false,
    isCoMainEvent:false,
    isMainCardFight:true,
    isPrelimFight:false,
    isEarlyPrilimFight:true,
    matchOrder:10,
    maxRounds:3,
    eventID:"1",
    createdAt:"Sun Feb 28 2021 19:12:10 GMT-0800 (Pacific Standard Time)",
    result: {
      winnerID:null,
      loserID:null,
      matchOutcomeMethodID:null,
      round:null,
    },
    updatedAt:null,
    fighter1_odds:"-250",
    fighter2_odds:"+250"
  },
  {
    id: "11",
    fighter1ID:"21",
    fighter2ID:"22",
    weightID:"4",
    isChampionshipFight:false,
    isMainEvent:false,
    isCoMainEvent:false,
    isMainCardFight:true,
    isPrelimFight:false,
    isEarlyPrilimFight:true,
    matchOrder:11,
    maxRounds:3,
    eventID:"1",
    createdAt:"Sun Feb 28 2021 19:12:10 GMT-0800 (Pacific Standard Time)",
    result: {
      winnerID:null,
      loserID:null,
      matchOutcomeMethodID:null,
      round:null,
    },
    updatedAt:null,
    fighter1_odds:"-250",
    fighter2_odds:"+250"
  },
];

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
          <Typography>{children}</Typography>
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


function Matches({eventId}) {
  const [ matches, setMatches ] = useState();
  const [value, setValue] = useState(0);
  const classes = useStyles();
  const queryMatches = useMediaQuery('(min-width:960px)');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getFightersData = (matchs) => {

    const fighter1 = matchs.map((match, index) => {
      return fighters.find( fighter => match.fighter1ID === fighter.id ? fighter : null )
    })

    const fighter2 = matchs.map((match, index) => {
      return fighters.find( fighter => match.fighter2ID === fighter.id ? fighter : null )
    });

    return {
      fighter1,
      fighter2
    }
}



const getWeightData = (weightData, matchesData) => {
  return matchesData.map( match => {
    return weightData.find( weight => match.weightID === weight.id ? weight : null)
  });
}

const getMatchesData = (id) => {
  return  apiMatches.filter(match => match.eventID === id);
}

const getMatches = (fightersData, weightClassData, matchesData) => {
  const { fighter1, fighter2 } = fightersData
  return matchesData.map( (match, i) => {
    return {
      isChampionshipFight:match?.isChampionshipFight,
      isMainEvent:match?.isMainEvent,
      isCoMainEvent:match?.isCoMainEvent,
      isMainCardFight:match?.isMainCardFight,
      isPrelimFight:match?.isPrelimFight,
      isEarlyPrilimFight:match?.isEarlyPrilimFight,
      matchOrder:match?.matchOrder,
      maxRounds:match?.maxRounds,
      eventID:match?.eventID,
      fighter1_id: fighter1[i]?.id,
      fighter1_name:  fighter1[i]?.nickname ? `${fighter1[i]?.firstname} '${fighter1[i]?.nickname}' ${fighter1[i]?.lastname}` : `${fighter1[i]?.firstname} ${fighter1[i]?.lastname}` ,
      fighter1_record: fighter1[i].noContest ? `${fighter1[i]?.wins}-${fighter1[i]?.losses}-${fighter1[i]?.draws},${fighter1[i].noContest}NC` :`${fighter1[i]?.wins}-${fighter1[i]?.losses}-${fighter1[i]?.draws}`,
      fighter1_rank: fighter1[i]?.rank,
      fighter1_isChampion: fighter1[i]?.isChampion,
      fighter1_image: fighter1[i]?.image,
      fighter2_id: fighter2[i]?.id,
      fighter2_name:  fighter1[i]?.nickname ? `${fighter2[i]?.firstname} '${fighter2[i]?.nickname}' ${fighter2[i]?.lastname}` : `${fighter2[i]?.firstname} ${fighter2[i]?.lastname}` ,
      fighter2_record: fighter1[i].noContest ? `${fighter2[i]?.wins}-${fighter2[i]?.losses}-${fighter2[i]?.draws},${fighter2[i].noContest}NC` :`${fighter2[i]?.wins}-${fighter2[i]?.losses}-${fighter2[i]?.draws}`,
      fighter2_rank: fighter2[i]?.rank,
      fighter2_isChampion: fighter2[i]?.isChampion,
      fighter2_image: fighter2[i]?.image,
      weight: weightClassData[i]?.name,
      weightId:weightClassData[i]?.id,
      fighter1_odds: match.fighter1_odds,
      fighter2_odds: match.fighter2_odds,
    }
  });
}

useEffect(() => {
  if(eventId){
    const matchesData = getMatchesData(eventId);
    const fightersData = getFightersData(matchesData);
    const weightClassData = getWeightData(weightClass, matchesData);
    const allMatches = getMatches(fightersData, weightClassData, matchesData);
    setMatches(allMatches)

  }
}, [eventId]);

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
          <TabPanel value={value} index={0}>
            {matches ? matches.map( match => <>
              <Grid container>
                <Grid item  xs={12} md={6}>
                  <Paper elevation={3} style={{justifyContent:"space-between", alignItems:"center"}} className={`${classes.match} ${classes.fighter1}`}>
                  <div style={{display:"flex"}}>
                  <Avatar variant="circular" className={classes.fighter} src="images/fighters/no-fighter.png" />
                    <div className={`${classes.fighterInfo} ${classes.fighter1Info}`}>
                      <p>{match.fighter1_name}</p>
                      <p className={classes.fighterRecord}>{match.fighter1_record}</p>
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
                      <p>{match.fighter2_name}</p>
                      <p className={classes.fighterRecord}>{match.fighter2_record}</p>
                    </div>
                    <Avatar variant="circular" className={classes.fighter} src="images/fighters/no-fighter.png" />
                  </div>
                  </Paper>
                </Grid>
              </Grid>
            </>) : <>No Matches Available</>}
          </TabPanel>
          <TabPanel value={value} index={1}>
              {matches ? matches.map( match => <>
                {match.isMainCardFight && <>
                  <Grid container>
                <Grid item  xs={12} md={6} >
                <Paper elevation={3} style={{justifyContent:"space-between", alignItems:"center"}} className={`${classes.match} ${classes.fighter1}`}>
                  <div style={{display:"flex"}}>
                  <Avatar variant="circular" className={classes.fighter} src="images/fighters/no-fighter.png" />
                    <div className={`${classes.fighterInfo} ${classes.fighter1Info}`}>
                      <p>{match.fighter1_name}</p>
                      <p className={classes.fighterRecord}>{match.fighter1_record}</p>
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
                      <p>{match.fighter2_name}</p>
                      <p className={classes.fighterRecord}>{match.fighter2_record}</p>
                    </div>
                    <Avatar variant="circular" className={classes.fighter} src="images/fighters/no-fighter.png" />
                  </div>
                  </Paper>
                </Grid>
              </Grid>
                </>}
              </>): <>No Matches Available</>}
          </TabPanel>
          <TabPanel value={value} index={2}>
              {matches ? matches.map( match => <>
                {match.isPrelimFight && <>
                  <Grid container>
                <Grid item xs={12} md={6} >
                <Paper elevation={3} style={{justifyContent:"space-between", alignItems:"center"}} className={`${classes.match} ${classes.fighter1}`}>
                  <div style={{display:"flex"}}>
                  <Avatar variant="circular" className={classes.fighter} src="images/fighters/no-fighter.png" />
                    <div className={`${classes.fighterInfo} ${classes.fighter1Info}`}>
                      <p>{match.fighter1_name}</p>
                      <p className={classes.fighterRecord}>{match.fighter1_record}</p>
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
                      <p>{match.fighter2_name}</p>
                      <p className={classes.fighterRecord}>{match.fighter2_record}</p>
                    </div>
                    <Avatar variant="circular" className={classes.fighter} src="images/fighters/no-fighter.png" />
                  </div>
                  </Paper>
                </Grid>
              </Grid>
                </>}
              </>): <>No Matches Available</>}
          </TabPanel>
          <TabPanel value={value} index={3}>
            {matches ? matches.map( match => <>
                {match.isEarlyPrilimFight && <>
                  <Grid container>
                <Grid item xs={12} md={6} >
                <Paper elevation={3} style={{justifyContent:"space-between", alignItems:"center"}} className={`${classes.match} ${classes.fighter1}`}>
                  <div style={{display:"flex"}}>
                  <Avatar variant="circular" className={classes.fighter} src="images/fighters/no-fighter.png" />
                    <div className={`${classes.fighterInfo} ${classes.fighter1Info}`}>
                      <p>{match.fighter1_name}</p>
                      <p className={classes.fighterRecord}>{match.fighter1_record}</p>
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
                      <p>{match.fighter2_name}</p>
                      <p className={classes.fighterRecord}>{match.fighter2_record}</p>
                    </div>
                    <Avatar variant="circular" className={classes.fighter} src="images/fighters/no-fighter.png" />
                  </div>
                  </Paper>
                </Grid>
              </Grid>
                </>}
              </>): <>No Matches Available</>}
          </TabPanel>
        </Box>
        </Grid>
      </Paper>
    </Container>
  )
}

export default Matches
