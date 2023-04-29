import React from 'react';
import { useHistory } from 'react-router-dom';
import Error from './Error';
function ViewChosenFlightDetails() {
    const F = localStorage.getItem('chosenOption')
    const flight = JSON.parse(F);
    let history = useHistory();
    if(localStorage.getItem('Token')!= null){
    return (
        <div className="Cardbody">
            <div className="grid">
                <div id="grid-item" className="grid-item">
                    <div class="card">
                        <div class="card-content">

                            <h1 className="card-header">Your Selected Flight</h1>
                            <p className="card-text">
                                <li>Flight Number : {flight.FlightNumber}</li>
                                <li> Departure Time : {flight.DepartureTime}</li>
                                <li>Arrival Time : {flight.ArrivalTime}</li>
                                <li>Arrival Date : {flight.ArrivalDate}</li>
                                <li> Departure Date : {flight.DepartureDate}</li>
                                <li> Arrival Terminal : {flight.ArrivalTerminal}</li>
                                <li> Departure Terminal : {flight.DepartureTerminal}</li>
                                <li>Available Economy Seats : {flight.EconomySeats}</li>
                                <li>Available Business Class Seats : {flight.BusinessClassSeats}</li>
                                <li>Airport : {flight.Airport}</li>
                                <li>  Cabin : {flight.Cabin}</li>
                            </p>
                            <button className="card-btn" onClick={() => {
                                history.push('/changeSeatNumber')
                            }}>Choose Seat Number<span>&rarr;</span></button>

                        </div> </div>
                </div>
            </div>
        </div>
    );
                        }
                        else{
                            return <div> <Error> </Error> </div>
                        }
}

export default ViewChosenFlightDetails;