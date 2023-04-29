const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservedflightschema = new Schema({
    //UserID: {
       // type: Number,
       // required: true,
    //},
    FlightNumber: {
        type: Number,
        required: true,
    },
    DepartureTime: {
        type: String,
        required: false
    },
    ArrivalTime: {
        type: String,
        required: false,
    },
    ArrivalDate: {
        type: String,
        required: false,
    },
    DepartureDate: {
        type: String,
        required: false,
    },
    ArrivalTerminal: {
        type: String,
        required: false,
    },
    DepartureTerminal: {
        type: String,
        required: false,
    },
    EconomySeats: {
        type: Number,
        required: true,
    },
    BusinessClassSeats: {
        type: Number,
        required: true,
    },
    DepartureAirport: {
        type: String,
        required: false,
    },
    ArrivalAirport: {
        type: String,
        required: false,
    },
    Cabin: {
        type: String,
        required: false,
    },
    ChildrenSeats: {
        type: Number,
        required: false,
    },
    AdultSeats: {
        type: Number,
        required: false,
    },
    TripDuration: {
        type: Number,
        required: false,
    },
    Baggage: {
        type: Number,
        required: false,
    },
    SelectedEconomySeat: {
        type: String,
        required: false,
    },
    PrevEconomySeat: {
        type: String,
        required: false,
    },
    TotalPrice: {
        type: Number,
        required: false
    },
    SelectedBusinessSeat: {
        type: String,
        required: false,
    },
    PrevBusinessSeat: {
        type: String,
        required: false
    },
    UserEmail: {
        type: String,
        required: false,
    },
    bookingNumber: {
        type: Number,
        required: false

    }


}, { timestamps: true });


let reservedflights
try {
    reservedflights = mongoose.model('reservedflights')
} catch (error) {
    reservedflights = mongoose.model('reservedflights', reservedflightschema)
}
// const Flight = mongoose.model('flights', reservedflightschema);
module.exports = reservedflights;