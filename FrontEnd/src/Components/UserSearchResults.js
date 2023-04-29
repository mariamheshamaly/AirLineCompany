import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import axios, { Axios } from "axios"
import { useState, useEffect } from "react";
import '../index.css'
import ViewDetails from './ViewDetails'


function SearchResults() {
    let history = useHistory();
    const [searchValues, setSearchValues] = useState([])
    useEffect(() => {
        receivedata();
    }, [searchValues])

    const receivedata = async () => {
        await axios.get('http://localhost:3001/getresults2').then((response) => {
            setSearchValues(response.data)
            console.log(searchValues);
            console.log("holaaaa")
            console.log(searchValues.length)
        }).catch(err => {
            console.log(err)
            console.log("i am here")

        })
    }

    return (
        <div>
            { searchValues.length !== 0 ? searchValues.map(flight => {
                return <div className="flights">
                    <ul >
                        <li>Departure Airport : {flight.DepartureAirport} </li>
                        <li>Arrival Airport : {flight.ArrivalAirport} </li>
                        <li>Children Seats : {flight.ChildrenSeats} </li>
                        <li> Adult Seats: {flight.AdultSeats} </li>
                        <li>Trip Duration : {flight.TripDuration} </li>
                        <li>Baggage : {flight.Baggage} </li>
                        <li>Cabin : {flight.Cabin} </li>
                        <li>Flight Number : {flight.FlightNumber} </li>
                        <li>Arrival Time : {flight.ArrivalTime} </li>
                        <li> Departue Date : {flight.DepartureDate} </li>
                        <li> Arrival Terminal : {flight.ArrivalTerminal} </li>
                        <li> Departure Terminal : {flight.DepartureTerminal} </li>
                        <li> Economy Seats : {flight.EconomySeats}</li>
                        <li> Business Class Seats : {flight.BusinessClassSeats}</li>
                        <li>Arrival Terminal : {flight.ArrivalTerminal}</li>

                    </ul>



                </div>

            }) : <h1>No Results Found</h1>
            }


        </div>

    )
}



export default SearchResults;