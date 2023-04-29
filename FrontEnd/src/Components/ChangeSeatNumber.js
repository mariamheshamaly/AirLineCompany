import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import { useState } from "react";
import Error from './Error';
function ChangeSeatNumber() {
    let history = useHistory();
    const F = localStorage.getItem('chosenOption')
    const flight = JSON.parse(F);
    const cabin = localStorage.getItem('chosenCabin')
    const [selectedEconomy, setSelectedEconomy] = useState([])
    const [selectedBusiness, setSelectedBusiness] = useState([])
    if (selectedEconomy == '') {
        localStorage.setItem('ChosenSeats', selectedBusiness);
    } else {
        localStorage.setItem('ChosenSeats', selectedEconomy);
    }

    let isEconomy = false;
    if (cabin == 'Economy') {
        isEconomy = true
    } else {
        isEconomy = false;
    }
    function handleClick() {


        history.push('/showSummaryChanged')





    }
    if(localStorage.getItem('Token')!= null){
    return (
        <div className="Cardbody">
            <div className="grid">
                {isEconomy ? <div id="grid-item" className="grid-item">
                    <div class="card">
                        <div class="card-content">
                            <h1 className="card-header">Please choose your Seat Number for {flight.DepartureTerminal}</h1>
                            {flight.AvailableEconomySeats.map(Economyseat => {
                                return (<p className="card-text">
                                    <h4>EconomySeats</h4>
                                    <td>{Economyseat}</td>

                                </p>)
                            })}
                            <input type="text"
                                placeholder="EX:A0,A1,A2..."
                                onChange={(e) => setSelectedEconomy(e.target.value)}
                            ></input>

                        </div>

                    </div>
                    <Link className="card-btn" to="/showSummaryChanged" onClick={handleClick}>Continue Booking <span>&rarr;</span></Link>

                </div>

                    : <div id="grid-item" className="grid-item">
                        <div class="card">
                            <div class="card-content">
                                <h1 className="card-header">Please choose your Seat Number for {flight.DepartureTerminal}</h1>

                                <h4>Business Seat</h4>
                                {flight.AvailableBusinessSeats.map(BusinessSeat => {
                                    return (<p className="card-text"> <td>{BusinessSeat}</td>
                                    </p>)
                                })}
                                <input type="text"
                                    placeholder="EX:A0,A1,A2..."
                                    onChange={(e) => setSelectedBusiness(e.target.value)}
                                ></input>
                            </div>
                        </div>

                        <Link className="card-btn" to="/showSummaryChanged" onClick={handleClick}>Continue Booking <span>&rarr;</span></Link>


                    </div>}



            </div> </div>

    );
                            }
                            else{
                                return <div> <Error> </Error> </div>
                            }
}

export default ChangeSeatNumber;