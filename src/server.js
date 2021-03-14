const express = require("express")
const cors = require("cors")
const listOfEndpoint = require("express-list-endpoints")
const dotenv = require("dotenv")

// Routes
const login = require("./authentication")

const app = express()

// Cors
app.use(cors())

// Dotenv configurations
dotenv.config();

// Login route
app.use("/authentication", login)

// Preview of the current endpoints into the terminal 
console.log(listOfEndpoint(app));

app.listen(3000)