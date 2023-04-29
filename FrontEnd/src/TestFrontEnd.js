import React from 'react';
import { useState, useEffect } from 'react';
import Registration from './Components/Registration'
import Login from './Components/Login'
import Button from '@mui/material/Button';
import AdminHome from './AdminHome';
import Guest from './Components/Guest';
import ChangeEmail from './Components/ChangeEmail';
import ChangePassword from './Components/ChangePassword';
import ForgetPassword from './Components/ForgetPassword';
import Error from './Components/Error';
import DeleteFlight from './Components/DeleteFlight';
import CreateFlights from './Components/CreateFlights';
import SearchFlights from './Components/SearchFlights';
import Searcher from './Components/Searcher';
import UpdateFlight from './Components/UpdateFlight';


import "./index.css"


import App from './App';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import ViewDetails from './Components/ViewDetails';
//import SearchFlights from './Components/Searcher';


export default function TestFrontEnd() {

  const [is, setIs] = useState(false);
  const users = [{ name: "mariam" }, { name: "salma" }]

  useEffect(() => {

    const Token = localStorage.getItem("Token");
    if (Token) {
      setIs(true);
    } else {
      setIs(false);
    }
  }, [])

  function handleClick(event) {
    event.preventDefault()
    localStorage.removeItem('Token')
    localStorage.removeItem('Email')

    window.location.href = "/Guest"
  }
  function handleClick2(event) {
    event.preventDefault()
    localStorage.removeItem('Token')
    window.location.href = "/"
  }
  return (
    <Router>

      {/* <Link to="/login">
        <button variant="contained">Login</button>
      </Link>
      <Link to="/logout">
        <button onClick={handleClick2}>Logout</button>
      </Link>

      <Link to onClick={handleClick}>Continue as a guest</Link> */}

      <Switch>
        <Route path="/registration" exact component={Registration} />
        <Route path="/login" exact component={Login} />
        <Route path="/AdminHome" exact component={AdminHome} />
        <Route path="/App" exact component={App} />
        <Route path="/Guest" exact component={Guest} />
        <Route path="/ChangePassword" exact component={ChangePassword} />
        <Route path="/ChangeEmail" exact component={ChangeEmail} />
        <Route path="/ForgetPassword" exact component={ForgetPassword} />
        <Route path="/" exact component={Login} />
        <Route path="/error" exact component={Error} />
        <Route path="/Deleteflight" exact component={DeleteFlight} />
        <Route path="/CreateFlight" exact component={CreateFlights} />
        <Route path="/SearchFlights" exact component={SearchFlights} />
        <Route path="/searchFinal" exact component={Searcher} />
        <Route path="/updateFlight" exact component={UpdateFlight} />
        

        








      </Switch>
    </Router>

  );
}