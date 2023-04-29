import React from 'react'
import "./PopupStyle.css"
import axios, { Axios } from "axios"
import "../index.css"
import { useState, useEffect } from "react";
import StripeComponentChanged from './StripComponentChanged';

export default function ThirdPopup(props) {
    const [message, setMessage] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    function handleClick(props) {
        setIsConfirmed(true);
        console.log(props.SelectedFlights)
        console.log(props.PrevFlights)
        const SelectedFlight = props.SelectedFlights
        const prevFlight = props.PrevFlights
        const amountToPay = props.amountToPay
        const flightToDelete = localStorage.getItem('flight');
        const flightoDeleteObj = JSON.parse(flightToDelete);
        SelectedFlight['bookingNumber'] = Math.floor(Math.random() * 100)
        SelectedFlight['UserEmail'] = localStorage.getItem('Email');
        console.log('reseerveed Flight ')
        console.log(SelectedFlight)
        axios.post('http://localhost:3001/reserve', SelectedFlight)
        console.log('Flight to Deletee ')
        console.log(flightoDeleteObj)
        axios.post('http://localhost:3001/deleteSelected', flightoDeleteObj);



        props.setTrigger(false)


        axios.put('http://localhost:3001/reserveupdate', SelectedFlight).then(res => {
            setMessage(res.data)
        })



    }
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
        </div>) : isConfirmed ? <StripeComponentChanged SelectedFlight={props.SelectedFlights} amountToPay={props.amountToPay}></StripeComponentChanged> : ""

    )
}