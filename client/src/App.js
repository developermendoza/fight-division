import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <div>
            <Navbar />
            <PublicRoute restricted={false}  path="/" component={Home} exact/>
            <PublicRoute restricted={true}  path="/login" component={Login} exact/>
            <PublicRoute restricted={true}  path="/register" component={Register} exact/>
            <PublicRoute restricted={true}  path="/recover-password" component={RecoverPassword} exact/>
            <PublicRoute restricted={true}  path="/logout" component={Logout} exact/>
            <PrivateRoute path="/dashboard" component={Dashboard} exact />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
