import React from 'react';
import { useState } from "react";
//import "../index.css"
import axios, { Axios } from "axios"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
//import App from '../App'
import "./loginStyle.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


const Login = () => {
    const [UserName, setUserName] = useState("");
    const [Password, setPassword] = useState("");
    const [message, setMessage] = useState('')

    const object = {

        UserName: UserName,
        Password: Password,

    }
    function handleClick2(event) {
        event.preventDefault()
        localStorage.removeItem('Token')
        localStorage.removeItem('history')

        window.location.href = "/Guest"
    }
    function handleClick(event) {
        event.preventDefault()
        axios.post('http://localhost:3001/login', object).then(res => {
            setMessage(res.data.msg)
            // const isloggedin= res.data.isloggedin
            //const isAdmin = res.data.isAdmin
            localStorage.setItem("Token", res.data.token)


            if (res.data.isloggedin && !res.data.isAdmin) {

                window.location.href = "/App"

            }

            else {
                if (res.data.isloggedin && res.data.isAdmin) {
                    window.location.href = "/AdminHome"
                    localStorage.setItem('UserName', 'admin')

                }
            }
            localStorage.setItem("Token", res.data.token)




        })

    }

    return (
        <body className="body">
            <div className="center" >
                <h1>Login</h1>
                <form>
                    <div className="txt_field">
                        <input
                            type="text"
                            name="username"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <span></span>
                        <label>Username</label>
                    </div>
                    <div className="txt_field">
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span></span>
                        <label>Password</label>
                        <div></div>
                        <Link to="/ForgetPassword" className="pass">Forgot Password?</Link>
                        <button className="XX" onClick={handleClick}>Login</button>
                        <div class="signup_link">
                            Not a member? <a href="/Registration">Signup</a>
                            <div></div>
                            <Link to onClick={handleClick2}>Continue as a guest</Link>
                        </div>

                    </div>
                    {/* <button onClick={handleClick}>Login</button>  */}
                    {/* <Link to="/Registration"> 
             Don't Have an Account?
            </Link> */}

                </form>

                <h2>{message}</h2>

            </div>
        </body>

    )
}



export default Login;