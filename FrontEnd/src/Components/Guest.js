import React from "react";
import { Component } from 'react';
import "./NavBar.css"
import Viewreservedflights from "./Viewreservedflights";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
//import '../App.css'
import { useState, useEffect } from "react";
import "./Card.css"
import UserSearchResult from './UserSearchResults'
import axios, { Axios } from "axios"
import UserSearchFlight from './UserSearchFlight'
import SearcherFinal from './SearcherFinal';
import SearchFlights from './SearchFlights';
import SecondPopup from './SecondPopup'
import Flights from './Flights';
import Login from "./Login";








function Guest() {
  const [data, setData] = React.useState(null);
  const [searchValues, setSearchValues] = useState([])
  const [FlightDetails, setFlightDetails] = useState([])
  const [ReturnedFlights, setReturnedFlights] = useState([])
  const [PrevFlights, setPrevFlights] = useState([])

  const sentObj = {};




  return (
    <>
      <Router>
        <nav>
          <div class="logo">
            <p>Mr.Robot</p>
          </div>
          <ul>
            <li><Link to="/searchflight"> Book Flight</Link></li>
            {/* <li>  <Link to="/usersearchFlight"> User Search Flight</Link></li> */}
            <li>  <Link onClick={() => { window.location.href = "/login" }}> login</Link></li>
          </ul>
        </nav>
        {/* <img  className="background" src="/pexels-austin.jpeg"/> */}


        <Switch>

          <Route path="/login" exact component={Login} />
          <Route path="/searchfinalresults" exact component={SearcherFinal} />
          <Route path="/searchresults" exact component={SearchResults} />
          <Route path="/usersearchFlight" exact component={UserSearchFlight} />
          <Route path="/usersearchResults" exact component={UserSearchResult} />
          <Route path="/viewflights" exact component={Flights} />
          <Route path="/searchflight" exact component={SearchFlights} />
          <Route path="/Viewreservedflights" exact component={Viewreservedflights} />
          <Route path="/showSummary" exact component={ShowSummary} />
          <Route path="/viewDetails" exact component={ViewDetails} />
          <Route path="/seatnumber" exact component={SeatNumber} />
          {/* <Route path="/showSummary" exact component={() => <ShowSummary SelectedFlight={FlightDetails} PrevFlights={PrevFlights} />} /> */}
          <Route path="/seatnumber" exact component={ShowSummary} />


        </Switch>


      </Router>



    </>
  );









  function ShowSummary() {
    const [popUpBtn, setPopUpBtn] = useState(false);

    console.log('XXXXXXX')
    console.log(FlightDetails)
    console.log(PrevFlights)
    console.log('XXXXXXX')

    return <div >
      <h1>Summary of your Bookings</h1>
      <h4>Your First Flight</h4>
      <div className='flights'>
        <ul >
          {typeof FlightDetails.bookingNumber != 'undefined' ? <div> <li>bookingNumber : {FlightDetails.bookingNumber}</li></div>
            : ""}
          <li>ArrivalAirport : {FlightDetails.ArrivalAirport} </li>
          <li>DepartureAirport : {FlightDetails.DepartureAirport} </li>
          <li>Arrival Date : {FlightDetails.ArrivalDate} </li>
          <li> Arrival Terminal : {FlightDetails.ArrivalTerminal} </li>
          <li> Arrival Time : {FlightDetails.ArrivalTime} </li>
          <li> Departure Date : {FlightDetails.DepartureDate} </li>
          <li> Departure Terminal : {FlightDetails.DepartureTerminal}</li>
          <li> Departure Time : {FlightDetails.DepartureTime}</li>
          <li>Flight Price : {FlightDetails.TotalPrice}</li>
          {FlightDetails.Cabin == 'Economy' ? <div> <li>Selected Economy Seat : {FlightDetails.SelectedEconomySeat}</li></div> : <div> <li>Selected Business Seat : {FlightDetails.SelectedBusinessSeat}</li></div>}

        </ul>
      </div>
      <h4>Your Return Flight</h4>
      <div className='flights'>
        <ul>
          {typeof PrevFlights.bookingNumber != 'undefined' ? <div> <li>bookingNumber : {PrevFlights.bookingNumber}</li></div>
            : ""}
          <li>ArrivalAirport : {PrevFlights.ArrivalAirport} </li>
          <li>DepartureAirport : {PrevFlights.DepartureAirport} </li>
          <li>Arrival Date : {PrevFlights.ArrivalDate} </li>
          <li> Arrival Terminal : {PrevFlights.ArrivalTerminal} </li>
          <li> Arrival Time : {PrevFlights.ArrivalTime} </li>
          <li> Departure Date : {PrevFlights.DepartureDate} </li>
          <li> Departure Terminal : {PrevFlights.DepartureTerminal}</li>
          <li> Departure Time : {PrevFlights.DepartureTime}</li>
          <li> Flight Price : {PrevFlights.TotalPrice}</li>
          {PrevFlights.Cabin == 'Economy' ? <div> <li>Selected Economy Seat : {PrevFlights.PrevEconomySeat}</li></div> : <div> <li>Selected Business Seat : {PrevFlights.PrevBusinessSeat}</li></div>}
        </ul>
      </div>
      <h2>The Total Price is {FlightDetails.TotalPrice + PrevFlights.TotalPrice}</h2>
      <Link className="edit" to="/showSummary" onClick={() => setPopUpBtn(true)} >Book Now</Link>
      <SecondPopup trigger={popUpBtn} setTrigger={setPopUpBtn} SelectedFlights={FlightDetails} PrevFlights={PrevFlights}>Confirm Your Booking?</SecondPopup>

    </div>
  }



  function SeatNumber() {

    //console.log("selected:"+SelectedFlight.AvailableEconomySeats[0]);
    //console.log("prev"+PrevFlights.AvailableEconomySeats);
    const [selectedEconomy, setSelectedEconomy] = useState([])
    const [PrevEconomy, setPrevEconomy] = useState([])
    const [selectedBusiness, setSelectedBusiness] = useState('')
    const [PrevBusiness, setPrevBusiness] = useState('')
    const [price, setPrice] = useState(0)
    let history = useHistory();

    function handleClick() {
      const updatedSelectedFlight = FlightDetails
      if (FlightDetails.Cabin == 'Economy') {
        const selectedEconomyArray = selectedEconomy.split(",");
        const selectedPrice = selectedEconomyArray.length * FlightDetails.EconomySeatPrice
        const price = selectedPrice;
        updatedSelectedFlight['SelectedEconomySeat'] = selectedEconomy
        updatedSelectedFlight['TotalPrice'] = selectedPrice
        setFlightDetails(updatedSelectedFlight);
      } else {
        const selectedBusinessArray = selectedBusiness.split(",");
        const selectedPrice = selectedBusinessArray.length * FlightDetails.BusinessClassSeatPrice
        const price = selectedPrice;
        updatedSelectedFlight['SelectedBusinessSeat'] = selectedBusiness
        updatedSelectedFlight['TotalPrice'] = selectedPrice
        setFlightDetails(updatedSelectedFlight)
      }

      const updatedPrevFlight = PrevFlights
      if (PrevFlights.Cabin == 'Economy') {
        const prevEconomyArray = PrevEconomy.split(",");
        const prevPrice = prevEconomyArray.length * PrevFlights.EconomySeatPrice

        updatedPrevFlight['PrevEconomySeat'] = PrevEconomy
        updatedPrevFlight['TotalPrice'] = prevPrice
        setPrevFlights(updatedPrevFlight)
      } else {
        const prevBusinessArray = PrevBusiness.split(",");
        const prevPrice = prevBusinessArray.length * PrevFlights.BusinessClassSeatPrice
        updatedPrevFlight['PrevBusinessSeat'] = PrevBusiness
        updatedPrevFlight['TotalPrice'] = prevPrice
        setPrevFlights(updatedPrevFlight)
      }
      const printer = FlightDetails.TotalPrice + PrevFlights.TotalPrice;
      console.log('The total price is ' + printer)

      history.push('showSummary')
    }
    return (
      <div className="Cardbody">
        <div className="grid">
          <div id="grid-item" className="grid-item">
            <div class="card">
              <div class="card-content">
                <h1 className="card-header">Seats for {PrevFlights.DepartureTerminal} to {PrevFlights.ArrivalTerminal} Flight</h1>
                <div >
                  {PrevFlights.Cabin == 'Economy' ? <p className="card-text">
                    <h4>EconomySeats</h4>
                    {PrevFlights.AvailableEconomySeats.map(Economyseat => {
                      return (
                        <p className="card-text">
                          <p>{Economyseat}</p>
                        </p>
                      )
                    })}
                    <input type="text"
                      placeholder="EX:A0,A1,A2..."
                      onChange={(e) => setPrevEconomy(e.target.value)}
                    >
                    </input>
                  </p> : <div>
                      <h4>Business seats</h4>
                      {PrevFlights.AvailableBusinessSeats.map(BusinessSeat => {
                        return (
                          <p className="card-text">
                            <td>{BusinessSeat}</td>
                          </p>
                        )
                      })}
                      <input type="text"
                        placeholder="EX:A0,A1,A2..."
                        onChange={(e) => setPrevBusiness(e.target.value)}
                      >
                      </input>
                    </div>}
                </div>
              </div>
            </div>
          </div>
          <div id="grid-item" className="grid-item">
            <div class="card">
              <div class="card-content">
                <h1 className="card-header" >Seats for {FlightDetails.DepartureTerminal} to {FlightDetails.ArrivalTerminal} Flight</h1>
                <div >
                  {FlightDetails.Cabin == 'Economy' ? <div>
                    <h4>EconomySeats</h4>
                    {FlightDetails.AvailableEconomySeats.map(Economyseat => {
                      return (<p className="card-text">
                        <td>{Economyseat}</td>
                      </p>
                      )
                    })}
                    <input type="text"
                      placeholder="EX:A0,A1,A2..."
                      onChange={(e) => setSelectedEconomy(e.target.value)}
                    >
                    </input>
                  </div>
                    : <div>
                      <h4>Business seats</h4>
                      {FlightDetails.AvailableBusinessSeats.map(BusinessSeat => {
                        return (
                          <p className="card-text">
                            <td>{BusinessSeat}</td>
                          </p>)
                      })}
                      <input type="text" placeholder="EX:A0,A1,A2..."
                        onChange={(e) => setSelectedBusiness(e.target.value)} ></input>
                    </div>}
                </div>
              </div>
            </div>
            <Link id="card-btn" className="card-btn" to="/login" onClick={() => {
                    
                    localStorage.setItem("history", "guest")
                    window.location.href = "/login"
                  }} > Continue Booking <span>&rarr;</span></Link>

        </div>
      </div>
      </div>
    );
  }


  function ViewDetails() {
    let history = useHistory();
    function chooseFlight(flight) {
      setPrevFlights(flight);
    }
    return (
      <div className="Cardbody">
        <div className="grid">
          <div id="grid-item" className="grid-item">
            <div class="card">
              <div class="card-content">
                <h1 className="card-header">Your Selected Flight</h1>
                <p className="card-text">
                  <p>Flight Number : {FlightDetails.FlightNumber}</p>
                  <p> Departure Time : {FlightDetails.DepartureTime}</p>
                  <p>Arrival Time : {FlightDetails.ArrivalTime}</p>
                  <p>Arrival Date : {FlightDetails.ArrivalDate}</p>
                  <p> Departure Date : {FlightDetails.DepartureDate}</p>
                  <p> Arrival Terminal : {FlightDetails.ArrivalTerminal}</p>
                  <p> Departure Terminal : {FlightDetails.DepartureTerminal}</p>
                  <p>Available Economy Seats : {FlightDetails.EconomySeats}</p>
                  <p>Available Business Class Seats : {FlightDetails.BusinessClassSeats}</p>
                  <p>ArrivalAirport : {FlightDetails.ArrivalAirport} </p>
                  <p>DepartureAirport : {FlightDetails.DepartureAirport} </p>
                  <p>  Cabin : {FlightDetails.Cabin}</p>
                </p>
              </div>
            </div>
          </div>

          {ReturnedFlights ? ReturnedFlights.map(flight => {
            { console.log(flight) }
            return <div id="grid-item" className="grid-item">
              <div id="card" class="card">
                <div class="card-content">
                  <h1 className="card-header"> Return Flight</h1>
                  <p className="card-text" >
                    <p>Flight Number : {flight.FlightNumber} </p>
                    <p>Arrival Time : {flight.ArrivalTime} </p>
                    <p> Departue Date : {flight.DepartureDate} </p>
                    <p> Arrival Terminal : {flight.ArrivalTerminal} </p>
                    <p> Departure Terminal : {flight.DepartureTerminal} </p>
                    <p> Economy Seats : {flight.EconomySeats}</p>
                    <p> Business Class Seats : {flight.BusinessClassSeats}</p>
                    <p>ArrivalAirport : {FlightDetails.ArrivalAirport} </p>
                    <p>DepartureAirport : {FlightDetails.DepartureAirport} </p>
                  </p>
                  <Link id="card-btn" className="card-btn" to="/seatnumber" onClick={() => {
                    history.push('/seatnumber')
                    chooseFlight(flight);
                  }} > Book Flight <span>&rarr;</span></Link>

                </div>
              </div>
            </div>
          }) : <h1>Loading</h1>}
        </div>
      </div>
    );
  }

  function SearchResults() {
    let history = useHistory();

    useEffect(() => {
      receivedata();
    }, [searchValues])

    const receivedata = async () => {
      await axios.get('http://localhost:3001/getresults').then((response) => {

        setSearchValues(response.data)
        //  console.log(searchValues);
        //   console.log("holaaaa")
        //  console.log(searchValues.length)
      }).catch(err => {
        console.log(err)
        console.log("i am here")

      })
    }

    function handleClick() {
      history.push('/viewDetails')
    }

    const updateFriend = (FlightNumber) => {
      setFlightDetails(FlightNumber)

      console.log('hoeeaaa')
      console.log(FlightDetails)
      console.log('xxxxxx')
      sentObj['ArrivalTerminal'] = FlightDetails.DepartureTerminal
      sentObj['DepartureTerminal'] = FlightDetails.ArrivalTerminal
      console.log('sent object')
      console.log(sentObj)
      axios.post('http://localhost:3001/getOpposite', sentObj).then(() => {
        //  console.log("yes");
      }).catch(err => {
        console.log(err)
        console.log("i am here")
      })


      axios.get('http://localhost:3001/sendOpposite').then((response) => {
        console.log('this is the returned flights')
        setReturnedFlights(response.data)
        console.log(ReturnedFlights);

      }).catch(err => {
        console.log(err)
        console.log("i am here")

      })
    }
    return (
      <div>
        {searchValues.length !== 0 || typeof searchValues != undefined ? searchValues.map(flight => {
          return <div className="Cardbody">
            <div className="grid">
              <div className="grid-item">
                <div class="card">
                  <div class="card-content">
                    <h1 class="card-header">{flight.ArrivalTerminal} to  {flight.DepartureTerminal}</h1>
                    <p class="card-text">
                      <li>Flight Number : {flight.FlightNumber} </li>
                      <li>Cabin : {flight.Cabin} </li>
                    </p>
                    <Link className="card-btn" to="/viewDetails" onClick={() => {
                      history.push('/viewDetails')
                      console.log(flight)
                      console.log('this is the flight passed to updatefirend')
                      updateFriend(flight)
                    }}>Select Flight <span>&rarr;</span></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }) : <h1>No Results Found</h1>
        }
      </div>
    );
  }
}
export default Guest;
