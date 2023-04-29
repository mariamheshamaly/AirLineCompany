import React from 'react';
import { useState } from "react";
import "../index.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function Home() {
    return (
        <div>
            <h1>To Travel is to Live</h1>
            <img src="img.png" width="700" height="400" ></img>
            <img src="image.png" className="image" ></img>
            
        </div>
   
    )    
    };
export default Home;