import React from 'react';
import { useState } from "react";
//import "../index.css"
import axios, { Axios } from "axios"
import "./regStyles.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import BackButton from './BackButton';

const Signup = () => {

    const [FirstName, setFirstName] = useState("");
    const [UserID, setUserID] = useState(0);
    const [LastName, setLastName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [PhoneNumber, setTelephoneNumber] = useState(0);
    const [PassportNumber, setPassportNumber] = useState(0);
    const [CountryCode, setCountryCode] = useState(0);
    const [HomeAddress, setHomeAddress] = useState("");
    const [UserName, setUserName] = useState("");
    const [message, setMessage] = useState('')

    const object = {
        UserID: UserID,
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        Password: Password,
        PhoneNumber: PhoneNumber,
        PassportNumber: PassportNumber,
        CountryCode: CountryCode,
        HomeAddress: HomeAddress,
        UserName: UserName,
    }

    function handleClick(event) {
        event.preventDefault()
        axios.post('http://localhost:3001/registration', object).then(res => {
            console.log(res);
            setMessage(res.data.msg)
            console.log(res.data.msg)
            if (res.data != "Sign up Failed")
                // window.location.href = "/login"
                console.log(message)


        })


    }
    function handleClick2(event) {
        event.preventDefault()
        axios.post('http://localhost:3000/Home')
        window.location.href = "/login"


    }

    return (
        <body className="body">

            <div className="container" >


                <div class="content">
                    <BackButton />
                    <h2 className="title">SIGN UP</h2>
                    <form>
                        <div className="user-details">
                            <div className="input-box">
                                <span class="details">First Name</span>
                                <input
                                    type="text"
                                    name="firstname"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>

                            <div className="input-box">
                                <span class="details">userID</span>
                                <input
                                    type="text"
                                    name="userID"
                                    onChange={(e) => setUserID(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <span class="details">last Name</span>
                                <input
                                    type="text"
                                    name="lastname"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <span class="details">Email</span>
                                <input
                                    type="text"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <span class="details">Username</span>
                                <input
                                    type="text"
                                    name="username"
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>

                            <div className="input-box">
                                <span class="details">Password</span>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <div className="input-box">
                                <span class="details">telephone number</span>
                                <input
                                    type="text"
                                    name="telephonenumber"
                                    onChange={(e) => setTelephoneNumber(e.target.value)}
                                />
                            </div>


                            <div className="input-box">
                                <span class="details">Passport Number</span>
                                <input
                                    type="text"
                                    name="passportnumber"
                                    onChange={(e) => setPassportNumber(e.target.value)}
                                />
                            </div>

                            <div className="input-box">
                                <span class="details">Country Code</span>
                                <input
                                    type="text"
                                    name="countrycode"
                                    onChange={(e) => setCountryCode(e.target.value)}
                                />
                            </div>

                            <div className="input-box">
                                <span class="details">Home Address</span>
                                <input
                                    type="text"
                                    name="homeaddress"
                                    onChange={(e) => setHomeAddress(e.target.value)}
                                />
                            </div>

                            <button className="button" onClick={handleClick}>SignUp</button>

                        </div>
                    </form>

                    <h2>{message}</h2>
                </div>

            </div>
        </body>
    )



}



export default Signup;