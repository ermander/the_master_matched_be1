const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const authenticate = require("./authTools")
const UserModel = require("../users/schema")
const { basicAuthenticationMiddleware } = require("../middlewares/auth")

// Login route
/*
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
*/

// Login route (provvisorio)
router.post("/login", async (req, res) => {
    try {
        // Checks if the user exists
        const user = await UserModel.findOne({email: req.body.email})
        if(user == null){
            console.log("The user do not exists!")
            res.status(400).send("The user do not exists!")
        }else{
            // Compare the two password
            const isMatch = await bcrypt.compare(req.body.password, user.password)
            if(isMatch) {
                res.status(200).send("Logged!")
            }else{
                res.status(400).send("Not allowed!")
            }
        }
    } catch (error) {
        console.log(error)
    }
})

// Registretion route
/*
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
*/

// Registretion route (provvisorio)
router.post("/registration", async (req, res) => {
    try {
        // Check if the email already exists
        const exists = await UserModel.findOne({email: req.body.email})
        console.log(req.body)

        if(exists){
            console.log("This email already exists")
            res.status(400).send("This mail already exists!")
        }else{
            // Generating the salt
            const salt = await bcrypt.genSalt()
            // Hashing the password
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            // Replacing the password with the hashed one
            const rawUser = {
                ...req.body,
                password: hashedPassword
            }
            const newUser = new UserModel(rawUser)
            await newUser.save()
            res.status(201).send("Created!")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occurred!")
    }
})

module.exports = router