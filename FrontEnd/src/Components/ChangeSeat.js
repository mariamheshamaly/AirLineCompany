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
import axios from 'axios'
import StripeComponentChanged from './StripComponentChanged'

function ChangeSeat(props) {
    const [message, setMessage] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    function handleClick(props) {
        setIsConfirmed(true);


        const SelectedFlight = props.SelectedFlights

        const flightToDelete = localStorage.getItem('flight');
        const flightoDeleteObj = JSON.parse(flightToDelete);
        SelectedFlight['bookingNumber'] = Math.floor(Math.random() * 100)
        SelectedFlight['UserEmail'] = localStorage.getItem('Email');
        let chosenCabin = localStorage.getItem('chosenCabin')
        let selectedseat = localStorage.getItem('ChosenSeats')
        console.log(chosenCabin)
        if (chosenCabin == 'Economy') {
            SelectedFlight['SelectedEconomySeat'] = selectedseat
        } else if (chosenCabin == 'Business') {
            SelectedFlight['SelectedBusinessSeat'] = selectedseat
        }
        SelectedFlight['Totalprice'] = props.amountToPay
        console.log(SelectedFlight)
        axios.post('http://localhost:3001/reserve', SelectedFlight)

        axios.post('http://localhost:3001/deleteSelected', flightoDeleteObj);
        console.log('this is the flight i am sendin to the db to update')
        console.log(SelectedFlight)
        axios.put('http://localhost:3001/reserveupdate', SelectedFlight).then(res => {
            setMessage(res.data)
        })


        props.setTrigger(false)


        axios.put('http://localhost:3001/reserveupdate', SelectedFlight).then(res => {
            setMessage(res.data)
        })



    }
    if(localStorage.getItem('Token')!= null){
    return ((props.trigger) ? (
        <div className='popup'>
            <div className='popup-inner'>
                <button className='close-btn' onClick={() => props.setTrigger(false)}>
                    cancel
            </button>
                <button onClick={() => {
                    handleClick(props)
                }} className='delete-btn'>book</button>
                {props.children}
            </div>
        </div>) : isConfirmed ? <h5>You have changed your seat succuefully</h5> : <h1>Please Confirm Your Booking</h1>

    )
            }
            else{
                return <div> <Error> </Error> </div>
            }
}

export default ChangeSeat;