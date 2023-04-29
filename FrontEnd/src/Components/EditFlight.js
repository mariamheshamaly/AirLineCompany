import axios from 'axios';
import React, { useState} from 'react'
import {  useHistory} from "react-router-dom";
import Error from './Error';
export default function EditFlight() {
    let history=useHistory();
    const F=localStorage.getItem('flight')
    const flight=JSON.parse(F);
    console.log(flight)
    const FlightNumber=flight.FlightNumber
    const oldDepartureChosenSeats=flight.PrevBusinessSeat || flight.PrevEconomySeat
    const oldReturnChosenSeats=flight.SelectedBusinessSeat || flight.SelectedEconomySeat
    console.log("departure"+oldDepartureChosenSeats)
    console.log("return"+oldReturnChosenSeats)

    const [ChosenSeats, setChosenSeats]=useState(oldDepartureChosenSeats || oldReturnChosenSeats);
    const [message, setMessage] = useState('')
    const obj={
        ChosenSeats:ChosenSeats,
        FlightNumber:FlightNumber
    }

    function handleClick(){
        if(oldDepartureChosenSeats!=undefined){
axios.put('http://localhost:3001/EditDepartureFlight',obj).then(res => {
    setMessage(res.data)
    })}
    if(oldReturnChosenSeats!=undefined){
        axios.put('http://localhost:3001/EditReturnFlight',obj).then(res => {
            setMessage(res.data)
            })}
                }

                function handleChooseFlight(){
                    history.push("/SearchNewFlight")
                }
                if(localStorage.getItem('Token')!= null){
    return (
        <div className="create">
             <h2>Please Change the fields you want to edit</h2>
             <form>
            
               <label> Chosen Seats</label>
                    <input
                      type="text"
                      placeholder={oldDepartureChosenSeats || oldReturnChosenSeats}
                    onChange={(e) => setChosenSeats(e.target.value)}
                />
                  </form>
                  <button onClick={handleClick}>Edit</button><>

                  </>
                 <div> <button onClick={handleChooseFlight}>Choose another flight</button></div>
                  <h4>{message}</h4>
        </div>
    )
                }
                else{
                    return <div> <Error> </Error> </div>
                }
}