const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authenticate = require("./authTools")
const UserModel = require("../users/schema")


// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findByCredentials(email, password)
        // Generate the token
        const token = await authenticate(user)
        // Send the token to the client
        res.status(200).send(token)
    } catch (error) {
        console.log(error)
        res.status(400).send("An error occurred!")
    }
})

// Registretion route
router.post("/registration", async (req, res) => {
    console.log(req.body)
    try {
        const newUser = new UserModel(req.body)
        await newUser.save()        
        res.status(200).send("Saved!")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router