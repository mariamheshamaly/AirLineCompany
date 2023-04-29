import React from 'react'
import { useHistory } from 'react-router-dom';

import Error from './Error';

export default function ReservedFlightDetails(props) {
  let history = useHistory();
  const F = localStorage.getItem('flight')
  const flight = JSON.parse(F);
  const dep = flight.DepartureTerminal
  console.log(dep)
  if(localStorage.getItem('Token')!= null){
  return (
    <div className="Cardbody">
      <div className="grid">
        <div id="grid-item" className="grid-item">
          <div class="card">
            <div class="card-content">
              <p className="card-text">Flight Number : {flight.FlightNumber} </p>
              <p className="card-text">Arrival Time : {flight.ArrivalTime} </p>
              <p className="card-text"> Departue Date : {flight.DepartureDate} </p>
              <p className="card-text">Arrival Terminal : {flight.ArrivalTerminal} </p>
              <p className="card-text"> Departure Terminal : {flight.DepartureTerminal} </p>
              <p className="card-text">Chosen Seats: {flight.PrevBusinessSeat}{flight.SelectedBusinessSeat}
                {flight.PrevEconomySeat}{flight.SelectedEconomySeat}
              </p>
              <button id="card-btn" className="card-btn" onClick={() => {
                localStorage.setItem('flight', JSON.stringify(flight))
                history.push('/searchNewFlight')

              }}>Choose Another Flight</button>

            </div></div>
        </div>
      </div>
    </div>
  )
            }
            else{
              return <div> <Error> </Error> </div>
            }
}