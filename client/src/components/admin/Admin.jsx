import React from 'react'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import GroupIcon from '@material-ui/icons/Group';
import EventSeatIcon from '@material-ui/icons/EventSeat';
import SportsKabaddiIcon from '@material-ui/icons/SportsKabaddi';
import WcIcon from '@material-ui/icons/Wc';
import {
  Switch,
  Link,
  Route,
  useHistory,
  useRouteMatch
} from "react-router-dom";

import Home from './Home';
import AdminSections from './AdminSections';
import AdminLogin from './AdminLogin';
import { adminUserAuthenticated, adminLogout } from "../../utils";
import { Button } from '@material-ui/core';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  title: {
    flexGrow: 1,
  },
}));

function Admin({match}) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [section, setSection] = React.useState("users");
  let { path, url } = useRouteMatch();
  const history = useHistory();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    adminLogout()
    history.push("/admin")
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const showComponent = (text) => {
    setSection(text)
  }


  if(!adminUserAuthenticated()) return <AdminLogin />

  return (
    <div>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            Admin - <span style={{fontWeight:"bold", fontStyle:"italic", fontSize:"16px"}}>{section}</span>
          </Typography>
          <Button color="warning" variant="contained" onClick={handleLogout}>
                Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={ () => showComponent("users")} >
              <Link to={url}>
                <ListItemIcon><GroupIcon />
                </ListItemIcon>
                </Link>
                <Link to={url}>
              <ListItemText primary={"users"} />
              </Link>
          </ListItem>
          <ListItem button onClick={ () => showComponent("events")} >
              <Link to={`${url}/events`}><ListItemIcon><EventSeatIcon /></ListItemIcon></Link>
              <Link to={`${url}/events`}>
              <ListItemText primary={"events"} />
              </Link>
          </ListItem>
          <ListItem button onClick={ () => showComponent("matches")} >
              <Link to={`${url}/matches`}><ListItemIcon><SportsKabaddiIcon /></ListItemIcon></Link>
              <Link to={`${url}/matches`}>
              <ListItemText primary={"matches"} />
              </Link>
          </ListItem>
          <ListItem button onClick={ () => showComponent("fighters")} >
              <Link to={`${url}/fighters`}><ListItemIcon><WcIcon /></ListItemIcon></Link>
              <Link to={`${url}/fighters`}>
              <ListItemText primary={"fighters"} />
              </Link>
          </ListItem>
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
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
            <Route path={path}  component={Home} exact/>
            <Route path={`${path}/:adminSection`}>
              <AdminSections />
            </Route>
          </Switch>
      </main>
    </div>
    </div>
  )
}

export default Admin
