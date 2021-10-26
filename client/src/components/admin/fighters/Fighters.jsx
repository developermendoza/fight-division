import React, {useEffect} from 'react';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Container, TablePagination,Box, Avatar, Grid, Button, InputLabel, Select ,TableBody, Modal,Radio, Fade,Backdrop,FormControl,FormControlLabel,FormLabel,SearchField,RadioGroup ,TextField} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import { getFighters, addFighter, editFighter } from "../../../actions/fighters";
import { getWeights } from "../../../actions/weights";
import { getOrganizations } from "../../../actions/organizations";
import { useDispatch, useSelector } from 'react-redux';
import moment from "moment";
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import ImageUploading from "react-images-uploading";


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

function Fighters(props) {

  const initialState = {
    firstname:"",
    lastname:"",
    nickname:"",
    wins:"",
    losses:"",
    draws:"0",
    noContest:"",
    isChampion:"no",
    rank:"",
    image:"",
    imageLeft:"",
    imageRight:"",
    organization:"",
    weight:""
  }

  const dispatch = useDispatch();
  const fighters = useSelector(state => state.fighters.data);
  const weights = useSelector(state => state.weights.data);
  const organizations = useSelector(state => state.organizations.data);
  const classes = useStyles();
  const [open, setOpen] = React.useState({modalContent:"",modal:false});
  const [ fighter, setFighter ] = React.useState(initialState)
  const [images, setImages] = React.useState([]);
  const [imagesLeft, setImagesLeft] = React.useState([]);
  const [imagesRight, setImagesRight] = React.useState([]);
  const [ updateFighter, setUpdateFighter] = React.useState({})
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterFighters, setFilterFighters] = React.useState([])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    dispatch(getFighters());
    dispatch(getWeights());
    dispatch(getOrganizations());
  }, [dispatch]);

  useEffect(() => {
    if(fighters){
     const allFighters = fighters?.map( fighter => {
       return {
         ...fighter,
         fullname : fighter.firstname + " " + fighter.lastname
       }
     });
      setFilterFighters(allFighters)
    }
  },[fighters])

  const onImageChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setFighter({
      ...fighter,
      image:imageList[0]?.data_url
    })
  }

  const onImageLeftChange = (imageList, addUpdateIndex) => {
    setImagesLeft(imageList);
    setFighter({
      ...fighter,
      imageLeft:imageList[0]?.data_url
    })
  }

  const handleFighterSearch = (e) => {

    if(!e.target.value){
      const allFighters = fighters?.map( fighter => {
        return {
          ...fighter,
          fullname : fighter.firstname + " " + fighter.lastname
        }
      });
       setFilterFighters(allFighters)
     }else{
      const filtered = filterFighters.filter(fighter =>  {
        return fighter.fullname.toLowerCase().includes(e.target.value)
      });
      setFilterFighters(filtered)
     }
  }

  const onImageRightChange = (imageList, addUpdateIndex) => {
    setImagesRight(imageList);
    setFighter({
      ...fighter,
      imageRight:imageList[0]?.data_url
    })
  }

  const onImageUpdateChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setUpdateFighter({
      ...updateFighter,
      image:imageList[0]?.data_url
    })
  }
  const onImageLeftUpdateChange = (imageList, addUpdateIndex) => {
    setImagesLeft(imageList);
    setUpdateFighter({
      ...updateFighter,
      imageLeft:imageList[0]?.data_url
    })
  }

  const onImageRightUpdateChange = (imageList, addUpdateIndex) => {
    setImagesRight(imageList);
    setUpdateFighter({
      ...updateFighter,
      imageRight:imageList[0]?.data_url
    })
  }

  const handleClose = () => {
    setOpen({modal:false});
    setFighter(initialState)
    setImages([])
  };

  const handleOpen = (modalType, fighter) => {
    modalType === "update" && setUpdateFighter({...fighter, id:fighter._id,isChampion: fighter.isChampion === true ? "yes" : "no", weight:fighter.weight._id, weightName:fighter.weight.name, organization:fighter.organization._id, organizationName:fighter.organization.name})
    setOpen({modal:modalType});
  };

  const handleCreateChange = (e) => {


    setFighter({
      ...fighter,
      [e.target.name]:e.target.value
    })
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    dispatch(addFighter(fighter))
    setOpen({modal:false});
    setFighter(initialState)
    setImages([])
    setImagesLeft([])
    setImagesRight([])
  }
  const handleUpdateChange = (e) => {
    setUpdateFighter({
      ...updateFighter,
      [e.target.name]:e.target.value
    })
  }
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    dispatch(editFighter(updateFighter))
    setOpen({modal:false});
    setUpdateFighter([])
    setImages([])
    setImagesLeft([])
    setImagesRight([])
  }


  // ************* CREATE ****************
  const showCreateForm = () => {
    return(
      <div>
      <h2>ADD FIGHTER</h2>
        <form onSubmit={handleCreateSubmit}>
        <FormControl  style={{marginTop:"10px", marginRight:"10px"}}>
          <TextField
              defaultValue={fighter.firstname} 
              label="Firstname"
              name="firstname"
              variant="filled"
              color="secondary"
              onChange={handleCreateChange}
            />
          </FormControl>
          {/* <br /> */}
          <FormControl  style={{marginTop:"10px", marginRight:"10px"}}>
          <TextField
              defaultValue={fighter.lastname} 
              label="Lastname"
              name="lastname"
              variant="filled"
              color="secondary"
              onChange={handleCreateChange}
            />
          </FormControl>
          {/* <br /> */}
          <FormControl  style={{marginTop:"10px"}}>
          <TextField
              defaultValue={fighter.nickname} 
              label="Nickname"
              name="nickname"
              variant="filled"
              color="secondary"
              onChange={handleCreateChange}
            />
          </FormControl>
          <br />
          <FormControl style={{marginTop:"10px", marginRight:"10px"}}>
          <TextField
              type="number"
              defaultValue={fighter.wins} 
              label="Wins"
              name="wins"
              variant="filled"
              color="secondary"
              onChange={handleCreateChange}
            />
          </FormControl>
          <FormControl  style={{marginTop:"10px", marginRight:"10px"}}>
          <TextField
              type="number"
              defaultValue={fighter.losses}
              label="Losses"
              name="losses"
              variant="filled"
              color="secondary"
              onChange={handleCreateChange}
            />
          </FormControl>
          <FormControl  style={{marginTop:"10px"}}>
          <TextField
              type="number"
              defaultValue={fighter.draws}
              label="Draws"
              name="draws"
              variant="filled"
              color="secondary"
              onChange={handleCreateChange}
            />
          </FormControl>
          <br />
          <FormControl fullWidth style={{marginTop:"10px"}}>
          <TextField
              type="number"
              defaultValue={fighter.noContest}
              label="No Contest"
              name="noContest"
              variant="filled"
              color="secondary"
              onChange={handleCreateChange}
            />
          </FormControl>
          <br /><br />
          <FormControl  style={{marginTop:"10px"}}>
          <FormLabel component="legend">Is Champion?</FormLabel>
            <RadioGroup aria-label="isChampion" name="isChampion" onChange={handleCreateChange} row >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={fighter.isChampion === "yes"}/>
              <FormControlLabel value="no" control={<Radio />} label="No" checked={fighter.isChampion === "no"}/>
            </RadioGroup>
          </FormControl>
          <FormControl style={{marginTop:"10px"}}>
          <TextField
              type="number"
              defaultValue={fighter.rank} 
              label="Rank"
              name="rank"
              variant="filled"
              color="secondary"
              onChange={handleCreateChange}
            />
          </FormControl>
          
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
             <div style={{display:"flex", alignItems:"center"}}> 
             <ImageUploading
              multiple
              value={imagesLeft}
              onChange={onImageLeftChange}
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
                Upload Left Image
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
          <br /><br />
          <div style={{display:"flex", alignItems:"center"}}> 
             <ImageUploading
              multiple
              value={imagesRight}
              onChange={onImageRightChange}
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
                Upload Right Image
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
        <br /><br />
             </div>
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
              <option aria-label="None" value={fighter.weight}></option>  
              {weights?.map( weight => (<option key={weight._id} data-weight={weight.name} value={weight._id}>{weight.name}</option>)) }
            </Select>
          </FormControl>
          <br /><br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="organization">Organizations</InputLabel>
            <Select
              native
              label="Organization"
              inputProps={{
                name: 'organization',
                id: 'organization',
              }}
              onChange={handleCreateChange}
            >
              <option aria-label="None" value={fighter.organization}></option>  
              {organizations?.map( organization => (<option key={organization._id} data-weight={organization.name} value={organization._id}>{organization.name}</option>)) }
            </Select>
          </FormControl>
          <div style={{marginTop:"20px", display:"flex", justifyContent:"space-between"}}>
          <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="secondary" type="submit">Add Fighter</Button>
          </div>
        </form>
      </div>
      
    )
  }

  // ************* UPDATE ****************
  const showUpdateForm = () => {
    return(
      <div>
      <h2>UPDATE FIGHTER</h2>
        <form onSubmit={handleUpdateSubmit}>
        <FormControl  style={{marginTop:"10px", marginRight:"10px"}}>
          <TextField
              defaultValue={updateFighter.firstname} 
              label="Firstname"
              name="firstname"
              variant="filled"
              color="secondary"
              onChange={handleUpdateChange}
            />
          </FormControl>
          {/* <br /> */}
          <FormControl  style={{marginTop:"10px", marginRight:"10px"}}>
          <TextField
              defaultValue={updateFighter.lastname} 
              label="Lastname"
              name="lastname"
              variant="filled"
              color="secondary"
              onChange={handleUpdateChange}
            />
          </FormControl>
          {/* <br /> */}
          <FormControl  style={{marginTop:"10px"}}>
          <TextField
              defaultValue={updateFighter.nickname} 
              label="Nickname"
              name="nickname"
              variant="filled"
              color="secondary"
              onChange={handleUpdateChange}
            />
          </FormControl>
          <br />
          <FormControl style={{marginTop:"10px", marginRight:"10px"}}>
          <TextField
              type="number"
              defaultValue={updateFighter.wins} 
              label="Wins"
              name="wins"
              variant="filled"
              color="secondary"
              onChange={handleUpdateChange}
            />
          </FormControl>
          <FormControl  style={{marginTop:"10px", marginRight:"10px"}}>
          <TextField
              type="number"
              defaultValue={updateFighter.losses}
              label="Losses"
              name="losses"
              variant="filled"
              color="secondary"
              onChange={handleUpdateChange}
            />
          </FormControl>
          <FormControl  style={{marginTop:"10px"}}>
          <TextField
              type="number"
              defaultValue={updateFighter.draws}
              label="Draws"
              name="draws"
              variant="filled"
              color="secondary"
              onChange={handleUpdateChange}
            />
          </FormControl>
          <br />
          <FormControl fullWidth style={{marginTop:"10px"}}>
          <TextField
              type="number"
              defaultValue={updateFighter.noContest}
              label="No Contest"
              name="noContest"
              variant="filled"
              color="secondary"
              onChange={handleUpdateChange}
            />
          </FormControl>
          <br /><br />
          <FormControl  style={{marginTop:"10px"}}>
          <FormLabel component="legend">Is Champion?</FormLabel>
            <RadioGroup aria-label="isChampion" name="isChampion" onChange={handleUpdateChange} row >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" checked={updateFighter.isChampion === "yes"}/>
              <FormControlLabel value="no" control={<Radio />} label="No" checked={updateFighter.isChampion === "no"}/>
            </RadioGroup>
          </FormControl>
          <FormControl style={{marginTop:"10px"}}>
          <TextField
              type="number"
              defaultValue={updateFighter.rank} 
              label="Rank"
              name="rank"
              variant="filled"
              color="secondary"
              onChange={handleUpdateChange}
            />
          </FormControl>
          <Grid container> 
            {/* {images.length < 1 &&( */}
              <Grid item xs={4}>
              <FormLabel component="legend">Current photo</FormLabel>
              <Avatar src={updateFighter.image} variant="square" style={{width: "80px", height:"80px"}}/>
              <ImageUploading
                multiple
                value={images}
                onChange={onImageUpdateChange}
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
                  Change Photo
                </Button>
                &nbsp;
                <br /><br />
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image['data_url']} alt="" width="100" />
                    <div className="image-item__btn-wrapper" style={{margin: "20px 0"}}>
                      <Button style={{marginRight:"10px"}} type="button" size="small" variant="contained" color="primary"  onClick={() => onImageUpdate(index)}>Update</Button>
                      <Button type="button" size="small" variant="contained" color="secondary" onClick={() => onImageRemove(index) }>Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
              )}
              </ImageUploading>
              </Grid>
            {/* )} */}

           <Grid item xs={4}>
            <FormLabel component="legend">Current left photo</FormLabel>
            <Avatar src={updateFighter.imageLeft} variant="square" style={{width: "80px", height:"80px"}}/>
            <ImageUploading
              multiple
              value={imagesLeft}
              onChange={onImageLeftUpdateChange}
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
                Change Left Photo
              </Button>
              &nbsp;
              <br /><br />
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['data_url']} alt="" width="100" />
                  <div className="image-item__btn-wrapper" style={{margin: "20px 0"}}>
                    <Button style={{marginRight:"10px"}} type="button" size="small" variant="contained" color="primary"  onClick={() => onImageUpdate(index)}>Update</Button>
                    <Button type="button" size="small" variant="contained" color="secondary" onClick={() => onImageRemove(index) }>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
          </Grid>

        <Grid item xs={4}>
            <div>
            <FormLabel component="legend">Current right photo</FormLabel>
            <Avatar src={updateFighter.imageRight} variant="square" style={{width: "80px", height:"80px"}}/>
          </div>
        <ImageUploading
              multiple
              value={imagesRight}
              onChange={onImageRightUpdateChange}
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
                Change Right Photo
              </Button>
              &nbsp;
              <br /><br />
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['data_url']} alt="" width="100" />
                  <div className="image-item__btn-wrapper" style={{margin: "20px 0", display:"flex", justifyContent:"space-between"}}>
                    <Button style={{marginRight:"10px"}} type="button" size="small" variant="contained" color="primary"  onClick={() => onImageUpdate(index)}>Update</Button>
                    <Button type="button" size="small" variant="contained" color="secondary" onClick={() => onImageRemove(index) }>Remove</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ImageUploading>
        </Grid>
          </Grid>
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
              <option aria-label="None" value={updateFighter.weight}>{updateFighter.weightName}</option>  
              {weights?.map( weight => (<option key={weight._id} data-weight={weight.name} value={weight._id}>{weight.name}</option>)) }
            </Select>
          </FormControl>
          <br /><br />
          <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel htmlFor="organization">Organizations</InputLabel>
            <Select
              native
              label="Organization"
              inputProps={{
                name: 'organization',
                id: 'organization',
              }}
              onChange={handleUpdateChange}
            >
              <option aria-label="None" value={updateFighter.organization}>{updateFighter.organizationName}</option>  
              {organizations?.map( organization => (<option key={organization._id} data-weight={organization.name} value={organization._id}>{organization.name}</option>)) }
            </Select>
          </FormControl>
          <div style={{marginTop:"20px", display:"flex", justifyContent:"space-between"}}>
          <Button variant="contained" color="primary" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="secondary" type="submit">Update Fighter</Button>
          </div>
        </form>
      </div>
    )
  }
  const showDeleteForm = () => {
    return(
      <div>Delete</div>
    )
  }

  return (
    <div>
     <Container>
     <TextField style={{width:"200px"}} id="filled-search" onChange={handleFighterSearch} label="Search fighter" type="search" variant="filled" />
    <div style={{textAlign:"right", marginBottom:"20px"}}>
      <Button color="primary" onClick={()=>handleOpen("create", null)}   startIcon={<AddIcon />}>
        Create
      </Button>
    </div>
    </Container>
    <Paper className={classes.root}>
    <TableContainer className={classes.container}>
      <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell><b>ID</b></TableCell>
            <TableCell><b>Created At</b></TableCell>
            <TableCell><b>Updated At</b></TableCell>
            <TableCell align="left"><b>Rank</b></TableCell>
            <TableCell align="left"><b>Firstname</b></TableCell>
            <TableCell align="left"><b>Lastname</b></TableCell>
            <TableCell align="left"><b>Nickname</b></TableCell>
            <TableCell align="left"><b>Wins</b></TableCell>
            <TableCell align="left"><b>Losses</b></TableCell>
            <TableCell align="left"><b>Draws</b></TableCell>
            <TableCell align="left"><b>No Contest</b></TableCell>
            <TableCell align="left"><b>Champion</b></TableCell>
            <TableCell align="left"><b>Weight</b></TableCell>
            <TableCell align="center"><b>Edit</b></TableCell>
            <TableCell align="center"><b>Delete</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterFighters?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((fighter) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={fighter._id}><TableCell align="left">{fighter._id}</TableCell>
            <TableCell align="left">{moment(fighter.createdAt).format("ll h:mm a")}</TableCell>
            <TableCell align="left">{fighter.updatedAt && moment(fighter.updatedAt).format("ll h:mm a")}</TableCell>
            <TableCell align="left">{fighter.rank}</TableCell>
            <TableCell align="left">{fighter.firstname}</TableCell>
            <TableCell align="left">{fighter.lastname}</TableCell>
            <TableCell align="left">{fighter.nickname}</TableCell>
            <TableCell align="left">{fighter.wins}</TableCell>
            <TableCell align="left">{fighter.losses}</TableCell>
            <TableCell align="left">{fighter.draws}</TableCell>
            <TableCell align="left">{fighter.noContest}</TableCell>
            <TableCell align="left">{fighter.isChampion && "Yes"}</TableCell>
            <TableCell align="left">{fighter?.weight?.name}</TableCell>
            <TableCell align="right"><Button color="primary" onClick={()=>handleOpen("update", fighter)}   startIcon={<CreateIcon />}>Edit</Button></TableCell>
            <TableCell align="right"><Button color="secondary" onClick={()=>handleOpen("delete", fighter)}  startIcon={<DeleteIcon />}>Delete</Button></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={fighters?.length}
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
          timeout: 100,
        }}
      >
        <Fade in={open.modal} >
          <div className={classes.paper}>
          {open.modal === "create" && showCreateForm()}
          {open.modal === "update" && showUpdateForm()}
          {open.modal === "delete" && showDeleteForm()}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default Fighters
