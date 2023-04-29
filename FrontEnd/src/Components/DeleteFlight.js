import React from 'react'
import { useState } from "react";
import "../index.css"
import axios, { Axios } from "axios"
import Popup from './Popup';
import Error from './Error';
//lama yedelete haga msh mawgooda n2ollo 
export default function DeleteFlight() {
    const [flightNumber, setFlightNumber] = useState(0);
    const [popUpBtn, setPopUpBtn] = useState(false);
    const [message, setMessage] = useState("");
    const obj = {
        flightN: flightNumber
    }
    function handleClick(event) {
        event.preventDefault()
        setPopUpBtn(true);
        //console.log(obj);
    }
    if(localStorage.getItem('Token')!= null && localStorage.getItem('UserName')==="admin"){
    return (
        <div className='body'>
        <div className="container" >
                <div className="content">
                
            <form >
            <div className="user-details">
            <h2 className="title"> Flight Number To Be Deleted</h2>    
            <div className="input-box">
                <input
                    type="text"  
                    name="flightnumber"
                    onChange={(e) => setFlightNumber(e.target.value)}
                />
                </div>
                <button className="XX" onClick={handleClick}>delete</button>
                </div>
            </form>
            </div>
            <Popup 
            flightnum={obj} trigger={popUpBtn} setTrigger={setPopUpBtn} >
             <h3>Are you sure you want to delete this flight? </h3>
             
             </Popup>
            </div>
           
        </div>
    )
    }
    else{
        return <div> <Error> </Error> </div>
    }
}