import "../index.css";
import { useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import Error from './Error';

const SeatNumber = ({ SelectedFlight, PrevFlights }) => {

    //console.log("selected:"+SelectedFlight.AvailableEconomySeats[0]);
    //console.log("prev"+PrevFlights.AvailableEconomySeats);
    const [selectedEconomy, setSelectedEconomy] = useState([])
    const [PrevEconomy, setPrevEconomy] = useState([])
    let history = useHistory();
    console.log(selectedEconomy)
    console.log(PrevEconomy);
    function handleClick() {
        SelectedFlight['SelectedEconomySeat'] = selectedEconomy
        PrevFlights['PrevEconomySeat'] = PrevEconomy
        history.push('showSummary')
    }
    if(localStorage.getItem('Token')!= null){
    return (
        <div>
            <h1>Please choose your Seat Number for {SelectedFlight.DepartureTerminal} to {SelectedFlight.ArrivalTerminal} Flight</h1>
            <div className="checkbox">
                <h4>EconomySeats</h4>
                {SelectedFlight.AvailableEconomySeats.map(Economyseat => {
                    return (<div> <td>{Economyseat}</td>
                    </div>)
                })}
                <input type="text"
                    placeholder="EX:A0,A1,A2..."
                    onChange={(e) => setSelectedEconomy(e.target.value)}
                ></input>

                <h4>Business seats</h4>
                {SelectedFlight.AvailableBusinessSeats.map(BusinessSeat => {
                    return (<div> <td>{BusinessSeat}</td>
                    </div>)
                })}
                <input type="text" placeholder="EX:A0,A1,A2..." ></input>
            </div>
            <h1>Please choose your Seat Number for {PrevFlights.DepartureTerminal} to {PrevFlights.ArrivalTerminal} Flight</h1>
            <div className="checkbox">
                <h4>EconomySeats</h4>
                {PrevFlights.AvailableEconomySeats.map(Economyseat => {
                    return (<div> <td>{Economyseat}</td>
                    </div>)
                })}
                <input type="text"
                    placeholder="EX:A0,A1,A2..."
                    onChange={(e) => setPrevEconomy(e.target.value)}
                ></input>
                <h4>Business seats</h4>
                {PrevFlights.AvailableBusinessSeats.map(BusinessSeat => {
                    return (<div> <td>{BusinessSeat}</td>
                    </div>)
                })}
                <input type="text" placeholder="EX:A0,A1,A2..." ></input>

                <Link className="edit" to="/showSummary" onClick={handleClick}>Continue Booking</Link>

            </div>
        </div>
    );
            }
            else{
                return <div> <Error> </Error> </div>
            }
}

export default SeatNumber;