const express = require("express");
const router = express.Router();
const betfair = require("betfair")

const session = new betfair.BetfairSession("XAl3yHNF9KCFr2TI")

router.post("/login", async (req, res) => {
    try {
        session.login("ilmiosuccesso@gmail.com", "pascal18", (error) => {
            console.log(error ? "Login Failed " + error : "Login Ok")
        })
        res.status(200).send("Login Successfully!")
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})


module.exports = router;