const express = require("express")
const router = express.Router()
const fs = require("fs")

// Prova
router.get("/get-odds", async(req, res) => {
    try {    
        const odds = fs.readFileSync("C:/Users/39340/OneDrive/ninjabetCondiviso/ItaliaIrlanda del Nordbwin.json", "utf8", (err, data) => {
            if(err){
                return err
            }
            return data
        })
        console.log(odds)
        res.status(200).send(odds)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


module.exports = router