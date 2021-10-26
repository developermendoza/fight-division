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
import { Link, useHistory, useLocation } from "react-router-dom";
import { logout } from "../../utils";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Container } from '@material-ui/core';



export default function Navbar() {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');
  const [state, setState] = useState({left: false});
  const [ user, setUser ] = useState(JSON.parse(localStorage.getItem("authorized")));
  const history = useHistory();
  const location = useLocation();



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

if (location.pathname === "/admin" || location.pathname === `/admin/events` || location.pathname === `/admin/fighters` || location.pathname === `/admin/matches`) return null
  return (
    // <div className={classes.root} style={{paddingTop: !matches? "26px" : "108px"}}>
    <div className={classes.root}>
      <AppBar  className={classes.topNavbar}>
      <Container>
        <Toolbar>
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
          <Typography component={Link} to="/" variant="h6" color="inherit" style={{textAlign: !matches? "right" : "left" }} className={`${classes.title} logo`}>
            Underground <span className="primary-text-color">Fighter</span>
          </Typography>
          {matches && <>
            {user ? <Button  onClick={handleLogout} color="inherit">Logout</Button> : <>
            <Button component={Link} to="/login" color="inherit" className="btn">Login</Button>
          <Button component={Link} to="/register" color="inherit" className="btn btn-primary">Signup</Button>
          </>}
          </>}
        </Toolbar>
        </Container>
      </AppBar>
    </div>
  )
}
