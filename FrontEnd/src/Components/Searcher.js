import React from 'react';
import { useState, useEffect } from "react";
import axios, { Axios } from "axios"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import Error from './Error';


function SearchFlights() {
    let history = useHistory();
    const [FlightNumber, setSearchFlightNumber] = useState(0);
    const [ArrivalTime, setSearchArrivalTime] = useState(0);
    const [DepartureTime, setSearchDeparturetime] = useState(0);
    const [DepartureDate, setSearchDepartureDate] = useState(0);
    const [ArrivalDate, setSearchArrivalDate] = useState(0);
    const [DepartureTerminal, setSearchDepartureTerminal] = useState(0);
    const [ArrivalTerminal, setSearchArrivalTerminal] = useState(0);
    const [sendRequest, setSendRequest] = useState(false);
    // const [searchResults, setSearcResults] = useState({})
    const obj = {
        FlightNumber: FlightNumber,
        ArrivalTime: ArrivalTime,
        DepartureTime: DepartureTime,
        DepartureDate: DepartureDate,
        ArrivalDate: ArrivalDate,
        ArrivalTerminal: ArrivalTerminal,
        DepartureTerminal: DepartureTerminal
    }

    function handleClick(event) {
        history.push('searchfinalresults');
        axios.post('http://localhost:3001/searchflight', obj).then(() => {
            console.log("yes")
            setSendRequest(true);

        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })


    }

    function handler(event) {
        console.log("i have been clicked")
    }


    if(localStorage.getItem('Token')!= null && localStorage.getItem('UserName')==="admin"){
    return (
        <Router>
            <div className="body">
            <div className="container" >
                <div class="content">

                <h1 className= "title"> Check a Flight</h1>
                <form>
                <div className="user-details">
                            <div className="input-box">
                    <label>Enter Flight Number</label>
                    <input
                        type="text"
                        // value={flightNumber}
                        name="flightnumber"
                        onChange={(e) => setSearchFlightNumber(e.target.value)}
                    />
                    </div>
                    <div className="input-box">
                    <label>Enter Arrival Time </label>
                    <input
                        type="text"
                        //  value={arrivalTime}
                        name="arrivaltime"
                        onChange={(e) => setSearchArrivalTime(e.target.value)}
                    />
                    </div>
                    <div className="input-box">
                    <label>Enter Departure Time</label>
                    <input
                        //  value={departure}
                        name="departuretime"
                        onChange={(e) => setSearchDeparturetime(e.target.value)}
                    ></input>
                    </div>
                    <div className="input-box"> 
                    <label>Enter Departure Date</label>
                    <input
                        //  value={departure}
                        name="departuredate"
                        onChange={(e) => setSearchDepartureDate(e.target.value)}
                    ></input>
                    </div>
                    <div className="input-box">
                    <label>Enter Arrival Date</label>
                    <input
                        //  value={economySeats}
                        name="economyseats"
                        onChange={(e) => setSearchArrivalDate(e.target.value)}
                    ></input>
                    </div>
                    <div className="input-box">
                    <label>Enter Arrival Terminal</label>
                    <input
                        name="businessseats"
                        onChange={(e) => setSearchArrivalTerminal(e.target.value)}
                    ></input>
                    </div>
                    <div className="input-box">
                    <label>Enter Departure Terminal</label>
                    <input

                        //    value={businessSeats}
                        name="businessseats"
                        onChange={(e) => setSearchDepartureTerminal(e.target.value)}
                    ></input>
                    </div>
                    </div>  
                    <Link className="XX" to="/searchfinalresults" onClick={handleClick} > Search Flight</Link>
                </form>
                
</div></div>            </div>

        </Router>
    );
    }
    else{
        return <div> <Error> </Error> </div>
    }


}

export default SearchFlights;