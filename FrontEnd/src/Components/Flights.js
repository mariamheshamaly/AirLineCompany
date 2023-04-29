import react from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory

} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import Error from './Error';

import axios from 'axios'

let i = 0;


function Flights() {
    const history = useHistory();

    const routeChange = () => {
        let path = "/UpdateFlight";
        history.push(path);
    }
    const [flights, setFlights] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/viewFlights').then((response) => {
            setFlights(response.data.message);
            console.log(flights)
        });
    }, []);
    if(localStorage.getItem('Token')!= null && localStorage.getItem('UserName')==="admin"){
    return (
       <div className="Cardbody">
        <div className="grid">

            { flights ? flights.map(flight => {
                { console.log(flight) }
                i++;
                return <div id="grid-item" className="grid-item">
          <div class="card">
          <div class="card-content">
          <h1 className="card-header">Flight Number: {flight.FlightNumber} </h1>
                    <p className="card-text">
                       
                        <p>Arrival Time : {flight.ArrivalTime} </p>
                        <p> Departue Date : {flight.DepartureDate} </p>
                        <p> Arrival Terminal : {flight.ArrivalTerminal} </p>
                        <p> Departure Terminal : {flight.DepartureTerminal} </p>
                        <p> Economy Seats : {flight.EconomySeats}</p>
                        <p> Business Class Seats : {flight.BusinessClassSeats}</p>
                        <p>ArrivalAirport : {flight.ArrivalAirport}</p>
                        <p>DepartureAirport : {flight.DepartureAirport} </p>
                        <p>ChildrenSeats : {flight.ChildrenSeats} </p>
                        <p>AdultSeats : {flight.AdultSeats} </p>
                        <p>TripDuration : {flight.TripDuration} </p>
                        <p>Baggage : {flight.Baggage} </p>
                        <p>Cabin : {flight.Cabin} </p>
                        <p>BusinessClassSeatPrice : {flight.BusinessClassSeatPrice} </p>
                        <p>EconomySeatPrice : {flight.EconomySeatPrice} </p>


                    </p>
                </div>
                </div>
                </div>
            }) : <h1>Loading</h1>}


            {/* <h1>{flights[0]}</h1> */}
        </div>
        </div>

    )
        }
        else{
            return <div> <Error> </Error> </div>
        }
}
export default Flights;