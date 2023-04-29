# Mr.Robot Airlines

### Project Title: This Website simulates an virtual airline reservation system that (1) registers new passengers  (2) allows users to look up their booking details, and (3) optionally cancel their reservations later. Lastly, it maintains various seating capacities across multiple and customizable flights.

### Motivation: User can book their tickets from any location, thus saving their time and effort. Users can place their query as per their requirement and get results immediately on particular flight as per their desired Destination.

### Build Status:

### Code Style: Code style used in our website is standard.

### Screenshots:
![alt text](https://ibb.co/tPXwn7p)
![alt text](https://ibb.co/kgQ5m8w)
![alt text](https://ibb.co/DMZwWBB)

### Framwork:

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
- Test

### Features: If the user forgot his password he can easily retrieve a new password using his email and then change it later

### Code example:

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



### Credits:

### License: