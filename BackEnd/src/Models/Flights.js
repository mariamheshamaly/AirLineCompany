const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flightSchema = new Schema({
    FlightNumber: {
        type: Number,
        required: true,
        unique: true
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
    BusinessClassSeatPrice: {
        type: Number,
        required: false
    },
    EconomySeatPrice: {
        type: Number,
        required: false
    },

    AvailableEconomySeats: {
        type: [String],
        required: false
    },
    AvailableBusinessSeats: {
        type: [String],
        required: false
    }

}, { timestamps: true });


let Flight
try {
    Flight = mongoose.model('flights')
} catch (error) {
    Flight = mongoose.model('flights', flightSchema)
}
// const Flight = mongoose.model('flights', flightSchema);
module.exports = Flight;