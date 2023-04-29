import React from 'react';
import { useHistory } from "react-router-dom";
import Error from './Error';

function ViewOptions() {
    let history = useHistory();
    const F = localStorage.getItem('AvailableOptions')
    const chosenCabin = localStorage.getItem('chosenCabin')
    const flights = JSON.parse(F);
    const FlightToChange = localStorage.getItem('flight')
    const FlightToChangeObj = JSON.parse(FlightToChange);
    let IsEconomy = false;
    console.log(flights);
    console.log('balalal')
    if (chosenCabin == 'Economy') {
        IsEconomy = true;
    } else {
        IsEconomy = false;
    }
    if(localStorage.getItem('Token')!= null){
    return (
        <div className="Cardbody">
            <div className="grid">
                {flights.length !== 0 ? flights.map(flight => {
                    return <div id="grid-item" className="grid-item">
                        <div class="card">
                            <div class="card-content">
                                <p className="card-text">
                                    <p>Flight Number : {flight.FlightNumber} </p>
                                    <p>Trip Duration : {flight.TripDuration} </p>
                                    <p> Departue Date : {flight.DepartureDate} </p>
                                    <p> Arrival Date : {flight.ArrivalDate} </p>
                                    <p>Price Difference per Seat : <span>{IsEconomy ? <span>{flight.EconomySeatPrice - FlightToChangeObj.TotalPrice}</span> : <span>{flight.BusinessClassSeatPrice - FlightToChangeObj.TotalPrice}</span>} </span> </p>
                                    <button className="card-btn" onClick={() => {
                                        localStorage.setItem('chosenOption', JSON.stringify(flight))
                                        history.push('/ViewChosenFlightDetails')

                                    }}>Choose this Flight <span>&rarr;</span></button>

                                </p>

                            </div>
                        </div>
                    </div>

                }) : <h1>No Results Found</h1>
                }

            </div>
        </div>

    )
            }
            else{
                return <div> <Error> </Error> </div>
            }
}

export default ViewOptions;