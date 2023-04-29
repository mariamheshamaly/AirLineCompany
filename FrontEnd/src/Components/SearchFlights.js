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
import BackButton from './BackButton';
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
    const [Cabin, setCabin] = useState("Business");
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    // const [searchR,esults, setSearcResults] = useState({})
    const obj = {
        Cabin: Cabin,
        adults: adults,
        children: children,
        ArrivalTime: ArrivalTime,
        DepartureTime: DepartureTime,
        DepartureDate: DepartureDate,
        ArrivalDate: ArrivalDate,
        ArrivalTerminal: ArrivalTerminal,
        DepartureTerminal: DepartureTerminal

    }

    function handleClick(event) {
        history.push('/searchresults')
        axios.post('http://localhost:3001/searchflight', obj).then(() => {
            setSendRequest(true);

        }).catch(err => {
            console.log(err)
            console.log("i am here")
        })


    }

    return (
        <Router>
            <body className="body">
                <div className="container" >
                    <div class="content">
                        <BackButton />
                        <h2>Search a Flight</h2>
                        <form>
                            <div className="user-details">
                                <div className="input-box">
                                    <label>Cabin</label>
                                    <select onChange={e => setCabin(e.target.value)} >
                                        <option >Business</option>
                                        <option >Economy</option>
                                    </select>
                                </div>

                                <div className="input-box">
                                    <label> Departure Date</label>
                                    <input
                                        placeholder=" 25-10-2022"
                                        name="departuredate"
                                        onChange={(e) => setSearchDepartureDate(e.target.value)}
                                    />
                                </div>
                                <div className="input-box">
                                    <label>Arrival Date</label>
                                    <input
                                        placeholder=" 25-10-2022"
                                        onChange={(e) => setSearchArrivalDate(e.target.value)}
                                    />
                                </div>
                                <div className="input-box">
                                    <label>Arrival Terminal</label>
                                    <input
                                        name="businessseats"
                                        onChange={(e) => setSearchArrivalTerminal(e.target.value)}
                                    />
                                </div>
                                <div className="input-box">
                                    <label>Departure Terminal</label>
                                    <input
                                        onChange={(e) => setSearchDepartureTerminal(e.target.value)}
                                    />
                                </div>
                                <div className="input-box">
                                    <label> Adults</label>
                                    <input
                                        type="number"
                                        onChange={(e) => setAdults(e.target.value)}
                                    />
                                </div>
                                <div className="input-box">
                                    <label> Children</label>
                                    <input
                                        type="number"
                                        onChange={(e) => setChildren(e.target.value)}
                                    />
                                </div>
                                <Link to="/searchresults" onClick={handleClick} className="XX"> Search Flight</Link>


                            </div>
                        </form>
                    </div>
                </div>

            </body>
        </Router>
    );



}

export default SearchFlights;