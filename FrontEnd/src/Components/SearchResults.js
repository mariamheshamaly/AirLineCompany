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
import ViewDetails from '../Components/ViewDetails'
import Error from './Error';


function SearchResults() {
    let history = useHistory();
    const [searchValues, setSearchValues] = useState([])
    useEffect(() => {
        receivedata();
    }, [searchValues])

    const receivedata = async () => {
        await axios.get('http://localhost:3001/getresults').then((response) => {
            setSearchValues(response.data)
            console.log(searchValues);
            console.log("holaaaa")
            console.log(searchValues.length)
        }).catch(err => {
            console.log(err)
            console.log("i am here")

        })
    }

    function handleClick() {
        history.push('/viewDetails')
    }

    return (

        <div>

            {searchValues.length !== 0 || typeof searchValues != undefined ? searchValues.map(flight => {
                return <div className="flights">
                    <ul >
                        <li>Flight Number : {flight.FlightNumber} </li>
                        <li> Arrival Terminal : {flight.ArrivalTerminal} </li>
                        <li> Departure Terminal : {flight.DepartureTerminal} </li>

                    </ul>

                    <Link className="edit" to="/viewDetails" onClick={handleClick}>View Full Details</Link>





                </div>

            }) : <h1>No Results Found</h1>
            }
        </div>

    );
}



export default SearchResults;