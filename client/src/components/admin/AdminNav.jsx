
// import { Admin as ReactAdmin, Resource, ListGuesser, EditGuesser, ShowGuesser } from 'react-admin';
// import { createHashHistory } from 'history';
// import { Provider } from 'react-redux';
// // import createAdminStore from "../../createAdminStore"
// import createAdminStore from '../../createAdminStore';
// import UserList from "./users/UserList";
// import PostList from "./posts/PostList";
// import PostCreate from "./posts/PostCreate";
// import UserCreate from "./users/UserCreate";

// import UserEdit from "./users/UserEdit";

// import EventList from "./events/EventList";
// import EventCreate from "./events/EventCreate";
// import NetworkList from "./networks/NetworkList";
// import dataProvider from './DataProvider';
// import jsonServerProvider from 'ra-data-json-server';
// import jsonapiClient from "ra-jsonapi-client";
// import simpleRestProvider from 'ra-data-simple-rest';
// import UserShow from './users/UserShow';
// import PostEdit from './posts/PostEdit';
// import polyglotI18nProvider from 'ra-i18n-polyglot';
// import defaultMessages from 'ra-language-english';


// const history = createHashHistory();
// const authProvider = () => Promise.resolve();

// function Admin() {
//   return (
//     <Provider
//         store={createAdminStore({
//             authProvider,
//             dataProvider,
//             history,
//         })}
//     >
//         <ReactAdmin
//             authProvider={authProvider}
//             dataProvider={dataProvider}
//             history={history}
//             title="My Admin"
//         >
//             <Resource 
//               name="users" 
//               list={UserList} 
//               create={UserCreate} 
//               edit={UserEdit}
//               show={UserShow}
//               // list={ListGuesser}
//               // edit={EditGuesser}
//               />

//             <Resource 
//               name="events" 
//               list={EventList}
//               create={EventCreate}
//             />

//             <Resource 
//               name="networks" 
//               list={NetworkList}
//             />
//         </ReactAdmin>
//     </Provider>
//   )
// }

// export default Admin;



import React from 'react';
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


import Users from "./users/Users";
import Events from './events/Events';
import Matches from "./matches/Matches";
import Fighters from './fighters/Fighters';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
}));

 function AdminNav() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [section, setSection] = React.useState("Users");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const showComponent = (text) => {
    setSection(text)
  }

  return (
    <div className={classes.root}>
    {/* <Router> */}
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
          <Typography variant="h6" noWrap>
            Admin - <span style={{fontWeight:"bold", fontStyle:"italic", fontSize:"16px"}}>{section}</span>
          </Typography>
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
          {['Users', 'Events', 'Matches', 'Fighters'].map((text, index) => (
            <ListItem button onClick={ () => showComponent(text)} key={text}>
              <ListItemIcon>{(text === "Users" && <GroupIcon />) || (text === "Events" && <EventSeatIcon/>) || (text === "Matches" && <SportsKabaddiIcon/>) || ( text === "Fighters" && <WcIcon/>)}</ListItemIcon>
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
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {section === "Users" && <Users />}
        {section === "Events" && <Events />}
        {section === "Matches" && <Matches />}
        {section === "Fighters" && <Fighters />}
     
      </main>
    </div>
  );
}

export default AdminNav;

// import React from 'react'

// function Admin() {
//   return (
//     <div>
//       Admin component
//     </div>
//   )
// }

// export default Admin
