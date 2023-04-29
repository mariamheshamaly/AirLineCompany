import React from 'react';
import SecondPopup from './SecondPopup'
import { useState, useEffect } from "react";
import Error from './Error';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import ThirdPopup from './ThirdPopup'
import ChangeSeat from './ChangeSeat';

function ShowSummaryChanged() {
    const [popUpBtn, setPopUpBtn] = useState(false);
    let payingValue = 0;
    const chosenFlightString = localStorage.getItem('chosenOption')
    const chosenFlight = JSON.parse(chosenFlightString);
    const chosenCabin = localStorage.getItem('chosenCabin')
    const prevFlightString = localStorage.getItem('flight')
    const chosenSeats = localStorage.getItem('ChosenSeats')
    let seats = chosenSeats.split(',');
    const PrevFlights = JSON.parse(prevFlightString);
    let IsEconomy = false;
    if (chosenCabin == 'Economy') {
        IsEconomy = true;
    } else {
        IsEconomy = false;
    }
    if (chosenCabin == 'Business') {
        payingValue = seats.length * chosenFlight.BusinessClassSeatPrice - PrevFlights.TotalPrice
    } else {
        payingValue = seats.length * chosenFlight.EconomySeatPrice - PrevFlights.TotalPrice
    }


    if(localStorage.getItem('Token')!= null){
    return (<div className="Cardbody">
        <div className="grid">
            {/* <h1>Summary of your Changes</h1> */}

            <div id="grid-item" className="grid-item">
                <div class="card">
                    <div class="card-content">
                        <h1 className="card-header">Your Chosen Flight Flight</h1>
                        <p className="card-text" >
                            <p>Arrival Date : {chosenFlight.ArrivalDate} </p>
                            {/* <p>DepartureAirport : {chosenFlight.DepartureAirport} </p> */}
                            <p> Arrival Terminal : {chosenFlight.ArrivalTerminal} </p>
                            <p> Departure Terminal : {chosenFlight.DepartureTerminal}</p>

                            <p> Arrival Time : {chosenFlight.ArrivalTime} </p>
                            <p> Departure Time : {chosenFlight.DepartureTime}</p>

                            <p> Departure Date : {chosenFlight.DepartureDate} </p>
                            <p> Departure Terminal : {chosenFlight.DepartureTime}</p>
                            <p>Flight Price : <span>{IsEconomy ? <span>{seats.length * chosenFlight.EconomySeatPrice}</span> : <span>{seats.length * chosenFlight.BusinessClassSeatPrice}</span>} </span> </p>
                            <p> Selected Seat : {chosenSeats} </p>

                            {/* <p>Flight Price : {FlightDetails.TotalPrice}</p> */}
                            {/* {FlightDetails.Cabin == 'Economy' ? <div> <p>Selected Economy Seat : {FlightDetails.SelectedEconomySeat}</p></div> : <div> <p>Selected Business Seat : {FlightDetails.SelectedBusinessSeat}</p></div>} */}

                        </p>
                    </div>
                </div>
            </div>

            <div id="grid-item" className="grid-item">
                <div class="card">
                    <div class="card-content">
                        <p className="card-text" >
                            <h1 className="card-header">Your Previous Flight</h1>
                            <p>Arrival Date : {PrevFlights.ArrivalDate} </p>
                            <p> Arrival Terminal : {PrevFlights.ArrivalTerminal} </p>
                            <p> Departure Terminal : {PrevFlights.DepartureTerminal}</p>
                            <p> Arrival Time : {PrevFlights.ArrivalTime} </p>
                            <p> Departure Time : {PrevFlights.DepartureTime}</p>
                            <p> Departure Date : {PrevFlights.DepartureDate} </p>
                            <p> Flight Price : {PrevFlights.TotalPrice}</p>
                            {PrevFlights.SelectedEconomySeat != 'undefined' ? <div> <p>Selected Seat : {PrevFlights.SelectedEconomySeat}</p></div> : <div> <p>Selected Seat : {PrevFlights.SelectedBusinessSeat}</p></div>}


                        </p>

                        <Link className="card-btn" to="/showSummaryChanged" onClick={() => setPopUpBtn(true)} >Book Now</Link>
                    </div>
                </div>
            </div>

            <div>

                {/* {payingValue == 0 ? <div><h1>Confirm Booking Same Flight</h1></div> : <div><h1>Value</h1></div>} */}




            </div>


            <strong> {
                payingValue == 0 ?
                    <div>Confirm Booking Same Flight
                                        {/* <Link className="edit" to="/showSummaryChanged" onClick={() => setPopUpBtn(true)} >Change Seat</Link> */}
                        <ChangeSeat trigger={popUpBtn} setTrigger={setPopUpBtn} SelectedFlights={chosenFlight} PrevFlights={PrevFlights} amountToPay={payingValue}>Confirm Your Booking?</ChangeSeat></div>
                    : payingValue > 0 ?
                        <div>You have to pay {payingValue} Pounds
                                            {/* <Link className="edit" to="/showSummaryChanged" onClick={() => setPopUpBtn(true)} >Confirm Booking</Link> */}
                            <ThirdPopup trigger={popUpBtn} setTrigger={setPopUpBtn} SelectedFlights={chosenFlight} PrevFlights={PrevFlights} amountToPay={payingValue}>Confirm Your Booking?</ThirdPopup></div>
                        : <div><h1>You will need a refund with {payingValue * -1}</h1>
                            {/* <Link className="edit" to="/showSummaryChanged" onClick={() => setPopUpBtn(true)} >Confirm Booking</Link> */}
                            <ChangeSeat trigger={popUpBtn} setTrigger={setPopUpBtn} SelectedFlights={chosenFlight} PrevFlights={PrevFlights} amountToPay={payingValue}>Confirm Your Booking?</ChangeSeat>

                        </div>} </strong>
        </div>
    </div>);
    }
    else{
        return <div> <Error> </Error> </div>
    }
}

export default ShowSummaryChanged;