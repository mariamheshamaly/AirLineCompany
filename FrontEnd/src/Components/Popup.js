import React from 'react'
import "./PopupStyle.css"
import axios, { Axios } from "axios"
import { useState } from "react";

export default function Popup(props) {

    const [message, setMessage] = useState("");
    
    
    function handleClick(event) {
        event.preventDefault()
        axios.post('http://localhost:3001/delete', props.flightnum).then(res =>{
            console.log("message: "+res.data)
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