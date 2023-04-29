# Mr.Robot Airlines

### Project Theme: 
The theme of the project, is to create a complete Airline Reservation System. An Airline
Reservation System is a web application through which individuals can reserve and pay
for flights in order to travel to different countries and sometimes domestic cities. Each
airline usually has its own website through which reservations (bookings) can be made.
Such websites include EgyptAir.com, Emirates.com, Lufthansa.com and AirCanada.com.

**The Website have to 3 different types of Stakeholders**

## 1- Admin:

1.1- the Administrator can create flights including all flight details 

1.2- the Administrator can list of all the available flights without any search criteria.

1.3- the Administrator can update (edit) any selected flight and its details 

1.4- the Administrator can delete any selected flights and all their details upon confirmation.



## 2- Registered User:

2.1- The system should allow an Existing User to sign in.

2.2- search for available flights based on any flight detail

2.3- see all the details of a particular departure flight.

2.4- see a summary of the chosen departure and return flights

2.5- view the available seats in the chosen cabin of the chosen flight

2.6- view all their current reserved flights.

2.7- cancel a reservation

2.8- The system should automatically email any Existing User with their cancelled reservation and the amount to be refunded.

2.9- edit their information including first name, last name, passport number and email.

2.10- change their password.

2.11- change the chosen seat on a departure flight.

2.12- change a selected reserved departure flight. display price difference either it's a refund or amount to be paid

2.13- reserve flight

2.14- pay for the departure flight change using MasterCard or Visa.

2.15- email him/herself their itinerary at any time.







## 3- Guest User:

3.1- The system should allow a Guest User to sign up.

3.2- The password must be encrypted.

3.3- view a list of all available flights based on the search criteria.

3.4- see all the details of a particular flight







# Framework:

- Express
- Mongo DB
- Mongoose
- Axios
- Bcrypt
- Cors
- React
- React-dom
- Dotenv
- Jsonwebtoken
- React-scripts
- Stripe
- nodemailer
- Jest





### Installation: 
1. VS Code
2. Postman



### API reference:

- [Home](http://localhost:3000)
- [Create Flight](http://localhost:3000/CreateFlight)
- [View Flight](http://localhost:3000/ViewFlights)
- [update Flight](http://localhost:3000/updateFlight)
- [Search Flight](http://localhost:3000/SearchFinal)
- [Delete Flight](http://localhost:3000/deleteFlight)
- [Login](http://localhost:3000/Login)
- [Sign-Up](http://localhost:3000/Registration)
[View Reserved Flights](http://localhost:3000/Viewreservedflights)
- [Change Password](http://localhost:3000/ChangePassword)
- [Logout](http://localhost:3000/logout)

### Tests:


### How to Use?:

1. Run the [Home](http://localhost:3000) page 
1. Press [Sign-Up](http://localhost:3000/Registration) if you didn't have an account and [Login](http://localhost:3000/Login) if you already have an account and want to Login with. You may also continue as a guest user but there is some actions you cant take as a guest user.
1. When you successfully login You will have a NavBar that you can choose from either to Book Flight , View your previous reservations,update your profile, or Logout from the Account , in case you are a guest user you can only choose a flight to book and then you will be asked to continue logging in order to complete your booking process. And there's another type of user which is the Admin user.
The admin have the authority to delete a flight, view all reservations made by clients, create flights and he can update flights
1. After pressing the Book Flight Button the system will automaticlly re-direct you to the payment webform and the user is required to fill some data regarding his/her credit card

### Contribute:
1. To contribute just clone the project
2. To clone the repository using HTTPS, under "Clone with HTTPS", click . To clone the repository using an SSH key, including a certificate issued by your organization's SSH certificate authority, click Use SSH, then click . To clone a repository using GitHub CLI, click Use GitHub CLI, then click .
3. Open Terminal.
4. Change the current working directory to the location where you want the cloned directory.
5. Type git clone, and then paste the URL you copied earlier.
6. Press Enter to create your local clone.
7. Change directory to backend first
8. use NPM install command in order to download the Node Modules used in the project
9. Change directory again in order to open the SRC Folder inside the backend proj
10. run the backend using the command npm run devStart
11. open another terminal for your frontend project
12. Change directory to FrontEnd Project
13. use NPM install command in order to download the Node Modules used in the project
14. Run npm start command to start your react project


