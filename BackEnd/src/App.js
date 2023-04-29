// External variables
const express = require('express');
console.log('akheran');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const MongoURI = 'mongodb+srv://moeashraf:AAsdfg10@cluster0.b86liak.mongodb.net/?retryWrites=true&w=majority';

const router = express.Router();
require('dotenv').config();
//app.use(express.json());
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
app.use(express.json());
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(
  'sk_test_51K8pKeAHoHtEwtN543KDMLYmWqGvWFHQIlpTJKuuoq74xsRGb8K0ND1KkoICtgAODROeWZayMhWDqgRPqTGU7b4C00kJjZnbuv'
);

const port = process.env.PORT || '3001';
const User = require('./models/User');
const Flights = require('./Models/Flights');
const Reservation = require('./Models/reservedflights');
const Admin = require('./models/Adminstrator');
app.use(express.json());
const updateObj2 = {};
let globalEmail = {};
const obj2 = {};
const array = [];
let user2;
// #Importing the userController
app.use(cors());
const obj = {};
const obj3 = {};
const EditedObj = {};

const Oppositeobj = {};
const updateObj = {};
const createdobj = {};
const reserveobj = {};
app.use('/', require('./Routes/flightsRoute'));
// app.use("/", require("./Routes/searchFlightRoute"))
// configurations
// Mongo DB
mongoose
  .connect(MongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log('MongoDB is now connected'))
  .catch((err) => console.log('Error connecting to MongoDB database: ', err));

/*
                                                    Start of your code
*/
app.get('/Home', (req, res) => {
  res.status(200).send('You have everything installed !');
});

app.get('/api', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

app.post('/UserSearchFlight', (req, res) => {
  var arrivalTime = req.body.ArrivalTime;
  var departuretime = req.body.DepartureTime;
  var departuredate = req.body.DepartureDate;
  var arrivaldate = req.body.ArrivalDate;
  var arrivalterminal = req.body.ArrivalTerminal;
  var departureterminal = req.body.DepartureTerminal;
  var departureairport = req.body.DepartureAirport;
  var arrivalairport = req.body.ArrivalAirport;
  var childrenseats = req.body.ChildrenSeats;
  var adultseats = req.body.AdultSeats;
  var tripduration = req.body.TripDuration;
  var cabin = req.body.Cabin;
  var baggage = req.body.Baggage;

  if (arrivalTime != '') {
    obj2['ArrivalTime'] = arrivalTime;
  }
  if (departuretime != '') {
    obj2['DepartureTime'] = departuretime;
  }
  if (departuredate != '') {
    obj2['DepartureDate'] = departuredate;
  }
  if (arrivaldate != '') {
    obj2['ArrivalDate'] = arrivaldate;
  }
  if (departureterminal != '') {
    obj2['DepartureTerminal'] = departureterminal;
  }

  if (arrivalterminal != '') {
    obj2['ArrivalTerminal'] = arrivalterminal;
  }
  if (departureairport != '') {
    obj2['DepartureAirport'] = departureairport;
  }
  if (arrivalairport != '') {
    obj2['ArrivalAirport'] = arrivalairport;
  }
  if (tripduration != '') {
    obj2['TripDuration'] = tripduration;
  }
  if (cabin != 0) {
    obj2['Cabin'] = cabin;
  }

  Flights.find(obj2, (err, result) => {
    if (err) {
      console.log(err);
      console.log('Error in find method');
    } else {
      console.log('alyyyyyy');
      console.log(result);
      for (i = 0; i < result.length; i++) {
        console.log('vvvvvvvvvvvvvvvvvvv');
        console.log(result[i]);
        console.log('asharaaaaaaaaaf');
        console.log(result[0].ChildrenSeats);
        console.log(req.body.ChildrenSeats);
        if (
          result[i].ChildrenSeats >= req.body.ChildrenSeats &&
          result[i].AdultSeats >= req.body.AdultSeats &&
          result[i].Baggage >= req.body.Baggage
        ) {
          array.push(result[i]);
        }
      }

      res.send(array);
    }
  });
});

app.post('/payment', (req, res) => {
  const { SelectedFlight, PrevFlights, token } = req.body;
  console.log(SelectedFlight);
  console.log(PrevFlights);
  console.log(token);

  var SelectedFlightNumber = SelectedFlight.FlightNumber;
  var SelectedArrivalTime = SelectedFlight.ArrivalTime;
  var SelectedDepartureDate = SelectedFlight.DepartureDate;
  var SelectedArrivalTerminal = SelectedFlight.ArrivalTerminal;
  var SelectedDepartureTerminal = SelectedFlight.DepartureTerminal;
  var SelectedEconomySeats = SelectedFlight.EconomySeats;
  var SelectedBusinessClassSeats = SelectedFlight.BusinessClassSeats;

  var PrevFlightNumber = PrevFlights.FlightNumber;
  var PrevArrivalTime = PrevFlights.ArrivalTime;
  var PrevDepartureDate = PrevFlights.DepartureDate;
  var PrevArrivalTerminal = PrevFlights.ArrivalTerminal;
  var PrevDepartureTerminal = PrevFlights.DepartureTerminal;
  var PrevEconomySeats = PrevFlights.EconomySeats;
  var PrevBusinessClassSeats = PrevFlights.BusinessClassSeats;

  var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'mariam.x.salem@outlook.com',
      pass: 'miro12345',
    },
  });
  // console.log("Product", product);
  // console.log("Product", product.price);
  const idempotencyKey = uuidv4();

  stripe.customers
    .create({
      email: obj3.UserName,
    })
    .then((customer) => {
      // have access to the customer object
      stripe.charges
        .create(
          {
            customer: customer.id, // set the customer id
            amount: (SelectedFlight.TotalPrice + PrevFlights.TotalPrice) * 100, // 25
            currency: 'usd',
            description: 'Booking Flights',
          },
          { idempotencyKey }
        )

        .then((result) => {
          console.log(result);
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  var mail = obj3.UserName;
  const sender = {
    from: 'mariam.x.salem@outlook.com',
    to: mail,
    subject: 'sending email from node js',
    text:
      'You have Succefully made a reservation with the following details For the Departure Flight ( Flight Number :' +
      SelectedFlightNumber +
      '  Arrival Time : ' +
      SelectedArrivalTime +
      '  Departure Date: ' +
      SelectedDepartureDate +
      '  Arrival Terminal : ' +
      SelectedArrivalTerminal +
      '  Departure Terminal: ' +
      SelectedDepartureTerminal +
      ' Economy Seats: ' +
      SelectedEconomySeats +
      '  Business Class Seats: ' +
      SelectedBusinessClassSeats +
      '  This Flight Price is ' +
      SelectedFlight.TotalPrice +
      ' You have Succefully made a reservation with the following details For the Arrival Flight ( Flight Number :' +
      PrevFlightNumber +
      '  Arrival Time : ' +
      PrevArrivalTime +
      '  Departure Date: ' +
      PrevDepartureDate +
      '  Arrival Terminal : ' +
      PrevArrivalTerminal +
      '  Departure Terminal: ' +
      PrevDepartureTerminal +
      ' Economy Seats: ' +
      PrevEconomySeats +
      '  Business Class Seats: ' +
      PrevBusinessClassSeats +
      '  This Flight Price is ' +
      PrevFlights.TotalPrice,
  };

  transporter.sendMail(sender, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    //console.log('ANA BA3AAAAT' + info.response);
  });
});

app.post('/paymentChange', (req, res) => {
  const { SelectedFlight, amountToPay, token } = req.body;
  console.log(SelectedFlight);
  console.log(token);
  console.log(amountToPay);
  var SelectedFlightNumber = SelectedFlight.FlightNumber;
  var SelectedArrivalTime = SelectedFlight.ArrivalTime;
  var SelectedDepartureDate = SelectedFlight.DepartureDate;
  var SelectedArrivalTerminal = SelectedFlight.ArrivalTerminal;
  var SelectedDepartureTerminal = SelectedFlight.DepartureTerminal;
  var SelectedEconomySeats = SelectedFlight.EconomySeats;
  var SelectedBusinessClassSeats = SelectedFlight.BusinessClassSeats;

  var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'mariam.x.salem@outlook.com',
      pass: 'miro12345',
    },
  });
  // console.log("Product", product);
  // console.log("Product", product.price);
  const idempotencyKey = uuidv4();

  stripe.customers
    .create({
      email: 'mahacker16@gmail.com',
    })
    .then((customer) => {
      // have access to the customer object
      stripe.charges
        .create(
          {
            customer: customer.id, // set the customer id
            amount: amountToPay * 100, // 25
            currency: 'usd',
            description: 'Booking Flights',
            receipt_email: 'mashrafelsaeed@gmail.com',
          },
          { idempotencyKey }
        )

        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          console.log('hello');
        });
    });
  var mail = obj3.UserName;
  const sender = {
    from: 'mariam.x.salem@outlook.com',
    to: mail,
    subject: 'sending email from node js',
    text:
      'You have Succefully made a reservation with the following details For the Departure Flight ( Flight Number :' +
      SelectedFlightNumber +
      '  Arrival Time : ' +
      SelectedArrivalTime +
      '  Departure Date: ' +
      SelectedDepartureDate +
      '  Arrival Terminal : ' +
      SelectedArrivalTerminal +
      '  Departure Terminal: ' +
      SelectedDepartureTerminal +
      ' Economy Seats: ' +
      SelectedEconomySeats +
      '  Business Class Seats: ' +
      SelectedBusinessClassSeats +
      '  This Flight Price is ' +
      SelectedFlight.TotalPrice,
  };

  transporter.sendMail(sender, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log('ANA BA3AAAAT' + info.response);
  });
});

app.post('/searchNewFlight', (req, res) => {
  const NewCabin = req.body.NewCabin;
  const NewDate = req.body.NewDate;
  const DepartureTerminal = req.body.DepartureTerminal;
  const chosenFlight = {};

  if (NewCabin != '') {
    chosenFlight['Cabin'] = NewCabin;
  }
  if (NewDate != '') {
    chosenFlight['DepartureDate'] = NewDate;
  }

  if (DepartureTerminal != '') {
    chosenFlight['DepartureTerminal'] = DepartureTerminal;
  }
  Flights.find(chosenFlight, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log('result:   ' + result);
    }
  });
});

app.post('/searchflight', (req, res) => {
  //db.payments.find({ $where: function() { var value =  isString(this._id) && hex_md5(this._id) == '57fee1331906c3a8f0fa583d37ebbea9'; return value; }}).pretty()
  var Cabin = req.body.Cabin;
  var adults = req.body.adults;
  console.log('adults: ' + adults);
  var children = req.body.children;
  var arrivalTime = req.body.ArrivalTime;
  var departuretime = req.body.DepartureTime;
  var departuredate = req.body.DepartureDate;
  var arrivaldate = req.body.ArrivalDate;
  var arrivalterminal = req.body.ArrivalTerminal;
  var departureterminal = req.body.DepartureTerminal;

  if (Cabin != '') {
    obj['Cabin'] = Cabin;
  }
  if (adults != 0) {
    obj['AdultSeats'] = adults;
  }
  if (children != 0) {
    obj['ChildrenSeats'] = children;
  }
  if (arrivalTime != '') {
    obj['ArrivalTime'] = arrivalTime;
  }
  if (departuretime != '') {
    obj['DepartureTime'] = departuretime;
  }
  if (departuredate != '') {
    obj['DepartureDate'] = departuredate;
  }
  if (arrivaldate != '') {
    obj['ArrivalDate'] = arrivaldate;
  }
  if (departureterminal != '') {
    obj['DepartureTerminal'] = departureterminal;
  }

  if (arrivalterminal != '') {
    obj['ArrivalTerminal'] = arrivalterminal;
  }

  Flights.find(obj, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log('sjisdqj' + result);
    }
  });
});
app.get('/getResults', (req, res) => {
  //res.status(200).send(User.find({ Job: 'Avenger' }))
  Flights.find(obj, (req, result) => {
    res.send(result);
  });
});

app.post('/registration', async (req, res) => {
  const Password = req.body.Password;
  const FirstName = req.body.FirstName;
  const LastName = req.body.LastName;
  const Email = req.body.Email;
  const PhoneNumber = req.body.PhoneNumber;
  const PassportNumber = req.body.PassportNumber;
  const CountryCode = req.body.CountryCode;
  const HomeAddress = req.body.HomeAddress;
  const UserName = req.body.UserName;
  const UserID = req.body.UserID;

  if (
    FirstName == '' ||
    LastName == '' ||
    Email == '' ||
    Password == '' ||
    PhoneNumber == '' ||
    PassportNumber == '' ||
    CountryCode == '' ||
    HomeAddress == '' ||
    UserName == ''
  ) {
    console.log('i am failing');
    res.send({ msg: 'Sign up Failed', Email: Email });
  } else {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    //Password = hashedPassword;

    console.log(hashedPassword + ' aho el password');

    var newUser = new User({
      FirstName,
      UserID,
      LastName,
      Email,
      Password: hashedPassword,
      PhoneNumber,
      PassportNumber,
      CountryCode,
      HomeAddress,
      UserName,
    });
    User.find({ UserName: UserName }, (req, result) => {
      if (result.length != 0) {
        res.send({ msg: 'Username Already Taken', Email: Email });
      } else {
        User.find({ Email: Email }, (req, result) => {
          if (result.length != 0) {
            res.send({ msg: 'Email Already Taken', Email: Email });
          } else {
            newUser.save();
            res.send({ msg: 'Account Created Successfully', Email: Email });
          }
        });
      }
    });

    // });
  }
});
app.put('/EditDepartureFlight', (req, res) => {
  const ChosenSeats = req.body.ChosenSeats;
  const FlightNumber = req.body.FlightNumber;

  EditedObj['FlightNumber'] = FlightNumber;
  if (ChosenSeats != '') {
    EditedObj['PrevBusinessSeat'] = ChosenSeats;
  }
  Reservation.updateOne({ FlightNumber: FlightNumber }, EditedObj)
    .clone()
    .then((result) => {
      if (result.modifiedCount == 1) {
        res.send('Flight edited');
      } else {
        res.send('cant edit flight');
      }
    });
});
app.put('/EditReturnFlight', (req, res) => {
  const ChosenSeats = req.body.ChosenSeats;
  const FlightNumber = req.body.FlightNumber;

  EditedObj['FlightNumber'] = FlightNumber;
  if (ChosenSeats != '') {
    EditedObj.PrevEconomySeat = ChosenSeats;
  }
  Reservation.updateOne({ FlightNumber: FlightNumber }, EditedObj)
    .clone()
    .then((result) => {
      if (result.modifiedCount == 1) {
        res.send('Flight edited');
      } else {
        res.send('cant edit flight');
      }
    });
});

app.post('/login', async (req, res) => {
  console.log('shatra fskh');
  const UserName = req.body.UserName;
  const Password1 = req.body.Password;
  //const Password=hash

  if (UserName == '' && Password1 == '') {
    res.send({ msg: 'Please enter all the required entries', isloggedin: false, isAdmin: false, UserName: UserName });
  } else {
    obj3['UserName'] = UserName;
  }

  User.find(obj3, (err, result) => {
    if (err) {
      console.log(err);
      console.log('Error in find method');
    }
    if (result.length == 0) {
      res.send({ msg: 'incorrect username or password', isloggedin: false, isAdmin: false, UserName: UserName });
    } else {
      bcrypt.compare(Password1, result[0].Password).then((result2) => {
        if (result2 == false) {
          res.send({ msg: 'incorrect password', isloggedin: false, isAdmin: false, UserName: UserName });
        } else {
          if (UserName != 'admin') {
            const user = { username: UserName };
            console.log(user.username + ' hhhhhhhh');
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            console.log(accessToken);
            res.send({ msg: 'correct ', token: accessToken, isloggedin: true, isAdmin: false, UserName: UserName });
          } else {
            const user = { username: UserName };
            console.log(user.username + ' hhhhhhhh');
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
            //console.log(accessToken)
            res.send({
              msg: 'Admin verified',
              token: accessToken,
              isloggedin: true,
              isAdmin: true,
              UserName: UserName,
            });
          }
        }
      });
    }
  });
});

app.get('/getResults3', (req, res) => {
  User.find(obj3, (req, result) => {
    res.send(result);
  });
});

app.post('/getOpposite', (req, res) => {
  arrivalTerminal = req.body.ArrivalTerminal;
  departureTerminal = req.body.DepartureTerminal;
  Oppositeobj['ArrivalTerminal'] = arrivalTerminal;
  Oppositeobj['DepartureTerminal'] = departureTerminal;
  console.log('Opposite Object');
  console.log(Oppositeobj);
});

app.get('/sendOpposite', (req, res) => {
  console.log('oppositeobj in the sendopposite');
  console.log(Oppositeobj);
  Flights.find(Oppositeobj, (req, result) => {
    console.log('this is the result');
    console.log(result);
    res.send(result);
  });
});

app.get('/getResults2', (req, res) => {
  Flights.find(obj2, (req, result) => {
    res.send(array);
  });
});

app.put('/update', (req, res) => {
  console.log(req);
  const flightN = req.body.flightN;
  const newFlightNumber = req.body.newFlight;
  const arrivalT = req.body.arrivalT;
  const DepartureTime = req.body.DepartureTime;
  const DepartureDate = req.body.DepartureDate;
  const ArrivalDate = req.body.ArrivalDate;
  const economy = req.body.economy;
  const business = req.body.business;
  const Airport = req.body.Airport;
  const ArrivalTerminal = req.body.ArrivalTerminal;
  const DepartureTerminal = req.body.DepartureTerminal;

  if (newFlightNumber != '') {
    updateObj['FlightNumber'] = newFlightNumber;
  }
  if (arrivalT != '') {
    updateObj['ArrivalTime'] = arrivalT;
  }
  if (DepartureTime != '') {
    updateObj['DepartureTime'] = DepartureTime;
  }
  if (DepartureDate != '') {
    updateObj['DepartureDate'] = DepartureDate;
  }
  if (ArrivalDate != '') {
    updateObj['ArrivalDate'] = ArrivalDate;
  }
  if (DepartureTerminal != '') {
    updateObj['DepartureTerminal'] = DepartureTerminal;
  }

  if (ArrivalTerminal != '') {
    updateObj['ArrivalTerminal'] = ArrivalTerminal;
  }

  if (economy != '') {
    updateObj['ArrivalTerminal'] = economy;
  }
  if (business != '') {
    updateObj['ArrivalTerminal'] = business;
  }
  if (Airport != '') {
    updateObj['ArrivalTerminal'] = Airport;
  }
  Flights.updateOne({ FlightNumber: flightN }, updateObj)
    .clone()
    .then((result) => {
      console.log(result);
      if (result.modifiedCount == 1) {
        res.send('Flight Updated');
      } else {
        res.send('flight does not exist');
      }
    })
    .catch((err) => {
      console.error(`Failed to add review`);
      res.send('flight does not exists');
    });
});

app.get('/viewFlights', (req, res) => {
  //res.status(200).send(User.find({ Job: 'Avenger' }))
  Flights.find({}, (req, values) => {
    res.json({ message: values });
  });
});

app.get('/getAdmin', (req, res) => {
  //res.status(200).send(User.find({ Job: 'Avenger' }))
  Admin.find({ Name: 'Mohamed Ashraf' }, (req, values) => {
    res.json({ message: values });
  });
});

app.post('/reserve', (req, res) => {
  console.log(req + 'sds');
  const FlightNumber = req.body.FlightNumber;
  const DepartureTime = req.body.DepartureTime;
  const ArrivalTime = req.body.ArrivalTime;
  const ArrivalDate = req.body.ArrivalDate;
  const DepartureDate = req.body.DepartureDate;
  const ArrivalTerminal = req.body.ArrivalTerminal;
  const DepartureTerminal = req.body.DepartureTerminal;
  const EconomySeats = req.body.EconomySeats;
  const BusinessClassSeats = req.body.BusinessClassSeats;
  const SelectedEconomySeat = req.body.SelectedEconomySeat;
  const PrevEconomySeat = req.body.PrevEconomySeat;
  const SelectedBusinessSeat = req.body.SelectedBusinessSeat;
  const PrevBusinessSeat = req.body.PrevBusinessSeat;
  const Airport = req.body.Airport;
  const TotalPrice = req.body.TotalPrice;
  const bookingNumber = req.body.bookingNumber;
  //const UserID = 992
  const UserEmail = obj3.UserName;

  const newReservation = new Reservation({
    //UserID,
    UserEmail,
    FlightNumber,
    DepartureTime,
    ArrivalTime,
    ArrivalDate,
    DepartureDate,
    ArrivalTerminal,
    DepartureTerminal,
    EconomySeats,
    BusinessClassSeats,
    Airport,
    SelectedEconomySeat,
    PrevEconomySeat,
    TotalPrice,
    SelectedBusinessSeat,
    PrevBusinessSeat,
    bookingNumber,
  });

  newReservation.save();
});

app.put('/reserveupdate', (req, res) => {
  const FlightNumber = req.body.FlightNumber;
  let BusinessClassSeats = req.body.BusinessClassSeats;
  const SelectedEconomySeat = req.body.SelectedEconomySeat;
  const PrevEconomySeat = req.body.PrevEconomySeat;
  const SelectedBusinessSeat = req.body.SelectedBusinessSeat;
  let PrevBusinessSeat = req.body.PrevBusinessSeat;
  let EconomySeats = req.body.EconomySeats;
  let AvailableBusinessSeats = req.body.AvailableBusinessSeats;
  let AvailableEconomySeats = req.body.AvailableEconomySeats;
  res.send('updated');
  if (typeof SelectedBusinessSeat != 'undefined') {
    console.log('HOLAAAAAA');
    console.log(req.body.SelectedBusinessSeat);

    if (SelectedBusinessSeat.split(',').length > 1) {
      //Not Handeled Yet
      const newArr = SelectedBusinessSeat.split(',');
      for (let i = 0; i < newArr.length; i++) {
        const index = AvailableBusinessSeats.indexOf(newArr[i]);
        const BusinessSeats = BusinessClassSeats - 1;
        BusinessClassSeats = BusinessSeats;
        const returnedArr = AvailableBusinessSeats.filter((e) => e !== AvailableBusinessSeats[index]);
        AvailableBusinessSeats = returnedArr;
        reserveobj['AvailableBusinessSeats'] = returnedArr;
        reserveobj['BusinessClassSeats'] = BusinessSeats;
        console.log('away obj ' + i);
        console.log(reserveobj);
        Flights.updateOne({ FlightNumber: FlightNumber }, reserveobj, (error, doc) => {
          if (error) {
            console.log(error);
            // res.redirect(‘/’);
            return;
          }
        });
      }
    } else {
      //Handled
      const index = AvailableBusinessSeats.indexOf(req.body.SelectedBusinessSeat);
      console.log(index);
      const BusinessSeats = BusinessClassSeats - 1;
      const newArr = AvailableBusinessSeats.filter((e) => e !== AvailableBusinessSeats[index]);
      reserveobj['AvailableBusinessSeats'] = newArr;
      reserveobj['BusinessClassSeats'] = BusinessSeats;
      Flights.updateOne({ FlightNumber: FlightNumber }, reserveobj, (error, doc) => {
        if (error) {
          console.log(error);
          // res.redirect(‘/’);
          return;
        }
      });
    }
  } else if (typeof PrevBusinessSeat != 'undefined') {
    //Not Handeled Yet
    if (PrevBusinessSeat.split(',').length > 1) {
      //Not Handeled Yet
      const newArr = PrevBusinessSeat.split(',');
      for (let i = 0; i < newArr.length; i++) {
        const index = AvailableBusinessSeats.indexOf(newArr[i]);
        const BusinessSeats = BusinessClassSeats - 1;
        BusinessClassSeats = BusinessSeats;
        const returnedArr = AvailableBusinessSeats.filter((e) => e !== AvailableBusinessSeats[index]);
        AvailableBusinessSeats = returnedArr;
        reserveobj['AvailableBusinessSeats'] = returnedArr;
        reserveobj['BusinessClassSeats'] = BusinessSeats;
        console.log('Home obj ' + i);
        console.log(reserveobj);
        Flights.updateOne({ FlightNumber: FlightNumber }, reserveobj, (error, doc) => {
          if (error) {
            console.log(error);
            // res.redirect(‘/’);
            return;
          }
        });
      }
    } else {
      //handled
      const index = AvailableBusinessSeats.indexOf(req.body.PrevBusinessSeat);
      console.log(index);
      const BusinessSeats = BusinessClassSeats - 1;
      const newArr = AvailableBusinessSeats.filter((e) => e !== AvailableBusinessSeats[index]);
      reserveobj['AvailableBusinessSeats'] = newArr;
      reserveobj['BusinessClassSeats'] = BusinessSeats;
      Flights.updateOne({ FlightNumber: FlightNumber }, reserveobj, (error, doc) => {
        if (error) {
          console.log(error);
          // res.redirect(‘/’);
          return;
        }
      });
    }
  } else if (typeof SelectedEconomySeat != 'undefined') {
    if (SelectedEconomySeat.split(',').length > 1) {
      //Not Handled
      console.log('HOLAAAAAA');
      console.log(req.body.SelectedBusinessSeat);

      if (SelectedEconomySeat.split(',').length > 1) {
        //Not Handeled Yet
        const newArr = SelectedEconomySeat.split(',');
        for (let i = 0; i < newArr.length; i++) {
          const index = AvailableEconomySeats.indexOf(newArr[i]);
          const EconomySeatsNew = EconomySeats - 1;
          EconomySeats = EconomySeatsNew;
          const returnedArr = AvailableEconomySeats.filter((e) => e !== AvailableEconomySeats[index]);
          AvailableEconomySeats = returnedArr;
          reserveobj['AvailableEconomySeats'] = returnedArr;
          reserveobj['EconomySeats'] = EconomySeatsNew;
          console.log('away obj ' + i);
          console.log(reserveobj);
          Flights.updateOne({ FlightNumber: FlightNumber }, reserveobj, (error, doc) => {
            if (error) {
              console.log(error);
              // res.redirect(‘/’);
              return;
            }
          });
        }
      }
      console.log('i should not be here');
    } else {
      //Handled
      const index = AvailableEconomySeats.indexOf(req.body.SelectedEconomySeat);
      const EconomySeatsNew = EconomySeats - 1;
      const newArr = AvailableEconomySeats.filter((e) => e !== AvailableEconomySeats[index]);
      reserveobj['AvailableEconomySeats'] = newArr;
      reserveobj['EconomySeats'] = EconomySeatsNew;
      Flights.updateOne({ FlightNumber: FlightNumber }, reserveobj, (error, doc) => {
        if (error) {
          console.log(error);
          // res.redirect(‘/’);
          return;
        }
      });
    }
  } else if (typeof PrevEconomySeat != 'undefined') {
    if (PrevEconomySeat.split(',').length > 1) {
      // Not Handled
      const newArr = PrevEconomySeat.split(',');
      for (let i = 0; i < newArr.length; i++) {
        const index = AvailableEconomySeats.indexOf(newArr[i]);
        const EconomySeatsNew = EconomySeats - 1;
        EconomySeats = EconomySeatsNew;
        const returnedArr = AvailableEconomySeats.filter((e) => e !== AvailableEconomySeats[index]);
        AvailableEconomySeats = returnedArr;
        reserveobj['AvailableEconomySeats'] = returnedArr;
        reserveobj['EconomySeats'] = EconomySeatsNew;
        console.log('Home obj ' + i);
        console.log(reserveobj);
        Flights.updateOne({ FlightNumber: FlightNumber }, reserveobj, (error, doc) => {
          if (error) {
            console.log(error);
            // res.redirect(‘/’);
            return;
          }
        });
      }
      console.log('i Should not be here');
    } else {
      //handled
      const index = AvailableEconomySeats.indexOf(req.body.PrevEconomySeat);
      const EconomySeatsNew = EconomySeats - 1;
      const newArr = AvailableEconomySeats.filter((e) => e !== AvailableEconomySeats[index]);
      reserveobj['AvailableEconomySeats'] = newArr;
      reserveobj['EconomySeats'] = EconomySeatsNew;
      Flights.updateOne({ FlightNumber: FlightNumber }, reserveobj, (error, doc) => {
        if (error) {
          console.log(error);
          // res.redirect(‘/’);
          return;
        }
      });
    }
  }
});

app.post('/confirmEmail', authenticate, async (req, res) => {
  const Email = req.body.Email;

  console.log(Email + 'new email');

  if (Email == '') {
    res.send('Please Fill Out The Blank!');
  } else {
    console.log(Email + 'heeeeh');

    User.find({ Email: Email }, (req, result) => {
      if (result.length != 0 && result[0].UserName != user2.username) {
        res.send('Email Already Taken');
      } else if (result.length != 0 && result[0].UserName == user2.username) {
        res.send('You Cannot Add Your Old Email');
      } else {
        console.log(result[0] + 'offf');
        res.send('Email Updated');
      }
    });
  }
});
app.put('/changeEmail', authenticate, (req, res) => {
  const Email = req.body.Email;
  const OldEmail = req.body.OldEmail;
  console.log(OldEmail + ' offfffffffffff');
  const newobjj = {};
  newobjj['Email'] = Email;

  const newobjjj = {};
  newobjjj['UserEmail'] = Email;
  const username = user2.username;
  User.updateOne({ Email: OldEmail }, newobjj)
    .clone()
    .then((result) => {
      if (result.modifiedCount == 1) {
        console.log(' faridaa');
        Reservation.find({ UserEmail: OldEmail }, (req, result) => {
          for (let i = 0; i < result.length; i++) {
            console.log(result[i]);
            Reservation.updateOne({ UserEmail: OldEmail }, newobjjj, (error, doc) => {
              if (error) {
                console.log(error);
                return;
              }
            });
          }
        });
      } else {
        res.send({ msg: 'kda fe error', check: 'false' });
      }
    })
    .catch((err) => {
      console.error(`Failed to add review`);
      //res.send("User does not exist")
    });
});

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    console.log(user);
    //user2=req.user.UserName
    req.user = user;
    user2 = user;
    next();
  });
}

app.post('/ForgetPassword', (req, res) => {
  const Email = req.body.Email;
  var mail = JSON.stringify(req.body.Email);
  console.log(mail + 'ahe om el');
  newPassword = (Math.random() % 500) + 2;
  console.log(newPassword + 'fl sheda');

  if (Email == '') {
    res.send({ msg: 'You Should enter your Email' });
  } else {
    User.find({ Email: Email }, (req, result) => {
      if (result.length == 0) {
        res.send({ msg: 'invalid Email Address' });
      } else {
        var transporter = nodemailer.createTransport({
          service: 'hotmail',
          auth: {
            user: 'mariam.xx.salem@outlook.com',
            pass: 'miro12345',
          },
        });
        const sender = {
          from: 'mariam.xx.salem@outlook.com',
          to: mail,
          subject: 'sending email from node js',
          text: 'Your new Password is ' + newPassword,
        };

        transporter.sendMail(sender, function (err, info) {
          if (err) {
            console.log(err);
            return;
          }
        });
        res.send({ msg: 'New Password has been sent to your Email', pass: newPassword });
      }
    });
  }
});
app.put('/changePassword2', async (req, res) => {
  const Email = req.body.Email;
  let Password = req.body.Password.toString();
  const hashedPassword = await bcrypt.hash(Password, 10);
  const newobjj = {};
  newobjj['Password'] = hashedPassword;

  console.log(hashedPassword + '   heeeeh');
  User.updateOne({ Email: Email }, newobjj)
    .clone()
    .then((result) => {
      console.log(result);
      if (result.modifiedCount == 1) {
        res.send('New Password has been sent to your Email');
      }
    })
    .catch((err) => {
      console.error(`Failed to add review`);
      res.send('User does not exist');
    });
});
app.post('/confirmPassword', authenticate, async (req, res) => {
  const Password1 = req.body.Password;
  const userName = user2.username;
  const newPassword = req.body.newPassword;
  console.log(newPassword + 'new password');

  if (Password1 == '') {
    res.send('please enter your old password');
  } else if (Password1 != '' && newPassword == '') {
    res.send('please enter your new password!');
  } else {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);

    console.log(hashedPassword + '   heeeeh');

    User.find({ UserName: userName }, (req, result) => {
      bcrypt.compare(Password1, result[0].Password).then((result2) => {
        if (result.length == 0 || result2 == false) {
          console.log(Password);
          //console.log(result[0].Password)
          console.log('ana mgtshh hena');
          res.send('incorrect old password');
        } else {
          res.send('changing password..');
        }
      });
    });
  }
});

app.put('/changePassword', authenticate, async (req, res) => {
  const username = user2.username;

  //bcrypt.hash(req.body.newPassword, "mariam", function (err, hash) {

  const newPassword = await bcrypt.hash(req.body.newPassword, 10);
  console.log(newPassword + ' anaaaaaaaaaa');

  const newobjj = {};
  newobjj['Password'] = newPassword;

  User.updateOne({ UserName: username }, newobjj)
    .clone()
    .then((result) => {
      console.log(result);
      if (result.modifiedCount == 1) {
        res.send('User Updated');
      } else {
        res.send('you entered the same password !');
      }
    })

    .catch((err) => {
      console.error(`Failed to add review`);
      res.send('User does not exist');
    });
});
//})

app.put('/updateuser', authenticate, (req, res) => {
  const FirstName = req.body.FirstName;
  const SecondName = req.body.SecondName;
  // const UserID = req.body.UserID
  const PassportNumber = req.body.PassportNumber;
  const Email = req.body.Email;
  const Age = req.body.Age;
  const Password = req.body.Password;
  const PhoneNumber = req.body.PhoneNumber;

  if (FirstName != '') {
    updateObj2['FirstName'] = FirstName;
  }
  if (SecondName != '') {
    updateObj2['SecondName'] = SecondName;
  }
  //if (UserID != "") {
  //updateObj2['UserID'] = UserID
  //}
  if (PassportNumber != '') {
    updateObj2['PassportNumber'] = PassportNumber;
  }
  if (Email != '') {
    updateObj2['Email'] = Email;
  }
  if (Password != '') {
    updateObj2['Password'] = Password;
  }
  if (Age != '') {
    updateObj2['Age'] = Age;
  }

  if (PhoneNumber != '') {
    updateObj2['PhoneNumber'] = PhoneNumber;
  }
  console.log(user2.username + 'miroooooooooooooooooooooooo');
  const username = user2.username;

  User.updateOne({ UserName: username }, updateObj2)
    .clone()
    .then((result) => {
      console.log(result);
      if (result.modifiedCount == 1) {
        res.send('User Updated');
      } else {
        res.send('User does not exist');
      }
    })
    .catch((err) => {
      console.error(`Failed to add review`);
      res.send('User does not exist');
    });
});

app.get('/viewreservedflights', (req, res) => {
  let userName = obj3.UserName;

  User.find({ UserName: userName }, (req, result) => {
    if (result.length != 0) {
      globalEmail = result[0].Email;
      if (userName == 'admin') {
        Reservation.find({}, (req, values) => {
          res.json({ message: values });
        });
      } else {
        Reservation.find({ UserEmail: globalEmail }, (req, values) => {
          res.json({ message: values });
        });
      }
    }
  });
});

app.put('/update', (req, res) => {
  console.log(req);
  const flightN = req.body.flightN;
  const newFlightNumber = req.body.newFlight;
  const arrivalT = req.body.arrivalT;
  const DepartureTime = req.body.DepartureTime;
  const DepartureDate = req.body.DepartureDate;
  const ArrivalDate = req.body.ArrivalDate;
  const economy = req.body.economy;
  const business = req.body.business;
  const Airport = req.body.Airport;
  const ArrivalTerminal = req.body.ArrivalTerminal;
  const DepartureTerminal = req.body.DepartureTerminal;

  if (newFlightNumber != '') {
    updateObj['FlightNumber'] = newFlightNumber;
  }
  if (arrivalT != '') {
    updateObj['ArrivalTime'] = arrivalT;
  }
  if (DepartureTime != '') {
    updateObj['DepartureTime'] = DepartureTime;
  }
  if (DepartureDate != '') {
    updateObj['DepartureDate'] = DepartureDate;
  }
  if (ArrivalDate != '') {
    updateObj['ArrivalDate'] = ArrivalDate;
  }
  if (DepartureTerminal != '') {
    updateObj['DepartureTerminal'] = DepartureTerminal;
  }

  if (ArrivalTerminal != '') {
    updateObj['ArrivalTerminal'] = ArrivalTerminal;
  }

  if (economy != '') {
    updateObj['ArrivalTerminal'] = economy;
  }
  if (business != '') {
    updateObj['ArrivalTerminal'] = business;
  }
  if (Airport != '') {
    updateObj['ArrivalTerminal'] = Airport;
  }

  // Flights.findById(900, (error, flightToUpdate) => {

  //   console.log(flightToUpdate + "nksnkjdnjn")
  //   // flightToUpdate.ArrivalTime = arrivalT
  //   // flightToUpdate.DepartureTime = DepartureTime
  //   // flightToUpdate.DepartureDate = DepartureDate
  //   // flightToUpdate.ArrivalDate = ArrivalDate
  //   // flightToUpdate.EconomySeats = economy
  //   // flightToUpdate.BusinessClassSeats = business
  //   // flightToUpdate.Airport = Airport
  //   // flightToUpdate.ArrivalTerminal = ArrivalTerminal
  //   // flightToUpdate.DepartureTerminal = DepartureTerminal
  //   // flightToUpdate.save();

  // })

  Flights.updateOne({ FlightNumber: flightN }, updateObj, (error, doc) => {
    if (error) {
      console.log(error);
      // res.redirect(‘/’);
      return;
    }
  });
  res.send('updated');
});

app.post('/emailme', (req, res) => {
  var FlightNumber = req.body.FlightNumber;
  var ArrivalTime = req.body.ArrivalTime;
  var DepartureDate = req.body.DepartureDate;
  var ArrivalTerminal = req.body.ArrivalTerminal;
  var DepartureTerminal = req.body.DepartureTerminal;
  var EconomySeats = req.body.EconomySeats;
  var BusinessClassSeats = req.body.BusinessClassSeats;
  var TotalPrice = req.body.TotalPrice;
  var mail = obj3.UserName;
  console.log(mail);
  console.log(FlightNumber);
  var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'mariam.x.salem@outlook.com',
      pass: 'miro12345',
    },
  });
  const sender = {
    from: 'mariam.x.salem@outlook.com',
    to: mail,
    subject: 'sending email from node js',
    text:
      ' you have flight reservation with the following details (Flight Number :' +
      FlightNumber +
      '  Arrival Time : ' +
      ArrivalTime +
      '  Departure Date: ' +
      DepartureDate +
      '  Arrival Terminal : ' +
      ArrivalTerminal +
      '  Departure Terminal: ' +
      DepartureTerminal +
      ' Economy Seats: ' +
      EconomySeats +
      '  Business Class Seats: ' +
      BusinessClassSeats +
      '  The tota; amount will be ' +
      TotalPrice,
  };

  console.log('');
  transporter.sendMail(sender, function (err, info) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.send({ msg: 'Email is Sent Successfully' });
      console.log('i am here');
    }
    //console.log("ANA BA3AAAAT" + info.response);
  });
});

app.post('/createFlight', (req, res) => {
  const flightN = req.body.flightN;
  const arrivalT = req.body.arrivalT;
  const DepartureTime = req.body.DepartureTime;
  const DepartureDate = req.body.DepartureDate;
  const ArrivalDate = req.body.ArrivalDate;
  const economy = req.body.economy;
  const business = req.body.business;
  const Airport = req.body.Airport;
  const ArrivalTerminal = req.body.ArrivalTerminal;
  const DepartureTerminal = req.body.DepartureTerminal;
  if (flightN != '') {
    createdobj['FlightNumber'] = flightN;
  }
  if (arrivalT != '') {
    createdobj['ArrivalTime'] = arrivalT;
  }
  if (DepartureTime != '') {
    createdobj['DepartureTime'] = DepartureTime;
  }
  if (DepartureDate != '') {
    createdobj['DepartureDate'] = DepartureDate;
  }
  if (ArrivalDate != '') {
    createdobj['ArrivalDate'] = ArrivalDate;
  }
  if (DepartureTerminal != '') {
    createdobj['DepartureTerminal'] = DepartureTerminal;
  }

  if (ArrivalTerminal != '') {
    createdobj['ArrivalTerminal'] = ArrivalTerminal;
  }

  if (economy != '') {
    createdobj['ArrivalTerminal'] = economy;
  }
  if (business != '') {
    createdobj['ArrivalTerminal'] = business;
  }
  if (Airport != '') {
    createdobj['ArrivalTerminal'] = Airport;
  }

  createdobj['AvailableSeats'].push('A0');
  createdobj['AvailableSeats'].push('A1');
  createdobj['AvailableSeats'].push('A2');

  createdobj.save(function (err) {
    if (err) {
      console.log(err + 'hello');
      throw err;
    } else {
      console.log('Saved');
    }
  });
});

app.post('/addAdmin', (req, res) => {
  const personDocument = new Admin({
    Name: 'Mohamed Ashraf',
    Email: 'mashrafelsaeed@gmail.com',
    id: 1,
  });
  personDocument.save(function (err) {
    if (err) {
      console.log(err + 'hello');
      throw err;
    } else {
      console.log('Saved');
    }
  });
});

// #Routing to usercontroller here

/*
                                                    End of your code
*/

// Starting server
app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
//module.exports= authentication
