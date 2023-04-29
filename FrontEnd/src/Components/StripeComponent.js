import React from 'react';
import StripeCheckout from 'react-stripe-checkout'
import axios from 'axios'
import Error from './Error';
function StripeComponent({ SelectedFlight, PrevFlights }) {


    const makePayment = (token) => {
        const body = {
            token,
            SelectedFlight,
            PrevFlights
        }

        console.log(body)

        axios.post('http://localhost:3001/payment', body);
    }
    if(localStorage.getItem('Token')!= null){
    return (
        <div>
            <StripeCheckout
                stripeKey={"pk_test_51K8pKeAHoHtEwtN5PmpH89COOO1E8kd0TT27PiU2NovDU5RPHP20Q2EXUjzstNx6yhBMwir9egTX1tCwO3D3ebvD00QujcIxos"}
                token={makePayment}
                name="Book Flight"
                amount={(SelectedFlight.TotalPrice + PrevFlights.TotalPrice) * 100}
            ></StripeCheckout>

        </div>
    );
    }
    else{
        return <div> <Error> </Error> </div>
    }
}

export default StripeComponent;