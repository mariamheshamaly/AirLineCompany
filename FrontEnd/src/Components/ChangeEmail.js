import React from 'react';
import { useState } from "react";
import "../index.css"
import Error from './Error';
import axios, { Axios } from "axios"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import BackButton from './BackButton';


const ChangeEmail = () => {
    const [Email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [OldEmail, setOldEmail] = useState("");

    const obj = {
        Email: Email,
        OldEmail: OldEmail
    }

    function handleClick(event) {
        event.preventDefault()
        console.log("hh")
        axios.post('http://localhost:3001/confirmEmail', obj, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + localStorage.getItem('Token')
            }
        }).then(res => {
            setMessage(res.data)

            if (res.data == "Email Updated") {
                console.log("sah kda")

                axios.put('http://localhost:3001/changeEmail', obj, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'bearer ' + localStorage.getItem('Token')
                    }


                }).then(res => {
                    setMessage(res.data.msg)


                }).catch(err => {
                    console.log(err);
                })
            }
        }).catch(err => {
            console.log(err);

        })

        // }

    }
    if (localStorage.getItem('Token') != null) {
        return (
            <div className="body">
                <div className="container" >
                    <div class="content">
                        <BackButton />
                        <form>
                            <div className="user-details">
                                <div className="input-box">
                                    <label>Please enter your old Email </label>
                                    <input
                                        type="text"
                                        name="newEmail"

                                        onChange={(e) => setOldEmail(e.target.value)}



                                    /></div>

                                <div className="input-box">
                                    <label>Please enter your new Email </label>
                                    <input
                                        type="text"
                                        name="newEmail"

                                        onChange={(e) => setEmail(e.target.value)}



                                    /></div>

                                <button className="XX" onClick={handleClick}>Update</button>
                            </div>
                            <h4>{message}</h4>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
    else {
        return <div> <Error> </Error> </div>
    }




}
export default ChangeEmail;