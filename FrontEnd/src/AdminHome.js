import React from 'react';
import { useState, useEffect } from 'react';
import CreateFlight from './Components/CreateFlights';
import UpdateFlight from './Components/UpdateFlight'
import DeleteFlight from './Components/DeleteFlight';
import Flights from './Components/Flights';
import SearcherFinal from './Components/SearcherFinal';
import Searcher from './Components/Searcher'
import ChangePassword from './Components/ChangePassword'

import Bututon from '@mui/material/Button';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";


export default function AdminHome() {
  function handleClick2(event) {
    event.preventDefault()
    localStorage.removeItem('Token')
    localStorage.removeItem('UserName')

    window.location.href = "/"
  }
  return (
    <>

      <Router>
        <nav >

          <ul>
            <li> <Link to="/viewFlights"> View Flights</Link>     </li>
            <li> <Link to="/createflight"> Create Flight</Link></li>
            <li> <Link to="/updateFlight"> Update Flight</Link></li>
            <li> <Link to="/searchfinal"> Search Flight</Link></li>
            <li> <Link to="/deleteflight"> Delete Flight</Link></li>
            <li><Link to="/changePassword"> Change Password</Link></li>
            <li> <Link onClick={handleClick2} to="/logout">
              Logout
      </Link></li>
          </ul>

        </nav>
        <Switch>
          <Route path="/createFlight" exact component={CreateFlight} />
          <Route path="/viewflights" exact component={Flights} />
          <Route path="/searchfinal" exact component={Searcher} />
          <Route path="/updateFlight" exact component={UpdateFlight} />
          <Route path="/deleteflight" exact component={DeleteFlight} />
          <Route path="/searchfinalresults" exact component={SearcherFinal} />
          <Route path="/changePassword" exact component={ChangePassword} />


        </Switch>


      </Router>



    </>
  )
}