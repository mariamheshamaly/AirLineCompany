import react from "react";
import "../index.css"
import Error from './Error';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory

} from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';
import DeletePopup from '../Components/DeletePopup'
import axios from 'axios'

let i = 0;

function Reservedflights() {
    let history = useHistory();
    const [popUpBtn, setPopUpBtn] = useState(false);
    const [Viewreservedflights, setreservedflights] = useState([]);
    const [flight, setFlight] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get('http://localhost:3001/Viewreservedflights').then((response) => {
            setreservedflights(response.data.message);
        });
    }, [Viewreservedflights]);
    const DeleteMe = (event) => {
        event.preventDefault()
        setPopUpBtn(true);

    }
    if(localStorage.getItem('Token')!= null){
    return (
        <div className="Cardbody">
            <div className="grid">

                {Viewreservedflights ? Viewreservedflights.map(flight => {
                    return <div id="grid-item" className="grid-item">
                        <div class="card">
                            <div class="card-content">
                                <p className="card-text">
                                    <p>User Email : {flight.UserEmail} </p>
                                    <p>Flight Number : {flight.FlightNumber} </p>
                                    <p>Arrival Time : {flight.ArrivalTime} </p>
                                    <p> Departue Date : {flight.DepartureDate} </p>
                                    <p> Arrival Terminal : {flight.ArrivalTerminal} </p>
                                    <p> Departure Terminal : {flight.DepartureTerminal} </p>
                                    {flight.PrevBusinessSeat ? <p>Chosen Business Class Seats:{flight.PrevBusinessSeat}</p> : ""}
                                    {flight.SelectedBusinessSeat ? <p>Chosen Business Class Seats:{flight.SelectedBusinessSeat}</p> : ""}
                                    {flight.PrevEconomySeat ? <p>Chosen Economy Class Seats:{flight.PrevEconomySeat}</p> : ""}
                                    {flight.SelectedEconomySeat ? <p>Chosen Economy Class Seats:{flight.SelectedEconomySeat}</p> : ""}

                                </p>
                                <button className="CancelCard-btn" onClick={(event) => {
                                    DeleteMe(event)
                                    setFlight(flight)
                                    console.log("flight" + flight)
                                }}> Cancel Reservation</button>
                                <div>   </div>
                                <button className="Selectcard-btn" onClick={() => {
                                    localStorage.setItem('flight', JSON.stringify(flight))
                                    history.push('/ReservedFlightDetails')

                                }}>select</button>
                                <button className="emailCard-btn" onClick={(event) => {
                                    axios.post('/emailme', flight).then(res => {
                                        console.log(res.data.msg)
                                        if (res.data.msg != 'Email is Sent Successfully') {
                                            setIsLoading(true);
                                        } else {
                                            setIsLoading(false);
                                        }
                                        //  setMessage(res.data)
                                        console.log('myy message')
                                        //    console.log(message)
                                    })
                                }}> Email Me</button>
                            </div>
                        </div>
                    </div>





                }) : <h1>No Results Found</h1>

                }
                <div>
                    {isLoading ? <div></div> : <div><h3>Email is Sent</h3></div>}

                </div>

                <DeletePopup
                    flightnum={flight} trigger={popUpBtn} setTrigger={setPopUpBtn} >
                    <h3>Are you sure you want to cancel this flight? </h3>
                </DeletePopup>
            </div>

        </div>)
    }
    else{
        return <div> <Error> </Error> </div>
    }
}


export default Reservedflights