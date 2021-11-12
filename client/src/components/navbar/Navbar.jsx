import { useState, useEffect } from "react";
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from "./styles";
import { withStyles } from '@material-ui/core/styles';

import { Link, useHistory, useLocation } from "react-router-dom";
import { logout } from "../../utils";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SendIcon from '@material-ui/icons/Send';
import DraftsIcon from '@material-ui/icons/Drafts';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// import logoIcon from "/images/logo-icon.png";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function Navbar() {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const [state, setState] = useState({left: false});
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("authorized")));
  const history = useHistory();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  const handleLogout = () => {
    logout()
    history.push("/logout")
  }

  useEffect(()=>{
    const token = user?.token;
    // console.log("props from use effect: ", props.authData)
    setUser(JSON.parse(localStorage.getItem("authorized")))
  },[location])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

// if (location.pathname === "/admin" || location.pathname === `/admin/events` || location.pathname === `/admin/fighters` || location.pathname === `/admin/matches`) return null
  return (
    // <div className={classes.root} style={{paddingTop: !matches? "26px" : "108px"}}>
    <div className={classes.root}>
      <AppBar  className={classes.topNavbar}>
      <Container>
        <Toolbar style={{display:"flex", justifyContent:"space-between"}}>
        {!matches &&<>
          <IconButton onClick={toggleDrawer("left", true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            anchor="left"
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {list("left")}
          </SwipeableDrawer>
        </> }
          {/* <Typography component={Link} to="/" variant="h4" color="inherit" style={{textAlign: !matches? "right" : "left" }} className={`${classes.title} logo`}>
            FIGHT <span>DIVISION</span>
          </Typography> */}
          <a href="/" className="logo" style={{textAlign:"center", display:"flex", alignItems:"center"}}>
            <img style={{width:"100%", height:"40px", marginRight:"5px"}} src="./images/logo-icon.png" alt="" />
          </a>
          {matches && <>
            {/* {user ? <Button  onClick={handleLogout} color="inherit">Logout</Button>  */}
            {user ?  <div>
      {/* <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Open Menu
        
      </Button> */}
      <AccountCircleIcon style={{cursor:"pointer"}} fontSize="large" onClick={handleClick}/>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
      <a href="/">
        <StyledMenuItem>
          <ListItemIcon>
          <HomeIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </StyledMenuItem>
      </a>
      <a href="/dashboard">
        <StyledMenuItem>
          <ListItemIcon>
            <DashboardIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </StyledMenuItem>
      </a>
      <a href="/picks">
        <StyledMenuItem>
          <ListItemIcon>
          <SportsKabaddiIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Picks" />
        </StyledMenuItem>
      </a>
        <StyledMenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="large" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </StyledMenuItem>
      </StyledMenu>
    </div> : <div>
            <Button component={Link} to="/login" className="nav-buttons" color="inherit" style={{fontWeight:"bold", color:"grey"}} >Login</Button>
            <span>|</span>
          <Button component={Link} to="/register" className="nav-buttons" color="inherit" style={{fontWeight:"bold", color:"grey"}}>Signup</Button>
          </div>}
          </>}
        </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
