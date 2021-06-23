const express = require("express")
const cors = require("cors")
const listOfEndpoint = require("express-list-endpoints")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

// Importing the routes
const login = require("./authentication/index")
const cashbackBookmakers = require("./cashback_books")
const odds = require("./odds/index")
const googleOdds = require("./google/index")
const betfair = require("./betfair/index")
const mybet21 = require("./mybet21/index")
const keepActive = require("./keep_active/index")

const app = express()

// Dotenv configuration
dotenv.config()

// Cors
app.use(cors())

// Server port 3002
const port = process.env.PORT || 3004

app.use(express.json())

// Keep Active
app.use("/cronojob", keepActive)
// Odds
app.use("/odds", odds)

// Odds from google
app.use("/google-odds", googleOdds)

// Login route
app.use("/users", login)

// Cashbaks bookmakers
app.use("/cashback-bookmakers", cashbackBookmakers)

// Betfair 
app.use("/betfair", betfair)

// MyBet21
app.use("/mybet21", mybet21)

// Preview of the current endpoints into the terminal 
console.log(listOfEndpoint(app))

// MongoDB connection
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || 3004;
mongoose
  .connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    app.listen(port, () => {
      console.log(`working on port ${port}`);
    })
  );
  mongoose.connection.on("connected", () => {
  console.log("connected to atlas");
});