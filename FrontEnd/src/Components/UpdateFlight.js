import React from 'react';
import { useState } from "react";
import "../index.css"
import axios, { Axios } from "axios"
import Error from './Error';
function UpdateFlight() {
    const [FlightNumber, setFlightNumber] = useState(0);
    const [NewFlightNumber, setNewlightNumber] = useState(0);
    const [ArrivalTime, setArrivalTime] = useState(0);
    const [DepartureTime, setDeparturetime] = useState(0);
    const [DepartureDate, setDepartureDate] = useState(0);
    const [EconomySeats, setEconomySeats] = useState(0);
    const [BusinessClassSeats, setBusinessSeats] = useState(0);
    // const [date, setDate] = useState(0);
    const [ArrivalDate, setArrivalDate] = useState(0);
    const [Airport, setAirport] = useState("");
    const [ArrivalTerminal, setArrivalTerminal] = useState("");
    const [DepartureTerminal, setdepartureTerminal] = useState("");
    const [message, setMessage] = useState("");
    function handleClick(event) {
        event.preventDefault()
        if (obj.flightN === 0) {
            console.log("Please enter a flight number")
            setMessage("Please enter a flight number")
        } else {
            axios.put('http://localhost:3001/update', obj,{
                headers:{
                    'Content-Type':'application/json',
                    'authorization':'bearer '+ localStorage.getItem("Token")
                }
            }).then(res =>{
                console.log(res.data)
                setMessage(res.data)
            })
            console.log(obj)
        }
    }

    const obj = {
        flightN: FlightNumber,
        newFlight: NewFlightNumber,
        arrivalT: ArrivalTime,
        DepartureTime: DepartureTime,
        DepartureDate: DepartureDate,
        ArrivalDate: ArrivalDate,
        economy: EconomySeats,
        business: BusinessClassSeats,
        Airport: Airport,
        ArrivalTerminal: ArrivalTerminal,
        DepartureTerminal: DepartureTerminal,
    }

    if(localStorage.getItem('Token')!= null && localStorage.getItem('UserName')==="admin"){
    return (
        <div className="body">
         <div className="container" >
                <div class="content">
            <h1 className="title" >Update Flight</h1>
            <form>
            <div className="user-details">
                            <div className="input-box">
                <label>Enter Flight Number to be Updated </label>
                <input
                    type="text"
                    required
                    // value={flightNumber}
                    name="flightnumber"
                    onChange={(e) => setFlightNumber(e.target.value)}
                />
                </div>
                <div className="input-box">
                <label>Enter The New Flight Number </label>
                <input
                    type="text"

                    // value={flightNumber}
                    name="flightnumber"
                    onChange={(e) => setNewlightNumber(e.target.value)}
                />
                </div>
                <div className="input-box">
                <label>arrival time </label>
                <input
                   type="text"
                    name="arrivaltime"
                    onChange={(e) => setArrivalTime(e.target.value)}
                />
                </div>
                 <div className="input-box">
                <label>Departure Time</label>
                <input                    //  value={departure}
                    name="departuretime"
                    onChange={(e) => setDeparturetime(e.target.value)}
                ></input>
                </div>
                <div className="input-box">
                <label>Departure Date</label>
                <input
                    //  value={departure}
                    name="departuredate"
                    onChange={(e) => setDepartureDate(e.target.value)}
                ></input>
                </div>
                <div className="input-box">
                <label>number of economy seats</label>
                <input
                    //  value={economySeats}
                    name="economyseats"
                    onChange={(e) => setEconomySeats(e.target.value)}
                ></input>
                </div>
                <div className="input-box">
                <label>number of business seats</label>
                <input
                    //    value={businessSeats}
                    name="businessseats"
                    onChange={(e) => setBusinessSeats(e.target.value)}
                ></input>

</div>
                <div className="input-box">

                <label>Departure Terminal </label>
                <input
                    type="text"

                    // value={flightNumber}
                    name="departureterminal"
                    onChange={(e) => setdepartureTerminal(e.target.value)}
                />
</div>
                <div className="input-box">

                <label>Arrival Terminal </label>
                <input
                    type="text"

                    // value={flightNumber}
                    name="arrivalterminal"
                    onChange={(e) => setArrivalTerminal(e.target.value)}
                />
                </div>
                <div className="input-box">

                <label>Arrival Date </label>
                <input
                    type="text"

                    name="arrivaldate"
                    onChange={(e) => setArrivalDate(e.target.value)}
                />
                </div>
                <div className="input-box">

                <label>airport</label>
                <input

                    //   value={airport}
                    name="airportterminal"
                    onChange={(e) => setAirport(e.target.value)}
                ></input>
  </div>
                <button className="XX" onClick={handleClick}>Update</button>
               
                </div>
            </form>
            </div>
            </div>
            <h4>{message}</h4>
        </div>
        
    );
    }
    else{
        return <div> <Error> </Error> </div>
    }
}

export default UpdateFlight;