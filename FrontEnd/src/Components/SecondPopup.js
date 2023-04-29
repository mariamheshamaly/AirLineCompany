import React from 'react'
import "./PopupStyle.css"
import axios, { Axios } from "axios"
import "../index.css"
import { useState, useEffect } from "react";
import StripeComponent from './StripeComponent';

export default function SecondPopup(props) {
    const [message, setMessage] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);
    function handleClick(props) {
        setIsConfirmed(true);
        console.log(props.SelectedFlights)
        console.log(props.PrevFlights)
        const SelectedFlight = props.SelectedFlights
        const prevFlight = props.PrevFlights
        SelectedFlight['bookingNumber'] = Math.floor(Math.random() * 100)
        SelectedFlight['UserEmail'] = localStorage.getItem('Email');
        prevFlight['bookingNumber'] = Math.floor(Math.random() * 100)
        SelectedFlight['UserEmail'] = localStorage.getItem('Email');
        axios.post('http://localhost:3001/reserve', SelectedFlight)
        props.setTrigger(false)

        axios.post('http://localhost:3001/reserve', prevFlight)

        axios.put('http://localhost:3001/reserveupdate', props.SelectedFlights).then(res => {
            setMessage(res.data)
        })

        axios.put('http://localhost:3001/reserveupdate', props.PrevFlights)

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
        </div>) : isConfirmed ? <StripeComponent SelectedFlight={props.SelectedFlights} PrevFlights={props.PrevFlights} ></StripeComponent> : <h1></h1>

    )
}