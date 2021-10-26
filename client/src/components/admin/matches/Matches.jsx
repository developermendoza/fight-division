import React, {useEffect} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Container, Box, Avatar, Grid, Button, TableBody, Select, TextField, FormControl, InputLabel, FormControlLabel, Radio, RadioGroup, FormLabel, List, ListItem,TablePagination} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { getMatches, deleteMatch, addMatch, updateMatch } from "../../../actions/matches";
import { getFighters } from "../../../actions/fighters";
import { getEvents } from "../../../actions/events";
import { getWeights } from "../../../actions/weights";
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import moment from "moment";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import SearchField from "react-search-field";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  table: {
    minWidth: 650,
  },

  input:{
    display:"none"
  },
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 500,
  },
}));


function Matches({handleOpenModal}) {

  const initialState = {
    fighter1:"",
    fighter2:"",
    weight:"",
    event:"",
    maxRounds:"3",
    matchOrder:"",
    isEarlyPrilimFight:"",
    isPrelimFight:"",
    isMainCardFight:"",
    isCoMainEvent:"no",
    isMainEvent:"no",
    isChampionshipFight:"no"
  }

  const initialFighterNameState = {
    fighter1:"", fighter2:""
  }

  const dispatch = useDispatch();
  const matches = useSelector(state => state.matches.data);
  const fighters = useSelector(state => state.fighters.data);
  const events = useSelector(state => state.events.data);
  const weights = useSelector(state => state.weights.data);
  const classes = useStyles();
  const [open, setOpen] = React.useState({modalContent:"",modal:false});
  const [matchId, setMatchId ] = React.useState("");
  const [ match, setMatch ] = React.useState(initialState);
  const [ editMatch, setEditMatch ] = React.useState({})
  const [ showFighter1Filtered, setshowFighter1Filtered ] = React.useState([])
  const [ showFighter2Filtered, setshowFighter2Filtered ] = React.useState([])
  const [ fighterName, setFighterName ] = React.useState(initialFighterNameState)
  const [ filteredFighters, setFilteredFighters ] = React.useState();
  const [ filterEvents, setFilteredEvents ] = React.useState([])
  const [updatedMatch, setUpdatedMatch ] = React.useState(initialState)
  // const [filterMatch, setFilterMatch ] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterMatches, setFilterMatches] = React.useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getMatches());
    dispatch(getFighters());
    dispatch(getEvents())
    dispatch(getWeights())
  }, [dispatch])

  useEffect(() => {
    if(fighters){
      const fightersFullnames = fighters.map(fighter => 
        {
          let fullname = `${fighter.firstname} ${fighter.lastname}`
          return {...fighter, fullname}
        }
      )
      setFilteredFighters(fightersFullnames)
    }
  }, [fighters])

  useEffect(() => {
    const today = new Date()
    if(events){
      const filtered = events.filter( event => event.date > today.toISOString())
      setFilteredEvents(filtered)
    }
  },[events]);

  useEffect(() => {
    if(matches){
      setFilterMatches(matches)
    }
  }, [matches])

  const handleClose = () => {
    setOpen(false);
    setshowFighter1Filtered([])
    setMatch(initialState)
    setMatchId("")
    setFighterName(initialFighterNameState)
  };

  const handleOpen = (match, modalType) => {
    modalType === "delete"  && setMatchId(match._id)
    modalType === "update" && setEditMatch({
      ...match,
      fighter1:match.fighter1,
      fighter2:match.fighter2,
      event:match.event._id,
      weight: match.weight._id,
      isEarlyPrilimFight:match.isEarlyPrilimFight ? "yes" : "no",
      isPrelimFight:match.isPrelimFight ? "yes" : "no",
      isMainCardFight:match.isMainCardFight? "yes" : "no",
      isCoMainEvent:match.isCoMainEvent ? "yes" : "no",
      isMainEvent:match.isMainEvent ? "yes" : "no",
      isChampionshipFight:match.isChampionshipFight ? "yes" : "no"
    });
 

    setOpen({modalContent: modalType, modal:true});
  };


  const handleFighterSelection = (fighter, fighterSelection) => {

      setMatch({
        ...match,
        [fighterSelection]:fighter._id
      })
      fighterSelection === "fighter1" && setshowFighter1Filtered([])
      fighterSelection === "fighter2" && setshowFighter2Filtered([])
      setFighterName({
        ...fighterName,
        [fighterSelection]:fighter.fullname
      })
  }

  const onFighterChange = (fighterType, value) => {

      const filtered = filteredFighters.filter( fighter => {
        if(value === "") return null
        return fighter.fullname.toLowerCase().includes(value.toLowerCase())
      })

    fighterType === "fighter1" && setshowFighter1Filtered(filtered)
    fighterType === "fighter2" && setshowFighter2Filtered(filtered)

  }

  const handleCreateChange = (e) => {

    setMatch({
      ...match,
      [e.target.name]:e.target.value
    })
  }

  const handleUpdateChange = (e) => {
    setEditMatch({
      ...editMatch,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmitUpdate = (e) => {
    console.log("editMatch: ", editMatch)
    e.preventDefault()
  }
  const handleDeleteMatch = (e) => {
    e.preventDefault();
    dispatch(deleteMatch(matchId))
    setOpen(false);
  }
// console.log("editMatch: ",editMatch)
// console.log(("props matches: ", props))
  const showUpdateForm = () => {
    return (
      <div>
      <h2>Update Match</h2>
        <form onSubmit={handleSubmitUpdate}>
          <FormControl fullWidth style={{marginTop:"10px"}}>
          <FormLabel component="legend">Fighter 1</FormLabel>
          <SearchField
             placeholder='Search for Fighter 1'
            onChange={(e) => onFighterChange("fighter1", e)}
            searchText={`${editMatch.fighter1.firstname} ${editMatch.fighter1.lastname}`}
            classNames="test-class"
          />
          {showFighter1Filtered.length > 0 && <List style={{maxHeight:"200px", overflow:"scroll"}} component="nav"  aria-label="main mailbox folders">
            {showFighter1Filtered.map( filtered => <ListItem button onClick={()=>handleFighterSelection(filtered, "fighter1")}>
              {filtered.fullname}
            </ListItem>)}
          </List>}
          </FormControl>
          <FormControl fullWidth style={{marginTop:"10px"}}>
          <FormLabel component="legend">Fighter 2</FormLabel>
          <SearchField
             placeholder='Search for Fighter 2'
             onChange={(e) => onFighterChange("fighter2", e)}
             searchText={`${editMatch.fighter2.firstname} ${editMatch.fighter2.lastname}`}
            classNames="test-class"
          />
          {/* {showFighter2Filtered.length > 0 && <List component="nav" style={{maxHeight:"200px", overflow:"scroll"}} aria-label="main mailbox folders">
            {showFighter2Filtered.map( filtered => <ListItem button onClick={()=>handleFighterSelection(filtered, "fighter2")}>
              {filtered.fullname}
            </ListItem>)}
          </List>} */}
          <br />
          </FormControl>
          <FormControl component="fieldset" style={{marginRight:"20px"}}>
            <FormLabel component="legend">Is Main Event?</FormLabel>
            <RadioGroup aria-label="isMainEvent" name="isMainEvent" row value={editMatch.isMainEvent} onChange={handleUpdateChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={editMatch.isMainEvent === "yes"}/>
              <FormControlLabel value="no" control={<Radio />} label="No" checked={editMatch.isMainEvent === "no"}/>
            </RadioGroup>
          </FormControl>
      
          <FormControl component="fieldset">
            <FormLabel component="legend">Is CoMain Event?</FormLabel>
            <RadioGroup aria-label="isMainEvent" name="isCoMainEvent" row value={editMatch.isCoMainEvent} onChange={handleUpdateChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={editMatch.isCoMainEvent === "yes"}/>
              <FormControlLabel value="no" control={<Radio />} label="No" checked={editMatch.isCoMainEvent === "no"}/>
            </RadioGroup>
          </FormControl>
          <br /><br />
          <FormControl component="fieldset" style={{marginRight:"20px"}}>
            <FormLabel component="legend">Is Maincard Match?</FormLabel>
            <RadioGroup aria-label="isMainEvent" name="isMainCardFight" row value={editMatch.isMainCardFight} onChange={handleUpdateChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={editMatch.isMainCardFight === "yes"}/>
              <FormControlLabel value="no" control={<Radio />} label="No" checked={editMatch.isMainCardFight === "no"}/>
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Is Prelim Match?</FormLabel>
            <RadioGroup aria-label="isMainEvent" name="isPrelimFight" row value={editMatch.isPrelimFight} onChange={handleUpdateChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={editMatch.isPrelimFight === "yes"}/>
              <FormControlLabel value="no" control={<Radio />} label="No" checked={editMatch.isPrelimFight === "no"}/>
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" style={{marginRight:"20px"}}>
            <FormLabel component="legend">Is Early Prelim Match?</FormLabel>
            <RadioGroup aria-label="isMainEvent" name="isEarlyPrilimFight" row value={editMatch.isEarlyPrilimFight} onChange={handleUpdateChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={editMatch.isEarlyPrilimFight === "yes"}/>
              <FormControlLabel value="no" control={<Radio />} label="No" checked={editMatch.isEarlyPrilimFight === "no"}/>
            </RadioGroup>
          </FormControl>
          <br /><br />
          <FormControl component="fieldset" style={{marginRight:"20px"}} fullWidth>
            <TextField
                    type="number" 
                    defaultValue={editMatch.matchOrder} 
                    label="Match order"
                    name="matchOrder"
                    variant="filled"
                    color="secondary"
                    onChange={handleUpdateChange}
                  />
          </FormControl>
          <br /><br />
          <FormControl component="fieldset" style={{marginRight:"20px"}}>
            <FormLabel component="legend">Total Rounds</FormLabel>
            <RadioGroup aria-label="maxRounds" name="maxRounds" row value={editMatch.maxRounds} onChange={handleUpdateChange}>
              <FormControlLabel value="1" control={<Radio />} label="1" checked={editMatch.maxRounds === 1}/>
              <FormControlLabel value="2" control={<Radio />} label="2" checked={editMatch.maxRounds === 2}/>
              <FormControlLabel value="3" control={<Radio />} label="3" checked={editMatch.maxRounds === 3}/>
              <FormControlLabel value="4" control={<Radio />} label="4" checked={editMatch.maxRounds === 4}/>
              <FormControlLabel value="5" control={<Radio />} label="5" checked={editMatch.maxRounds === 5}/>
            </RadioGroup>
          </FormControl>
          <br /><br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="event">Event</InputLabel>
            <Select
              native
              label="Event"
              inputProps={{
                name: 'event',
                id: 'event',
              }}
              onChange={handleUpdateChange}
            >
              <option aria-label="None" value={editMatch.event._id} >{editMatch.event.name}</option>
              {filterEvents?.map( event => (<option key={event._id} value={event._id}>{event.name}</option>)) }
            </Select>
          </FormControl>
          <br /><br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="weight">Weight</InputLabel>
            <Select
              native
              label="Weight"
              inputProps={{
                name: 'weight',
                id: 'weight',
              }}
              onChange={handleUpdateChange}
            >
              <option aria-label="None" value={editMatch.weight} >{editMatch.weight}</option>  
              {weights?.map( weight => (<option key={weight._id} data-weight={weight.name} value={weight._id}>{weight.name}</option>)) }
            </Select>
          </FormControl>
          <div style={{marginTop:"20px", display:"flex", justifyContent:"space-between"}}>
          <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="secondary" type="submit">Update Match</Button>
          </div>
        </form>
      </div>
      

    )
  }


  const handleSubmitCreate = (e) => {
    e.preventDefault()
    dispatch(addMatch(match))
    setMatch(initialState)
    setOpen(false);
    setFighterName(initialFighterNameState)
  }


  const showCreateForm = () => {
    return (
      <div>
        <h2>Add Match</h2>
        <form onSubmit={handleSubmitCreate}>
          <FormControl fullWidth style={{marginTop:"10px"}}>
          <FormLabel component="legend">Fighter 1</FormLabel>
          <SearchField
             placeholder='Search for Fighter 1'
            onChange={(e) => onFighterChange("fighter1", e)}
            searchText={fighterName.fighter1}
            classNames="test-class"
          />
          {showFighter1Filtered.length > 0 && <List style={{maxHeight:"200px", overflow:"scroll"}} component="nav"  aria-label="main mailbox folders">
            {showFighter1Filtered.map( filtered => <ListItem button onClick={()=>handleFighterSelection(filtered, "fighter1")}>
              {filtered.fullname}
            </ListItem>)}
          </List>}
          </FormControl>
          <FormControl fullWidth style={{marginTop:"10px"}}>
          <FormLabel component="legend">Fighter 2</FormLabel>
          <SearchField
             placeholder='Search for Fighter 2'
             onChange={(e) => onFighterChange("fighter2", e)}
            searchText={fighterName.fighter2}
            classNames="test-class"
          />
          {showFighter2Filtered.length > 0 && <List component="nav" style={{maxHeight:"200px", overflow:"scroll"}} aria-label="main mailbox folders">
            {showFighter2Filtered.map( filtered => <ListItem button onClick={()=>handleFighterSelection(filtered, "fighter2")}>
              {filtered.fullname}
            </ListItem>)}
          </List>}
          <br />
          </FormControl>
          <FormControl component="fieldset" style={{marginRight:"20px"}}>
            <FormLabel component="legend">Is Main Event?</FormLabel>
            <RadioGroup aria-label="isMainEvent" name="isMainEvent" row value={match.isMainEvent} onChange={handleCreateChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={match.isMainEvent === "yes"}/>
              <FormControlLabel value="no" control={<Radio />} label="No" checked={match.isMainEvent === "no"}/>
            </RadioGroup>
          </FormControl>
          {/* <br /><br /> */}
          <FormControl component="fieldset">
            <FormLabel component="legend">Is CoMain Event?</FormLabel>
            <RadioGroup aria-label="isMainEvent" name="isCoMainEvent" row value={match.isCoMainEvent} onChange={handleCreateChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={match.isCoMainEvent === "yes"}/>
              <FormControlLabel value="no" control={<Radio />} label="No" checked={match.isCoMainEvent === "no"}/>
            </RadioGroup>
          </FormControl>
          <br /><br />
          <FormControl component="fieldset" style={{marginRight:"20px"}}>
            <FormLabel component="legend">Is Maincard Match?</FormLabel>
            <RadioGroup aria-label="isMainEvent" name="isMainCardFight" row value={match.isMainCardFight} onChange={handleCreateChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={match.isMainCardFight === "yes"}/>
              <FormControlLabel value="no" control={<Radio />} label="No" checked={match.isMainCardFight === "no"}/>
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset">
            <FormLabel component="legend">Is Prelim Match?</FormLabel>
            <RadioGroup aria-label="isMainEvent" name="isPrelimFight" row value={match.isPrelimFight} onChange={handleCreateChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={match.isPrelimFight === "yes"}/>
              <FormControlLabel value="no" control={<Radio />} label="No" checked={match.isPrelimFight === "no"}/>
            </RadioGroup>
          </FormControl>
          <FormControl component="fieldset" style={{marginRight:"20px"}}>
            <FormLabel component="legend">Is Early Prelim Match?</FormLabel>
            <RadioGroup aria-label="isMainEvent" name="isEarlyPrilimFight" row value={match.isEarlyPrilimFight} onChange={handleCreateChange}>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={match.isEarlyPrilimFight === "yes"}/>
              <FormControlLabel value="no" control={<Radio />} label="No" checked={match.isEarlyPrilimFight === "no"}/>
            </RadioGroup>
          </FormControl>
          <br /><br />
          <FormControl component="fieldset" style={{marginRight:"20px"}} fullWidth>
            <TextField
                    type="number" 
                    defaultValue={match.matchOrder} 
                    label="Match order"
                    name="matchOrder"
                    variant="filled"
                    color="secondary"
                    onChange={handleCreateChange}
                  />
          </FormControl>
          <br /><br />
          <FormControl component="fieldset" style={{marginRight:"20px"}}>
            <FormLabel component="legend">Total Rounds</FormLabel>
            <RadioGroup aria-label="maxRounds" name="maxRounds" row value={match.maxRounds} onChange={handleCreateChange}>
              <FormControlLabel value="1" control={<Radio />} label="1" checked={match.maxRounds === "1"}/>
              <FormControlLabel value="2" control={<Radio />} label="2" checked={match.maxRounds === "2"}/>
              <FormControlLabel value="3" control={<Radio />} label="3" checked={match.maxRounds === "3"}/>
              <FormControlLabel value="4" control={<Radio />} label="4" checked={match.maxRounds === "4"}/>
              <FormControlLabel value="5" control={<Radio />} label="5" checked={match.maxRounds === "5"}/>
            </RadioGroup>
          </FormControl>
          <br /><br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="event">Event</InputLabel>
            <Select
              native
              label="Event"
              inputProps={{
                name: 'event',
                id: 'event',
              }}
              onChange={handleCreateChange}
            >
              <option aria-label="None" value={match.event} >{match.event}</option>
              {filterEvents?.map( event => (<option key={event._id} value={event._id}>{event.name}</option>)) }
            </Select>
          </FormControl>
          <br /><br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="weight">Weight</InputLabel>
            <Select
              native
              label="Weight"
              inputProps={{
                name: 'weight',
                id: 'weight',
              }}
              onChange={handleCreateChange}
            >
              <option aria-label="None" value={match.weight} >{match.weight}</option>
              {weights?.map( weight => (<option key={weight._id} data-weight={weight.name} value={weight._id}>{weight.name}</option>)) }
            </Select>
          </FormControl>
          <div style={{marginTop:"20px", display:"flex", justifyContent:"space-between"}}>
          <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="secondary" type="submit">Add Match</Button>
          </div>
        </form>
      </div>
    )
  }
  const showDeleteForm = () => {
    return (
      <form onSubmit={handleDeleteMatch}><h2 id="transition-modal-title">Delete Event</h2>
      <p id="transition-modal-description">Are you sure you want to delete this match?</p>
      <div style={{display:"flex", justifyContent:"space-between", marginTop:"20px"}}>
      <Button variant="contained" color="primary" onClick={handleClose}>No</Button>
     <Button variant="contained" type="submit" color="secondary">Yes</Button>
      </div></form>
    )
  }

  const handleMatchSearch = (e) => {
    if(!e.target.value){
      setFilterMatches(matches)
    }else{
     const filtered = filterMatches.filter(match =>  {
       if(match.event){
        return match.event.name.toLowerCase().includes(e.target.value.toLowerCase())
       }
       return null
     });
     setFilterMatches(filtered)
    }
  }

  return (
    <div>
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open.modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
        
      >
        <Fade in={open.modal} style={{maxHeight:"710px"}}>
          <div className={classes.paper}>
          {open.modalContent === "create" && showCreateForm()}
          {open.modalContent === "update" && showUpdateForm()}
          {open.modalContent === "delete" && showDeleteForm()}
          </div>
        </Fade>
      </Modal>
     <Container>
     <TextField style={{width:"200px"}} id="filled-search" onChange={handleMatchSearch} label="Search match by event" type="search" variant="filled" />
    <div style={{textAlign:"right", marginBottom:"20px"}}>
      <Button color="primary" onClick={()=>handleOpen(null, "create")}  startIcon={<AddIcon />}>
        Create
      </Button>
    </div>
    </Container>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
      <Table  stickyHeader aria-label="sticky table">
      <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell align="left">Event</TableCell>
            <TableCell align="left">Location</TableCell>
            <TableCell align="left">Venue</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Order</TableCell>
            <TableCell align="left">Fighter 1</TableCell>
            <TableCell align="left">Fighter 2</TableCell>
            <TableCell align="left">Total Rounds</TableCell>
            <TableCell align="left">Weight</TableCell>
            <TableCell align="left">Championship Fight</TableCell>
            <TableCell align="left">Maincard Fight</TableCell>
            <TableCell align="left">Main event</TableCell>
            <TableCell align="left">Co main event</TableCell>
            <TableCell align="left">Prelim fight </TableCell>
            <TableCell align="left">Early prelim fight </TableCell>
            <TableCell align="left">Edit </TableCell>
            <TableCell align="left">Delete </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {filterMatches?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((match) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={match._id}>
                <TableCell align="left">{match._id}</TableCell>
            <TableCell align="left">{moment(match.createdAt).format("ll")}</TableCell>
            <TableCell align="left">{match.updatedAt && moment(match.updatedAt).format("ll")}</TableCell>
            <TableCell align="left">{match?.event?.name}</TableCell>
            <TableCell align="left">{match?.event?.location}</TableCell>
            <TableCell align="left">{match?.event?.venue}</TableCell>
            <TableCell align="left">{match?.event?.date && moment(match.event.date).format("ll")}</TableCell>
            <TableCell align="left">{match.matchOrder}</TableCell>
            <TableCell align="left">{match?.fighter1?.firstname}</TableCell>
            <TableCell align="left">{match?.fighter2?.lastname}</TableCell>
            <TableCell align="left">{match.maxRounds}</TableCell>
            <TableCell align="left">{match?.weight?.name}</TableCell>
            <TableCell align="left">{match.isChampionshipFight && "Yes"}</TableCell>
            <TableCell align="left">{match.isMainCardFight && "Yes"}</TableCell>
            <TableCell align="left">{match.isMainEvent && "Yes"}</TableCell>
            <TableCell align="left">{match.isCoMainEvent && "Yes"}</TableCell>
            <TableCell align="left">{match.isPrelimFight && "Yes"}</TableCell>
            <TableCell align="left">{match.isEarlyPrilimFight && "Yes"}</TableCell>
            <TableCell align="right"><Button color="primary"  startIcon={<CreateIcon />}>Edit</Button></TableCell> 
            <TableCell align="right"><Button color="secondary" onClick={()=>handleOpen(match, "delete")}  startIcon={<DeleteIcon />}>Delete</Button></TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={matches?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>
     <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open.modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 300,
        }}
        
      >
        <Fade in={open.modal} style={{maxHeight:"710px"}}>
          <div className={classes.paper}>
          {open.modalContent === "create" && showCreateForm()}
          {open.modalContent === "update" && showUpdateForm()}
          {open.modalContent === "delete" && showDeleteForm()}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default Matches
