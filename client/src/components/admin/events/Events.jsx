import React, {useEffect} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Container, Box, Avatar, Grid, Button, TableBody, Select, FormControl, MenuItem, InputLabel,TablePagination} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { getEvents, addEvent, deleteEvent, updateEvent } from "../../../actions/events";
import { getNetworks } from "../../../actions/networks";
import { getOrganizations } from "../../../actions/organizations";
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';


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


function Events(props) {

  const initialState = {
    name:"",
    location:"",
    venue:"",
    date:"",
    mainCardTime:"",
    prelimTime:"",
    earlyPrelimTime:"",
    mainCardNetwork:"",
    prelimNetwork:"",
    earlyPrelimNetwork:"",
    organization:"",
  }

  const dispatch = useDispatch();
  const events = useSelector(state => state.events.data);
  const networks = useSelector(state => state.networks.data)
  const organizations = useSelector(state => state.organizations.data)
  const classes = useStyles();
  const [open, setOpen] = React.useState({modalContent:"",modal:false});
  const [userId, setUserId ] = React.useState("")
  const [event, setEvent] = React.useState(initialState)
  const [eventToUpdate, setEventToUpdate] = React.useState(initialState);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterEvents, setFilterEvents] = React.useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getNetworks())
    dispatch(getOrganizations())
  }, [dispatch])

  useEffect(() => {
    if(events){
      setFilterEvents(events)
    }
  }, [events])

  const handleDeleteEvent = (e) => {
    e.preventDefault();
    dispatch(deleteEvent(userId))
    setOpen(false);
  }

  const handleSubmitUpdate = (e) =>{
  e.preventDefault()
    dispatch(updateEvent(eventToUpdate))
    setOpen(false);
  }

  const handleChangeUpdate = (e) => {
    setEventToUpdate({
      ...eventToUpdate,
      [e.target.name] : e.target.value
    })
  }

  const handleOpen = (event, modalType) => {
    modalType === "delete"  && setUserId(event._id)
    modalType === "edit" && setEventToUpdate(event)

    setOpen({modalContent: modalType, modal:true});
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeCreate = (e) => {
    setEvent({
      ...event,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmitCreate = (e) => {

    e.preventDefault();
    dispatch(addEvent(event))
    setEvent(initialState)
    setOpen(false);
  }

  const handleEventSearch = (e) => {
    if(!e.target.value){
       setFilterEvents(events)
     }else{
      const filtered = filterEvents.filter(event =>  {
          return event.name.toLowerCase().includes(e.target.value.toLowerCase())
      });
      setFilterEvents(filtered)
     }
  }

  const showEditForm = () => {
    return (
      <div>
         <h2>Edit Event</h2>
         <form onSubmit={handleSubmitUpdate}>
        <TextField 
            defaultValue={eventToUpdate.name} 
            fullWidth
            label="name"
            variant="filled"
            color="secondary"
            name="name"
            onChange={handleChangeUpdate}
          />
        <TextField
            defaultValue={eventToUpdate.location} 
            fullWidth
            label="location"
            variant="filled"
            color="secondary"
            name="location"
            onChange={handleChangeUpdate}
          />
          <TextField
            type="string" 
            defaultValue={eventToUpdate.venue} 
            fullWidth
            label="venue"
            name="venue"
            variant="filled"
            color="secondary"
            onChange={handleChangeUpdate}
          />
          <br /> <br />
          <TextField
            id="datetime-local"
            label="Event Date"
            type="datetime-local"
            name="date"
            defaultValue={moment(eventToUpdate.date).format("YYYY-MM-DDTHH:mm")}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeUpdate}
          />
          <br /> <br />
          <TextField
            id="datetime-local"
            label="Main Card Date / Time"
            type="datetime-local"
            name="mainCardTime"
            defaultValue={moment(eventToUpdate.mainCardTime).format("YYYY-MM-DDTHH:mm")}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeUpdate}
          />
          <br /> <br />
          <TextField
            id="datetime-local"
            label="Prelim Date / Time"
            type="datetime-local"
            name="prelimTime"
            defaultValue={moment(eventToUpdate.prelimTime).format("YYYY-MM-DDTHH:mm")}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeUpdate}
          />
          <br /> <br />
          <TextField
            id="datetime-local"
            label="Early Prelim Date / Time"
            type="datetime-local"
            name="earlyPrelimTime"
            defaultValue={moment(eventToUpdate.earlyPrelimTime).format("YYYY-MM-DDTHH:mm")}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeUpdate}
          />
            <br /> <br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="maincardNetwork">Main Card Network</InputLabel>
            <Select
              native
              label="Maincard Network"
              inputProps={{
                name: 'mainCardNetwork',
                id: 'maincardNetwork',
              }}
              onChange={handleChangeUpdate}
            >
              <option aria-label="None" value={eventToUpdate?.mainCardNetwork?._id} >{eventToUpdate?.mainCardNetwork?.name}</option>
              {networks?.map( network => (<option key={network._id} value={network._id}>{network.name}</option>)) }
            </Select>
          </FormControl>
          <br /> <br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="prelimNetwork">Prelim Network</InputLabel>
            <Select
              native
              label="Prelim Network"
              inputProps={{
                name: 'prelimNetwork',
                id: 'prelimNetwork',
              }}
              onChange={handleChangeUpdate}
            >
              <option aria-label="None" value={eventToUpdate?.prelimNetwork?._id}>{eventToUpdate?.prelimNetwork?.name}</option>
              {networks?.map( network => (<option key={network._id} value={network._id}>{network.name}</option>)) }
            </Select>
          </FormControl>
          <br /> <br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="earlyPrelimNetwork">Early Prelim Network</InputLabel>
            <Select
              native
              label="Early Prelim Network"
              inputProps={{
                name: 'earlyPrelimNetwork',
                id: 'earlyPrelimNetwork',
              }}
              onChange={handleChangeUpdate}
            >
              <option aria-label="None" value={eventToUpdate?.earlyPrelimNetwork?._id}>{eventToUpdate?.earlyPrelimNetwork?.name}</option>
              {networks?.map( network => (<option key={network._id} value={network._id}>{network.name}</option>)) }
            </Select>
          </FormControl>
          <br /> <br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="organization">Organizations</InputLabel>
            <Select
              native
              label="organization"
              inputProps={{
                name: 'organization',
                id: 'organization',
              }}
              onChange={handleChangeUpdate}
            >
              <option aria-label="None" value={eventToUpdate.organization?._id}>{eventToUpdate.organization?.name}</option>
              {organizations?.map( organization => (<option key={organization._id} value={organization._id}>{organization.name}</option>)) }
            </Select>
          </FormControl>
          <div style={{marginTop:"20px", display:"flex", justifyContent:"space-between"}}>
          <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="secondary" type="submit">Update Event</Button>
          </div>
        </form>
      </div>
    )
  }

  const showCreateForm = () => {
    return (
      <div>
        <h2>Add Event</h2>
        <form onSubmit={handleSubmitCreate}>
        <TextField 
            defaultValue={event.name} 
            fullWidth
            label="name"
            variant="filled"
            color="secondary"
            name="name"
            onChange={handleChangeCreate}
          />
        <TextField
            defaultValue={event.location} 
            fullWidth
            label="location"
            variant="filled"
            color="secondary"
            name="location"
            onChange={handleChangeCreate}
          />
          <TextField
            type="string" 
            defaultValue={event.venue} 
            fullWidth
            label="venue"
            name="venue"
            variant="filled"
            color="secondary"
            onChange={handleChangeCreate}
          />
          <br /> <br />
          <TextField
            id="datetime-local"
            label="Event Date"
            type="datetime-local"
            name="date"
            defaultValue={event.date}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeCreate}
          />
          <br /> <br />
          <TextField
            id="datetime-local"
            label="Main Card Date / Time"
            type="datetime-local"
            name="mainCardTime"
            defaultValue={event.mainCardTime}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeCreate}
          />
          <br /> <br />
          <TextField
            id="datetime-local"
            label="Prelim Date / Time"
            type="datetime-local"
            name="prelimTime"
            defaultValue={event.prelimTime}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeCreate}
          />
          <br /> <br />
          <TextField
            id="datetime-local"
            label="Early Prelim Date / Time"
            type="datetime-local"
            name="earlyPrelimTime"
            defaultValue={event.earlyPrelimTime}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeCreate}
          />
            <br /> <br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="maincardNetwork">Main Card Network</InputLabel>
            <Select
              native
              label="Maincard Network"
              inputProps={{
                name: 'mainCardNetwork',
                id: 'maincardNetwork',
              }}
              onChange={handleChangeCreate}
            >
              <option aria-label="None" value={event.mainCardNetwork} />
              {networks?.map( network => (<option key={network._id} value={network._id}>{network.name}</option>)) }
            </Select>
          </FormControl>
          <br /> <br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="prelimNetwork">Prelim Network</InputLabel>
            <Select
              native
              label="Prelim Network"
              inputProps={{
                name: 'prelimNetwork',
                id: 'prelimNetwork',
              }}
              onChange={handleChangeCreate}
            >
              <option aria-label="None" value={event.earlyPrelimNetwork} />
              {networks?.map( network => (<option key={network._id} value={network._id}>{network.name}</option>)) }
            </Select>
          </FormControl>
          <br /> <br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="earlyPrelimNetwork">Early Prelim Network</InputLabel>
            <Select
              native
              label="Early Prelim Network"
              inputProps={{
                name: 'earlyPrelimNetwork',
                id: 'earlyPrelimNetwork',
              }}
              onChange={handleChangeCreate}
            >
              <option aria-label="None" value={event.prelimNetwork} />
              {networks?.map( network => (<option key={network._id} value={network._id}>{network.name}</option>)) }
            </Select>
          </FormControl>
          <br /> <br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="organization">Organizations</InputLabel>
            <Select
              native
              label="organization"
              inputProps={{
                name: 'organization',
                id: 'organization',
              }}
              onChange={handleChangeCreate}
            >
              <option aria-label="None" value={event.organization} />
              {organizations?.map( organization => (<option key={organization._id} value={organization._id}>{organization.name}</option>)) }
            </Select>
          </FormControl>
          <div style={{marginTop:"20px", display:"flex", justifyContent:"space-between"}}>
          <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="secondary" type="submit">Add Event</Button>
          </div>
        </form>
      </div>
    )
  }

  const showDeleteForm = () => {
    return (
      <form onSubmit={handleDeleteEvent}><h2 id="transition-modal-title">Delete Event</h2>
      <p id="transition-modal-description">Are you sure you want to delete this event?</p>
      <div style={{display:"flex", justifyContent:"space-between", marginTop:"20px"}}>
      <Button variant="contained" color="primary" onClick={handleClose}>No</Button>
     <Button variant="contained" type="submit" color="secondary">Yes</Button>
      </div></form>
    )
  }

  return (
    <div>
     <Container>
     <TextField style={{width:"200px"}} id="filled-search" onChange={handleEventSearch} label="Search Event" type="search" variant="filled" />
    <div style={{textAlign:"right", marginBottom:"20px"}}>
      <Button color="primary" onClick={()=>handleOpen(null, "create")}    startIcon={<AddIcon />}>
        Create
      </Button>
    </div>
    </Container>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
      <Table  stickyHeader aria-label="sticky table">
      <TableHead>
          <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Created At</b></TableCell>
            <TableCell><b>Updated At</b></TableCell>
            <TableCell align="center"><b>Name</b></TableCell>
            <TableCell align="left"><b>Location</b></TableCell>
            <TableCell align="center"><b>Venue</b></TableCell>
            <TableCell align="left"><b>Date</b></TableCell>
            <TableCell align="left"><b>Main card time</b></TableCell>
            <TableCell align="left"><b>Prilim time</b></TableCell>
            <TableCell align="left"><b>Early prilim time</b></TableCell>
            <TableCell align="left"><b>Maincard network</b></TableCell>
            <TableCell align="left"><b>Prelim network</b></TableCell>
            <TableCell align="left"><b>early prelim network</b></TableCell>
            <TableCell align="left"><b>Organization</b></TableCell>
            <TableCell align="center"><b>Edit</b></TableCell>
            <TableCell align="center"><b>Delete</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {filterEvents?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((event) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={event._id}>
                <TableCell align="left">{event._id}</TableCell>
            <TableCell align="left">{moment(event.createdAt).format("ll")}</TableCell>
            <TableCell align="left">{event.updatedAt && moment(event.updatedAt).format("ll")}</TableCell>
            <TableCell align="left">{event.name}</TableCell>
            <TableCell align="left">{event.location}</TableCell>
            <TableCell align="left">{event.venue}</TableCell>
            <TableCell align="left">{event.date && moment(event.date).format("ll")}</TableCell>
            <TableCell align="left">{event.mainCardTime && moment(event.mainCardTime).format("h:mm a")}</TableCell>
            <TableCell align="left">{event.prelimTime && moment(event.prelimTime).format("h:mm a")}</TableCell>
            <TableCell align="left">{event.earlyPrelimTime && moment(event.earlyPrelimTime).format("h:mm a")}</TableCell>
            <TableCell align="left">{event.mainCardNetwork && event.mainCardNetwork.name}</TableCell>
            <TableCell align="left">{event.prelimNetwork && event.prelimNetwork.name}</TableCell>
            <TableCell align="left">{event.earlyPrelimNetwork && event.earlyPrelimNetwork.name}</TableCell>
            <TableCell align="left">{event.organization && event.organization.name}</TableCell>
            <TableCell align="right"><Button color="primary" onClick={()=>handleOpen(event, "edit")}   startIcon={<CreateIcon />}>Edit</Button></TableCell>
              <TableCell align="right"><Button color="secondary" onClick={()=>handleOpen(event, "delete")}  startIcon={<DeleteIcon />}>Delete</Button></TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={events?.length}
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
          timeout: 500,
        }}
      >
        <Fade in={open.modal}>
          <div className={classes.paper}>
          {open.modalContent === "create" && showCreateForm()}
          {open.modalContent === "edit" && showEditForm()}
          {open.modalContent === "delete" && showDeleteForm()}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default Events
