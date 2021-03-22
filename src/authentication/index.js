const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const { jwt } = require("../middlewares/auth")
const { authenticate, checkRefreshToken } = require("./authTools")
const UserModel = require("../users/schema")

// Login route
router.post("/login", async (req, res, next) => {
    try {
        const { email, password } = req.body
        console.log(email, password)
        const user = await UserModel.findByCredentials(email, password)
        // Generating and sendingthe token
        const tokens = await authenticate(user)
        res.status(200).send(tokens)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

// Registretion route
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

router.post("/refresh-token", async (req, res, next) => {
    try {
        const oldRefreshToken = req.body.refreshToken

        const tokens = await checkRefreshToken(oldRefreshToken)
        res.send(tokens)
    } catch (error) {
        next(error)
    }
})
module.exports = router