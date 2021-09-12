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

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Route path="/recover-password" component={RecoverPassword}/>
        </div>
      </Router>
    </div>
  );
}

export default App;
