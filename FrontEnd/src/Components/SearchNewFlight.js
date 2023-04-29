import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import Error from './Error';

export default function SearchNewFlight() {
    let history = useHistory();
    const [NewCabin, setNewCabin] = useState("Business")
    const [NewDate, setNewDate] = useState([])
    const [searchValues, setSearchValues] = useState([])
    const F = localStorage.getItem('flight')
    const flight = JSON.parse(F);
    const obj = {
        NewCabin: NewCabin,
        NewDate: NewDate,
        DepartureTerminal: flight.DepartureTerminal
    }
    console.log('Ashroofa')
    console.log(obj)
    function handleClick(event) {
        event.preventDefault()
        axios.post("http://localhost:3001/searchNewFlight", obj).then(res => {
            console.log(res.data + "no i am here")
            setSearchValues(res.data)
            console.log(searchValues + 'i should be here')
            localStorage.setItem('chosenCabin', NewCabin)
            localStorage.setItem('AvailableOptions', JSON.stringify(res.data))
            history.push("/ViewOptions")

        })
    }
    if(localStorage.getItem('Token')!= null){
    return (

        <div className="create">
            <h2>Search for a new Flight..</h2>
            <form>
                <label>Cabin Class</label>
                <select onChange={e => setNewCabin(e.target.value)} >
                    <option >Business</option>
                    <option >Economy</option>
                </select>
                <label>Date</label>
                <input
                    type="text"
                    placeholder="D-M-Y"
                    onChange={(e) => setNewDate(e.target.value)}
                />
                <button onClick={handleClick}>Search</button>
            </form>
        </div>
    )
    }
    else{
        return <div> <Error> </Error> </div>
    }
}
