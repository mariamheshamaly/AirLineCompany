const express = require('express');
const router = express.Router();
const Flight = require("../Models/Flights");
const reservedflights = require("../Models/reservedflights")
const nodemailer = require('nodemailer');
const User = require("../Models/User");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const obj = {};
const obj2 = {};

router.route('/deleteReservation').post((req, res, next) => {
    var a = req.body.FlightNumber;
    var b = req.body.ArrivalTime;
    var c = req.body.DepartureDate;
    var d = req.body.ArrivalTerminal;
    var e = req.body.DepartureTerminal;
    var f = req.body.EconomySeats;
    var g = req.body.BusinessClassSeats;
    var h = req.body.TotalPrice;
    var mail = JSON.stringify(req.body.UserEmail);

    var transporter = nodemailer.createTransport(
        {
            service: "hotmail",
            auth: {
                user: "mariam.x.salem@outlook.com",
                pass: "miro12345"
            }
        })
    const sender = {
        from: "mariam.x.salem@outlook.com",
        to: mail,
        subject: "sending email from node js",
        text: "You have canceled your flight reservation with the following details (Flight Number :" + a +
            "  Arrival Time : " + b + "  Departure Date: " + c + "  Arrival Terminal : " + d + "  Departure Terminal: " + e
            + " Economy Seats: " + f + "  Business Class Seats: " + g + "  The refund amount will be " + h
    }
    transporter.sendMail(sender, function (err, info) {
        if (err) {
            console.log(err);
            return;
        }
        //console.log("ANA BA3AAAAT" + info.response);

    })
    const ID = req.body.FlightNumber;
    reservedflights.deleteOne({ FlightNumber: ID }, (error, result) => {
        console.log("res: " + result)
        if (result.deletedCount == 1) {
            res.send("Flight deleted successfully")
        }
        else {
            res.send("No such flight")
        }
    })
})


router.route('/deleteSelected').post((req, res, next) => {

    console.log('i hitted this endpoint');
    const ID = req.body.FlightNumber;
    console.log(ID)
    reservedflights.deleteOne({ FlightNumber: ID }, (error, result) => {
        console.log("res: " + result)
        if (result.deletedCount == 1) {
            res.send("Flight deleted successfully")
        }
        else {
            res.send("No such flight")
        }
    })
})


router.route("/createFlight").post((req, res) => {
    console.log(req + "sds")
    const FlightNumber = req.body.flightN;
    const DepartureTime = req.body.DepartureTime;
    const ArrivalTime = req.body.arrivalT;
    const ArrivalDate = req.body.ArrivalDate;
    const DepartureDate = req.body.DepartureDate;
    const ArrivalTerminal = req.body.ArrivalTerminal;
    const DepartureTerminal = req.body.DepartureTerminal;
    const EconomySeats = req.body.economy;
    const BusinessClassSeats = req.body.business;
    const ArrivalAirport = req.body.ArrivalAirport;
    const DepartureAirport = req.body.DepartureAirport;
    const ChildrenSeats = req.body.ChildrenSeats;
    const AdultSeats = req.body.AdultSeats;
    const Cabin = req.body.Cabin;
    const Baggage = req.body.Baggage;
    const TripDuration = req.body.TripDuration;
    const BusinessClassSeatPrice = req.body.BusinessClassSeatPrice;
    const EconomySeatPrice = req.body.EconomySeatPrice
    const AvailableEconomySeats = []
    const AvailableBusinessSeats = []
    for (let i = 0; i < EconomySeats; i++) {
        AvailableEconomySeats.push("A" + i);

    }
    for (let i = 0; i < BusinessClassSeats; i++) {
        AvailableBusinessSeats.push("A" + i);

    }
    if (FlightNumber == "" || ArrivalTime == "" || ArrivalDate == "" || DepartureDate == ""
        || ArrivalTerminal == "" || DepartureTerminal == "" || EconomySeats == ""
        || BusinessClassSeats == "" || ArrivalAirport == "" || DepartureTime == "") {
        res.send("cannot be created")
    } else {
        const newFlight = new Flight({
            FlightNumber,
            DepartureTime,
            ArrivalTime,
            ArrivalDate,
            DepartureDate,
            ArrivalTerminal,
            DepartureTerminal,
            EconomySeats,
            BusinessClassSeats,
            ArrivalAirport,
            DepartureAirport,
            ChildrenSeats,
            AdultSeats,
            Cabin,
            Baggage,
            TripDuration,
            BusinessClassSeatPrice,
            EconomySeatPrice,
            AvailableEconomySeats,
            AvailableBusinessSeats
        })
        Flight.find({ FlightNumber: FlightNumber }, (req, result) => {
            if (result.length == 0) {
                newFlight.save();
                res.send("Flight Created Succeucfully")
            } else {
                res.send("Cannot be created")
            }
        })
    }






})

router.route('/delete').post((req, res, next) => {
    const ID = req.body.flightN;
    if (ID === 0) {
        res.send('no such flight!')
    }
    console.log("id:" + ID);
    Flight.deleteOne({ FlightNumber: ID }, (error, doc) => {
        if (error) {
            console.log(error);
            // res.redirect('/');
            return;
        }
    })



    reservedflights.find({ FlightNumber: ID }, (req, result) => {

        for (let i = 0; i < result.length; i++) {
            console.log(result[i])
            reservedflights.deleteOne({ FlightNumber: ID }, (error, doc) => {
                if (error) {
                    console.log(error);
                    return;
                }
            })
        }
    })


})

module.exports = router;