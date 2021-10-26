


import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Container, Box, Avatar, Grid, TablePagination} from "@material-ui/core";
import React, {useEffect} from 'react';
import { getUsers, removeUser, updateUser, createUser } from "../../../actions/users";
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import moment from "moment"
import AddIcon from '@material-ui/icons/Add';
import ImageUploading from "react-images-uploading";
import { DataGrid } from '@material-ui/data-grid';
import { Link, useParams } from "react-router-dom";


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



function Users() {

const dispatch = useDispatch();
const users = useSelector(state => state.users.data);
const [open, setOpen] = React.useState(false);
const [userId, setUserId] = React.useState();
const [modalWindow, setModalWindow] = React.useState()
const [userToEdit, setUserToEdit] = React.useState()
const [editUser, setEditUser] = React.useState({})
const [addUser, setAddUser] = React.useState()
const [user, setUser] = React.useState({})
const [images, setImages] = React.useState([]);

const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(10);
const [filterUsers, setFilterUsers ] = React.useState([])

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};



useEffect(() => {
  dispatch(getUsers());
}, [dispatch]);

useEffect(() => {
  if(users){
    setFilterUsers(users)
  }
}, [users])

const handleDeleteUser = (id) => {
  dispatch(removeUser(id))
  handleClose()
}


const handleChange = (e) => {
  const { name, value } = e.target;
  setEditUser({
    ...userToEdit,
    ...editUser,
    [name]:value,
  })
}

const handleChangeCreate = (e) => {
  setUser({
    ...user,
    [e.target.name]:e.target.value
  })
}

const handleSubmitEdit = (e) => {
  e.preventDefault()

  dispatch(updateUser(editUser));
  setOpen(false);
  setImages([])
}

const handleSubmitAdd = (e) => {
  e.preventDefault()

  dispatch(createUser(user))
  setOpen(false);
  setImages([])
}

const onImageChange = (imageList, addUpdateIndex) => {
  setImages(imageList);
  setUser({
    ...user,
    image:imageList[0]?.data_url
  })
}

const onImageEditChange = (imageList, addUpdateIndex) => {

  setImages(imageList);
  setEditUser({
    ...userToEdit,
    ...editUser,
    image:imageList[0]?.data_url
  })
}
const handleOpen = (user, modalType) => {
  if(modalType === "edit"){
    setUserToEdit(user)
  }

  if (user !== null) setUserId(user._id)
  setModalWindow(modalType)
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
  setUser({})
  setImages([])
};

const handleUserSearch = (e) => {
  if(!e.target.value){
     setFilterUsers(users)
   }else{
    const filtered = filterUsers.filter(user =>  {
      return user.username.toLowerCase().includes(e.target.value)
    });
    setFilterUsers(filtered)
   }
}

  const classes = useStyles();
  return (
    <div>
   <Container>
   <TextField style={{width:"200px"}} id="filled-search" onChange={handleUserSearch} label="Search User" type="search" variant="filled" />
    <div style={{textAlign:"right", marginBottom:"20px"}}>
      <Button color="primary" onClick={()=>handleOpen(null, "add")}  startIcon={<AddIcon />}>
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
            <TableCell align="right"><b>Username</b></TableCell>
            <TableCell align="center"><b>Email</b></TableCell>
            <TableCell align="center"><b>Rank</b></TableCell>
            <TableCell align="right"><b>Total Points</b></TableCell>
            <TableCell align="right"><b>Match Total Points</b></TableCell>
            <TableCell align="right"><b>Match Round Total Points</b></TableCell>
            <TableCell align="right"><b>Match Outcome Points</b></TableCell>
            <TableCell align="center"><b>Edit</b></TableCell>
            <TableCell align="center"><b>Delete</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {filterUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={user._id}>
                <TableCell component="th" scope="row">
                {user._id}
              </TableCell>
              <TableCell align="left">{moment(user.createdAt).format("ll")}</TableCell>
              <TableCell align="left">{user.updatedAt && moment(user.updatedAt).format("ll")}</TableCell>
              <TableCell align="right">{user.username}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="center">{user.rank}</TableCell>
              <TableCell align="right">{user.totalPoints}</TableCell>
              <TableCell align="right">{user.matchTotalPoints}</TableCell>
              <TableCell align="right">{user.roundTotalPoints}</TableCell>
              <TableCell align="right">{user.matchOutcomePoints}</TableCell>
              <TableCell align="right"><Button color="primary" onClick={()=>handleOpen(user, "edit") }  startIcon={<CreateIcon />}>Edit</Button></TableCell>
              <TableCell align="right"><Button color="secondary" onClick={()=>handleOpen(user, "delete") } startIcon={<DeleteIcon />}>Delete</Button></TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
     
    </TableContainer>
    <TablePagination
    rowsPerPageOptions={[10, 25, 100]}
    component="div"
    count={users?.length}
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
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
        <div className={classes.paper}>
        {modalWindow === "delete" && <>
          <h2 id="transition-modal-title">Delete User</h2>
             <p id="transition-modal-description">Are you sure you want to delete this user?</p>
             <div style={{display:"flex", justifyContent:"space-between", marginTop:"20px"}}>
             <Button variant="contained" color="primary" onClick={handleClose}>No</Button>
            <Button variant="contained" color="secondary" onClick={()=>handleDeleteUser(userId)}>Yes</Button>
             </div>
        </>}

        {modalWindow === "add" && <>
        <Container maxWidth="sm">
             <h2 id="transition-modal-title">Add User</h2>
             <form action="" autoComplete="off"  onSubmit={handleSubmitAdd}>
             <div style={{display:"flex", alignItems:"center"}}> 
             <ImageUploading
              multiple
              value={images}
              onChange={onImageChange}
              dataURLKey="data_url"
            >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
          // write your building UI
            <div className="upload__image-wrapper" style={{margin: "20px 0"}}>
            <Button size="small" variant="contained" color="primary" 
                type="button"
                onClick={onImageUpload}
              >
                Upload Image
              </Button>
              &nbsp;
              <br /><br />
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['data_url']} alt="" width="100" />
                  <div className="image-item__btn-wrapper" style={{margin: "20px 0"}}>
                    <Button style={{marginRight:"10px"}} type="button" size="small" variant="contained" color="primary"  onClick={() => onImageUpdate(index)}>Update</Button>
                    <Button type="button" size="small" variant="contained" color="secondary" onClick={() => onImageRemove(index)}>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
             </div>
                <TextField 
                    defaultValue={user.username} 
                    fullWidth
                    label="username"
                    variant="filled"
                    color="secondary"
                    name="username"
                    onChange={handleChangeCreate}
                  />
                <TextField
                    type="email" 
                    defaultValue={user.email} 
                    fullWidth
                    label="email"
                    variant="filled"
                    color="secondary"
                    name="email"
                    onChange={handleChangeCreate}
                  />
                  <TextField
                    type="string" 
                    defaultValue={user.password} 
                    fullWidth
                    label="password"
                    name="password"
                    variant="filled"
                    color="secondary"
                    onChange={handleChangeCreate}
                  />
                  <div style={{marginTop:"20px", display:"flex", justifyContent:"space-between"}}>
                  <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
                  <Button variant="contained" color="secondary" type="submit">Add user</Button>
                  </div>
             </form>
             </Container>
        </>}

        {modalWindow === "edit" && <>
             <Container maxWidth="sm">
             <h2 id="transition-modal-title">Edit User</h2>
             <form action="" autoComplete="off" onSubmit={handleSubmitEdit}>
             <div style={{display:"flex", alignItems:"center"}}> 
             <img src={userToEdit.image} style={{width:"100px", marginRight:"10px", marginBottom:"10px"}} />
             <ImageUploading
              multiple
              value={images}
              onChange={onImageEditChange}
              dataURLKey="data_url"
            >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
          // write your building UI
            <div className="upload__image-wrapper" style={{margin: "20px 0"}}>
            <Button size="small" variant="contained" color="primary" 
                type="button"
                onClick={onImageUpload}
              >
                Upload Image
              </Button>
              &nbsp;
              <br /><br />
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['data_url']} alt="" width="100" />
                  <div className="image-item__btn-wrapper" style={{margin: "20px 0"}}>
                    <Button style={{marginRight:"10px"}} type="button" size="small" variant="contained" color="primary"  onClick={() => onImageUpdate(index)}>Update</Button>
                    <Button type="button" size="small" variant="contained" color="secondary" onClick={() => onImageRemove(index)}>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
             </div>
                <TextField 
                    defaultValue={userToEdit._id} 
                    fullWidth
                    disabled 
                    id="standard-full-width"
                    label="Id"
                    variant="filled"
                    color="secondary"
                  />
                <TextField 
                    defaultValue={userToEdit.username} 
                    fullWidth
                    label="username"
                    variant="filled"
                    color="secondary"
                    name="username"
                    onChange={handleChange}
                  />
                <TextField
                    type="email" 
                    defaultValue={userToEdit.email} 
                    fullWidth
                    label="email"
                    variant="filled"
                    color="secondary"
                    name="email"
                    onChange={handleChange}
                  />
                  <TextField
                    type="number" 
                    defaultValue={userToEdit.rank} 
                    fullWidth
                    label="rank"
                    name="rank"
                    variant="filled"
                    color="secondary"
                    onChange={handleChange}
                  />
                  <TextField
                    type="number" 
                    defaultValue={userToEdit.totalPoints} 
                    fullWidth
                    label="totalPoints"
                    name="totalPoints"
                    variant="filled"
                    color="secondary"
                    onChange={handleChange}
                  />
                  <TextField
                    type="number" 
                    defaultValue={userToEdit.matchTotalPoints} 
                    fullWidth
                    name="matchTotalPoints"
                    label="matchTotalPoints"
                    variant="filled"
                    color="secondary"
                    onChange={handleChange}
                  /> 
                  <TextField
                    type="number" 
                    defaultValue={userToEdit.roundTotalPoints} 
                    name="roundTotalPoints"
                    fullWidth
                    label="roundTotalPoints"
                    variant="filled"
                    color="secondary"
                    onChange={handleChange}
                  />
                  <TextField
                    type="number" 
                    defaultValue={userToEdit.matchOutcomePoints} 
                    fullWidth
                    name="matchOutcomePoints"
                    label="matchOutcomePoints"
                    variant="filled"
                    color="secondary"
                    onChange={handleChange}
                  />
                  <div style={{marginTop:"20px", display:"flex", justifyContent:"space-between"}}>
                  <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
                  <Button variant="contained" color="secondary" type="submit">Edit user</Button>
                  </div>
             </form>
             </Container>
        </>}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Users




