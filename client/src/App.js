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

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <div>
            <Navbar />
            <Route restricted={false} exact path="/" component={Home}/>
            <Route restricted={true} path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/recover-password" component={RecoverPassword}/>
            <PrivateRoute component={Dashboard} path="/dashboard" exact />
          </div>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
