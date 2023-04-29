import React from 'react'
import "./PopupStyle.css"
import axios, { Axios } from "axios"
import { useState } from "react";

export default function Popup(props) {

    const [message, setMessage] = useState("");
     
    const obj={
        FlightNumber:props.flightnum.FlightNumber,
        ArrivalTime: props.flightnum.ArrivalTime,
        DepartureDate:props.flightnum.DepartureDate,
        ArrivalTerminal:props.flightnum.ArrivalTerminal,
        DepartureTerminal:props.flightnum.DepartureDate,
        EconomySeats:props.flightnum.EconomySeats,
        BusinessClassSeats:props.flightnum.BusinessClassSeats,
        TotalPrice:props.flightnum.TotalPrice,
        UserEmail:props.flightnum.UserEmail,
    }
   

    function handleClick(event) {
        event.preventDefault()
       
        axios.post('http://localhost:3001/deleteReservation', obj).then(res =>{
            setMessage(res.data)
        })
        props.setTrigger(false)
    }
    return ((props.trigger) ? (<div className='popup'>
        <div className='popup-inner'>
            <button className='close-btn' onClick={() => props.setTrigger(false)}>
                cancel
            </button>
            <button onClick={handleClick} className='delete-btn'>delete</button>
            {props.children}
        </div>
    </div>) :<h4>{message}</h4>

    )
}