const express = require("express")
const cors = require("cors")
const listOfEndpoint = require("express-list-endpoints")
const dotenv = require("dotenv").config()
const mongoose = require("mongoose")

// Routes
const login = require("./authentication/index")
const cashbackBookmakers = require("./cashback_books(provvisorio)")

const app = express()

// Cors
app.use(cors())


// Server port 3002
const port = process.env.PORT || 3004

app.use(express.json())

// Login route
app.use("/authentication", login)

// Cashbaks bookmakers
app.use("/cashback-bookmakers", cashbackBookmakers)

// Preview of the current endpoints into the terminal 
console.log(listOfEndpoint(app));
console.log(process.env.MONGO_CONNECTION_STRING)
// MongoDB connection
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || 3004;
mongoose
  .connect("mongodb+srv://ermander:Pippotanto01@cluster0.4xisp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
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