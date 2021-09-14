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

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/admin" exact component={Admin}/>
          <div>
            <Navbar />
            <PublicRoute restricted={false}  path="/" component={Home} exact/>
            <PublicRoute restricted={true}  path="/login" component={Login} />
            <PublicRoute restricted={true}  path="/register" component={Register} />
            <PublicRoute restricted={true}  path="/recover-password" component={RecoverPassword} />
            <PublicRoute restricted={true}  path="/logout" component={Logout} />
            <PrivateRoute path="/dashboard" component={Dashboard}  />
            
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
