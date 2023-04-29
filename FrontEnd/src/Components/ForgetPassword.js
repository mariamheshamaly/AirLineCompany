import React from 'react';
import { useState } from "react";
import "../index.css"
import axios, { Axios } from "axios"
import Error from './Error';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";


const ForgetPassword = () => {
    const [Email, setEmail] = useState("");
    const [message, setMessage] = useState('')


    const obj = {
        Email: Email

    }

    function handleClick(event) {
        event.preventDefault()
        console.log("hh")
        axios.post('http://localhost:3001/ForgetPassword', obj, {

        }).then(res => {
            setMessage(res.data.msg)

            if (res.data.msg == "New Password has been sent to your Email") {
                console.log(res.data.pass)
                const obj2 = {
                    Password: res.data.pass,
                    Email: Email
                }
                axios.put('http://localhost:3001/changePassword2', obj2, {

                }).then(res => {
                    setMessage(res.data)
                    console.log(res.data)

                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(err => {
            console.log(err);

        })

        // }

    }
    return (
        <div className="create">
            <form>

                <label>Enter your Email </label>
                <input
                    type="text"

                    // value={flightNumber}
                    name="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />



                <button onClick={handleClick}>Done</button>





            </form>
            <h4>{message}</h4>

        </div>
    );





}
export default ForgetPassword;