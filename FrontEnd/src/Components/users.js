import React from 'react';
import { useState } from "react";
///import "../index.css"
import axios, { Axios } from "axios"
import Error from './Error';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import ChangePassword from './ChangePassword';
import BackButton from './BackButton';
function UpdateUser() {
    const [FirstName, setFirstName] = useState(0);
    const [LastName, setLastName] = useState(0);
    const [Email, setEmail] = useState(0);
    const [PassportNumber, setPassportNumber] = useState(0);
    const [Age, setAge] = useState(0);
    const [Password, setPassword] = useState(0);
    const [PhoneNumber, setPhoneNumber] = useState(0);
    const [message, setMessage] = useState("");
    function handleClick(event) {
        event.preventDefault()

        axios.put('http://localhost:3001/updateuser', obj, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + localStorage.getItem('Token')
            }
        }).then(res => {
            setMessage(res.data)
        }).catch(err => {
            console.log(err);
        })
        // }
    }
    function handleClick3(event) {
        event.preventDefault()
        console.log("hh")
        window.location.href = "/ChangePassword"
    }
    function handleClick4(event) {
        event.preventDefault()
        console.log("hh")
        window.location.href = "/ChangeEmail"
    }
    const obj = {
        FirstName: FirstName,
        LastName: LastName,
        Email: Email,
        PassportNumber: PassportNumber,
        Age: Age,
        PhoneNumber: PhoneNumber,
        Password: Password
    }
    if(localStorage.getItem('Token')!= null){
    return (
        <div className="body">
            <div className="container" >
                <div class="content">
                    <BackButton />
                    <h2 className="title">Update Info</h2>
                    <form>
                        <div className="user-details">
                            <div className="input-box">
                                <label>First Name </label>
                                <input
                                    type="text"
                                    // value={flightNumber}
                                    name="FirstName"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <label > Second Name</label>
                                <input
                                    type="text"
                                    //  value={arrivalTime}
                                    name="SecondName"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <label> Passport Number</label>
                                <input
                                    //  value={departure}
                                    name="PassportNumber"
                                    onChange={(e) => setPassportNumber(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <label> Age</label>
                                <input
                                    name="Age"
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <label> Phone Number</label>
                                <input
                                    name="PhoneNumber"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div class="signup_link">
                                <Link to onClick={handleClick4}>Change Email</Link>
                            </div>
                            <div class="signup_link">
                                <Link to onClick={handleClick3}>Change Password</Link>
                            </div>
                            <button className="XX" onClick={handleClick}>Update</button>
                        </div>
                    </form>
                    <h4>{message}</h4>
                </div>
            </div>
        </div>
    );
    }
    else{
        return <div> <Error> </Error> </div>
    }




}
export default UpdateUser;