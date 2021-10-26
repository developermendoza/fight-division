import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Link,
  useParams,
  useRouteMatch,
  Route
} from "react-router-dom";
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Login from './components/login/Login';
import Register from './components/register/Register';
import RecoverPassword from './components/recover-password/RecoverPassword';
import PrivateRoute from './components/private/PrivateRoute';
import Dashboard from './components/private/dashboard/Dashboard';
import PublicRoute from './components/publicRoute/PublicRoute';
import Logout from './components/logout/Logout';
import Admin from "./components/admin/Admin";
import NotFound from "./components/404/NotFound";
import Picks from './components/private/picks/Picks';
import Footer from './components/footer/Footer';
import Users from './components/admin/users/Users';
import AdminNav from './components/admin/AdminNav';
import  Events  from './components/admin/events/Events';
import  Fighters  from './components/admin/fighters/Fighters';
import  Matches  from './components/admin/matches/Matches';
import { makeStyles, useTheme } from '@material-ui/core/styles';

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


// export default App;

function App() {
  return (
      <Router>
      <div className="App">
      <Navbar />
      <Switch>
      <PublicRoute restricted={false} path="/" component={Home} exact/>
      <PublicRoute restricted={true}  path="/login" component={Login}/>
      <PublicRoute restricted={true}  path="/register" component={Register} />
      <PublicRoute restricted={true}  path="/recover-password" component={RecoverPassword} />
      <PublicRoute restricted={true}  path="/logout" component={Logout} />
      <PrivateRoute path="/dashboard" component={Dashboard}  />
      <PrivateRoute path="/picks" component={Picks}  />
      <Route path='/admin' component={Admin} />
       <PublicRoute restricted={false}  path="*" component={NotFound}/>
      </Switch>
      <Footer />
      </div>
      </Router>
   
  );
}


export default App;
