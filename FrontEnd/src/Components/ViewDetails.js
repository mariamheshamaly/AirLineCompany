import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
const ViewDetails = ({ FlightNumber, DepartureTime, ArrivalTime, ArrivalDate,
    DepartureDate, ArrivalTerminal,
    DepartureTerminal, EconomySeats,
    BusinessClassSeats, Airport,
    Cabin, ReturnedFlights }) => {
    let history = useHistory();
    function handleClick() {
        history.push('/seatnumber')
    }


    return (
        <div>
            <h1>Your Selected Flight</h1>
            <div className='flights'>

                <ul>

                    <li>Flight Number : {FlightNumber}</li>
                    <li> Departure Time : {DepartureTime}</li>
                    <li>Arrival Time : {ArrivalTime}</li>
                    <li>Arrival Date : {ArrivalDate}</li>
                    <li> Departure Date : {DepartureDate}</li>
                    <li> Arrival Terminal : {ArrivalTerminal}</li>
                    <li> Departure Terminal : {DepartureTerminal}</li>
                    <li>Available Economy Seats : {EconomySeats}</li>
                    <li>Available Business Class Seats : {BusinessClassSeats}</li>
                    <li>Airport : {Airport}</li>
                    <li>  Cabin : {Cabin}</li>
                </ul>
            </div>
            <h1>Select a Return Flight</h1>
            { ReturnedFlights ? ReturnedFlights.map(flight => {
                { console.log(flight) }

                return <div className='flights'>
                    <ul >
                        <li>Flight Number : {flight.FlightNumber} </li>
                        <li>Arrival Time : {flight.ArrivalTime} </li>
                        <li> Departue Date : {flight.DepartureDate} </li>
                        <li> Arrival Terminal : {flight.ArrivalTerminal} </li>
                        <li> Departure Terminal : {flight.DepartureTerminal} </li>
                        <li> Economy Seats : {flight.EconomySeats}</li>
                        <li> Business Class Seats : {flight.BusinessClassSeats}</li>
                        <li>Airport : {flight.Airport}</li>

                        <hr></hr>
                        <Link to="/seatnumber" onClick={handleClick} className="edit"> Book Flight</Link>
                    </ul>
                </div>
            }) : <h1>Loading</h1>}

        </div>

    );
}

export default ViewDetails;