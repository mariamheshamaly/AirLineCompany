import { useState } from "react";
import "../index.css"
import axios, { Axios } from "axios"
import Error from './Error';
const Create = () => {
    const [FlightNumber, setFlightNumber] = useState(0);
    const [ArrivalTime, setArrivalTime] = useState(0);
    const [DepartureTime, setDeparturetime] = useState(0);
    const [DepartureDate, setDepartureDate] = useState(0);
    const [EconomySeats, setEconomySeats] = useState(0);
    const [BusinessClassSeats, setBusinessSeats] = useState(0);
    // const [date, setDate] = useState(0);
    const [ArrivalDate, setArrivalDate] = useState(0);
    const [DepartureAirport, setDepartureAirport] = useState("");
    const [ArrivalAirport, setArrivalAirport] = useState("");
    const [ChildrenSeats, setChildrenSeats] = useState(0);
    const [AdultSeats, setAdultSeats] = useState(0);
    const [BusinessClassSeatPrice, setBusinessClassSeatPrice] = useState(0);
    const [EconomySeatPrice, setEconomySeatPrice] = useState(0);
    const [Cabin, setCabin] = useState("");
    const [TripDuration, setTripDuration] = useState(0);
    const [Baggage, setBaggage] = useState(0);
    const [ArrivalTerminal, setArrivalTerminal] = useState("");
    const [DepartureTerminal, setdepartureTerminal] = useState("");
    const [isAvailable, setAvailable] = useState("ww")

    const [message, setMessage] = useState('')
    const obj = {
        flightN: FlightNumber,
        arrivalT: ArrivalTime,
        DepartureTime: DepartureTime,
        DepartureDate: DepartureDate,
        ArrivalDate: ArrivalDate,
        economy: EconomySeats,
        business: BusinessClassSeats,
        DepartureAirport: DepartureAirport,
        ChildrenSeats: ChildrenSeats,
        AdultSeats: AdultSeats,
        Cabin: Cabin,
        TripDuration: TripDuration,
        Baggage: Baggage,
        ArrivalAirport: ArrivalAirport,
        ArrivalTerminal: ArrivalTerminal,
        DepartureTerminal: DepartureTerminal,
        BusinessClassSeatPrice: BusinessClassSeatPrice,
        EconomySeatPrice: EconomySeatPrice

    }

    function handleClick(event) {
        event.preventDefault()
        axios.post('http://localhost:3001/createflight', obj, {
            header: {
                'Content-Type': 'application/json',
                'authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjM5NDMwNzIzfQ.6relacxCtA3vlYZAkKnEaIzkfb1x8lX7Qk8Jc02NiyM'
            }
        }).then(res => {
            setMessage(res.data)
            console.log(message)
        })

    }
    if (localStorage.getItem('Token') != null && localStorage.getItem('UserName') === "admin") {
        return (
            <div className="body">
                <div className="container" >
                    <div className="content">

                        <form>


                            <h2 className="title">Create a new Flight</h2>
                            <div className="user-details">
                                <div className="input-box2">
                                    <label>Flight number </label>
                                    <input
                                        type="text"

                                        // value={flightNumber}
                                        name="flightnumber"
                                        onChange={(e) => setFlightNumber(e.target.value)}
                                    />
                                </div>
                                <div className="input-box2">
                                    <label> Departure Airport</label>
                                    <input
                                        type="text"
                                        name="departureairport"
                                        onChange={(e) => setDepartureAirport(e.target.value)}
                                    />
                                </div>
                                <div className="input-box2">
                                    <label> Arrival Airport</label>
                                    <input
                                        type="text"
                                        name="arrivalairport"
                                        onChange={(e) => setArrivalAirport(e.target.value)}
                                    />
                                </div>
                                <div className="input-box2">
                                    <label> Business Class Seat Price</label>
                                    <input
                                        type="text"
                                        name="businessclassseatprice"
                                        onChange={(e) => setBusinessClassSeatPrice(e.target.value)}
                                    />
                                </div>
                                <div className="input-box2">
                                    <label> Economy Seat Price</label>
                                    <input
                                        type="text"
                                        name="economyseatprice"
                                        onChange={(e) => setEconomySeatPrice(e.target.value)}
                                    />
                                </div>
                                <div className="input-box2">
                                    <label> Children Seats</label>
                                    <input
                                        type="text"
                                        name="childrenseats"
                                        onChange={(e) => setChildrenSeats(e.target.value)}
                                    />
                                </div>
                                <div className="input-box2">
                                    <label> Adult Seats</label>
                                    <input
                                        type="text"
                                        name="adultseats"
                                        onChange={(e) => setAdultSeats(e.target.value)}
                                    />
                                </div>
                                <div className="input-box2">
                                    <label> Trip Duration</label>
                                    <input
                                        type="text"
                                        name="tripduration"
                                        onChange={(e) => setTripDuration(e.target.value)}
                                    />
                                </div>
                                <div className="input-box2">
                                    <label> Cabin</label>
                                    <input
                                        type="text"
                                        name="cabin"
                                        onChange={(e) => setCabin(e.target.value)}
                                    />
                                </div>
                                <div className="input-box2">
                                    <label> Baggage Allowance</label>
                                    <input
                                        type="text"
                                        name="baggage"
                                        onChange={(e) => setBaggage(e.target.value)}
                                    />
                                </div>
                                <div className="input-box2">
                                    <label>Arrival time </label>
                                    <input

                                        type="text"

                                        //  value={arrivalTime}
                                        name="arrivaltime"
                                        onChange={(e) => setArrivalTime(e.target.value)}
                                    />
                                </div>
                                <div className="input-box2">
                                    <label>Departure Time</label>
                                    <input


                                        //  value={departure}
                                        name="departuretime"
                                        onChange={(e) => setDeparturetime(e.target.value)}
                                    ></input>
                                </div>
                                <div className="input-box2">

                                    <label>Departure Date</label>
                                    <input


                                        //  value={departure}
                                        name="departuredate"
                                        onChange={(e) => setDepartureDate(e.target.value)}
                                    ></input>

                                </div>
                                <div className="input-box2">

                                    <label>Number Of Economy Seats</label>
                                    <input


                                        //  value={economySeats}
                                        name="economyseats"
                                        onChange={(e) => setEconomySeats(e.target.value)}
                                    ></input>

                                </div>
                                <div className="input-box2">

                                    <label>Number Of Business Class Seats</label>
                                    <input

                                        //    value={businessSeats}
                                        name="businessseats"
                                        onChange={(e) => setBusinessSeats(e.target.value)}
                                    ></input>

                                </div>


                                <div className="input-box2">


                                    <label>Departure Terminal </label>
                                    <input
                                        type="text"
                                        //required
                                        // value={flightNumber}
                                        name="departureterminal"
                                        onChange={(e) => setdepartureTerminal(e.target.value)}
                                    />
                                </div>
                                <div className="input-box2">
                                    <label>Arrival Terminal </label>
                                    <input
                                        type="text"
                                        // required
                                        // value={flightNumber}
                                        name="arrivalterminal"
                                        onChange={(e) => setArrivalTerminal(e.target.value)}
                                    />
                                </div>
                                <div className="input-box2">

                                    <label>Arrival Date </label>
                                    <input
                                        type="text"
                                        //    required
                                        // value={flightNumber}
                                        name="arrivaldate"
                                        onChange={(e) => setArrivalDate(e.target.value)}
                                    />
                                </div>
                                <button className="XX" onClick={handleClick}>create</button>
                            </div>

                        </form>

                        <h4>{message}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else {
        return <div> <Error> </Error> </div>
    }
}

export default Create;