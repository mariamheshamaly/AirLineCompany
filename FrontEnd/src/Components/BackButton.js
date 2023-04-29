import { useHistory } from "react-router-dom";
import "../index.css"
import React from 'react'
import "./BackbtnStyle.css"

export default function BackButton() {
    let history = useHistory();
    return (
        <div>
            <button className="back-btn" onClick={() => history.goBack()}>Back</button>
        </div>
    )
}