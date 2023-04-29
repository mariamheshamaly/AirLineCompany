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
const ChangePassword = () => {
    const [Password, setPassword] = useState(0);
    const [newPassword, setnewPassword] = useState(0);
    const [message, setMessage] = useState("");

    const obj = {
        Password: Password,
        newPassword: newPassword,

    }

    function handleClick(event) {
        event.preventDefault()
        console.log("hh")
        axios.post('http://localhost:3001/confirmPassword', obj, {
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'bearer ' + localStorage.getItem('Token')
            }
        }).then(res => {
            setMessage(res.data)

            if (res.data == "changing password..") {
                console.log("sah kda")
                axios.put('http://localhost:3001/changePassword', obj, {
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'bearer ' + localStorage.getItem('Token')
                    }


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
    if(localStorage.getItem('Token')!= null){
    return (
        <div className="body">
            <div className="container" >
                <div class="content">
                    <BackButton />
                    <form>
                        <div className="user-details">
                            <div className="input-box">
                                <label>Enter your old Password </label>
                                <input
                                    type="text"
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-box">
                                <label> Enter your new Password</label>
                                <input
                                    type="text"
                                    name="newpassword"
                                    onChange={(e) => setnewPassword(e.target.value)}
                                />
                            </div>
                            <button onClick={handleClick}>Update</button>
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
export default ChangePassword;