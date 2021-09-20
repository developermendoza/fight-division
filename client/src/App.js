import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
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
import Events from './components/events/Events';
import NotFound from "./components/404/NotFound";



function App() {

  return (
    <div className="App">
      <Router>
      <Navbar />
        <Switch>
            <Route path="/admin" exact component={Admin}/>
            <PublicRoute restricted={false}  path="/" component={Home} exact/>
            <PublicRoute restricted={true}  path="/login" component={Login} exact/>
            <PublicRoute restricted={true}  path="/register" component={Register} exact/>
            <PublicRoute restricted={true}  path="/recover-password" component={RecoverPassword} exact/>
            <PublicRoute restricted={true}  path="/logout" component={Logout} exact/>
            <PrivateRoute path="/dashboard" component={Dashboard}  exact/>
            <PublicRoute restricted={false}  path="/events" component={Events} exact/>
            <PublicRoute restricted={false}  path="*" component={NotFound} exact/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
