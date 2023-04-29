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


function SearchFlights() {
    let history = useHistory();
    const [DepartureAirport, setSearchDepartureAirport] = useState(0);
    const [ArrivalAirport, setSearchArrivalAirport] = useState(0);
    const [ChildrenSeats, setSearchChildrenSeats] = useState(0);
    const [AdultSeats, setSearchAdultSeats] = useState(0);
    const [Cabin, setSearchCabin] = useState(0);
    const [Baggage, setSearchBaggage] = useState(0);
    const [TripDuration, setSearchTripDuration] = useState(0);
    //const [FlightNumber, setSearchFlightNumber] = useState(0);
    const [ArrivalTime, setSearchArrivalTime] = useState(0);
    const [DepartureTime, setSearchDeparturetime] = useState(0);
    const [DepartureDate, setSearchDepartureDate] = useState(0);
    const [ArrivalDate, setSearchArrivalDate] = useState(0);
    const [DepartureTerminal, setSearchDepartureTerminal] = useState(0);
    const [ArrivalTerminal, setSearchArrivalTerminal] = useState(0);

    const [searchResults, setSearcResults] = useState({})
    const obj = {

        ArrivalTime: ArrivalTime,
        DepartureTime: DepartureTime,
        DepartureDate: DepartureDate,
        ArrivalDate: ArrivalDate,
        ArrivalTerminal: ArrivalTerminal,
        DepartureTerminal: DepartureTerminal,
        DepartureAirport: DepartureAirport,
        ArrivalAirport: ArrivalAirport,
        ChildrenSeats: ChildrenSeats,
        AdultSeats: AdultSeats,
        Cabin: Cabin,
        Baggage: Baggage,
        TripDuration: TripDuration


    }
    function handleClick(event) {
        axios.post('http://localhost:3001/UserSearchFlight', obj).then(() => {
            console.log("yes")
        }).catch(err => {
            console.log(err)
            console.log("Error Mariam333")
        })
        history.push('/Usersearchresults')

    }

    return (
        <Router>

            <div className="create">
                <h2>Search a Flight</h2>
                <form>
                    <label>Enter Departure Airport</label>
                    <input
                        type="text"

                        // value={flightNumber}
                        name="departureairport"
                        onChange={(e) => setSearchDepartureAirport(e.target.value)}
                    />
                    <label>Enter Arrival Airport</label>
                    <input
                        type="text"

                        // value={flightNumber}
                        name="arrivalairport"
                        onChange={(e) => setSearchArrivalAirport(e.target.value)}
                    />
                    <label>Enter Number of Children</label>
                    <input
                        type="text"

                        // value={flightNumber}
                        name="childrenseats"
                        onChange={(e) => setSearchChildrenSeats(e.target.value)}
                    />
                    <label>Enter Number of Adults</label>
                    <input
                        type="text"

                        // value={flightNumber}
                        name="adultseats"
                        onChange={(e) => setSearchAdultSeats(e.target.value)}
                    />
                    <label>Enter Trip Duration</label>
                    <input
                        type="text"

                        // value={flightNumber}
                        name="tripduration"
                        onChange={(e) => setSearchTripDuration(e.target.value)}
                    />
                    <label>Enter Number of Baggages</label>
                    <input
                        type="text"

                        // value={flightNumber}
                        name="baggage"
                        onChange={(e) => setSearchBaggage(e.target.value)}
                    />
                    <label>Enter Cabin Type</label>
                    <input
                        type="text"

                        // value={flightNumber}
                        name="cabin"
                        onChange={(e) => setSearchCabin(e.target.value)}
                    />

                    <label>Enter Arrival Time </label>
                    <input

                        type="text"

                        //  value={arrivalTime}
                        name="arrivaltime"
                        onChange={(e) => setSearchArrivalTime(e.target.value)}
                    />
                    <label>Enter Departure Time</label>
                    <textarea


                        //  value={departure}
                        name="departuretime"
                        onChange={(e) => setSearchDeparturetime(e.target.value)}
                    ></textarea>

                    <label>Enter Departure Date</label>
                    <textarea


                        //  value={departure}
                        name="departuredate"
                        onChange={(e) => setSearchDepartureDate(e.target.value)}
                    ></textarea>



                    <label>Enter Arrival Date</label>
                    <textarea


                        //  value={economySeats}
                        name="economyseats"
                        onChange={(e) => setSearchArrivalDate(e.target.value)}
                    ></textarea>
                    <label>Enter Arrival Terminal</label>
                    <textarea

                        //    value={businessSeats}
                        name="businessseats"
                        onChange={(e) => setSearchArrivalTerminal(e.target.value)}
                    ></textarea>


                    <label>Enter Departure Terminal</label>
                    <textarea

                        //    value={businessSeats}
                        name="businessseats"
                        onChange={(e) => setSearchDepartureTerminal(e.target.value)}
                    ></textarea>



                    {/* <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="business">business</option>
          <option value="economy">economy</option>
        </select> */}

                    <Link to="/usersearchresults" onClick={handleClick} className="edit"> Search Flight</Link>

                </form>
            </div>

        </Router>
    );


    function SearchResults() {

        return (
            <div>
                { searchResults.length !== 0 ? searchResults.map(flight => {
                    return <div className="flights">
                        <ul >
                            <li>Departure Airport : {flight.DepartureAirport} </li>
                            <li>Arrival Airport : {flight.ArrivalAirport} </li>
                            <li>Children Seats : {flight.ChildrenSeats} </li>
                            <li> Adult Seats: {flight.AdultSeats} </li>
                            <li>Trip Duration : {flight.TripDuration} </li>
                            <li>Baggage : {flight.Baggage} </li>
                            <li>Cabin : {flight.Cabin} </li>
                            <li>Flight Number : {flight.FlightNumber} </li>
                            <li>Arrival Time : {flight.ArrivalTime} </li>
                            <li> Departue Date : {flight.DepartureDate} </li>
                            <li> Arrival Terminal : {flight.ArrivalTerminal} </li>
                            <li> Departure Terminal : {flight.DepartureTerminal} </li>
                            <li> Economy Seats : {flight.EconomySeats}</li>
                            <li> Business Class Seats : {flight.BusinessClassSeats}</li>
                            <li>Arrival Terminal : {flight.ArrivalTerminal}</li>

                        </ul>
                        <button>
                            Select
                        </button>


                    </div>

                }) : <h1>No Results Found</h1>
                }


            </div>

        )
    }
}

export default SearchFlights;