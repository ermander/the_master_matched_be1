const express = require("express")
const router = express.Router()
const cashbackBookmakerModel = require("./schema")

//Fetch current avaiable cashback books
router.get("/get-bookmakers", async (req, res) => {
    try {
        const bookmakers = await cashbackBookmakerModel.find()
        if(!bookmakers) {
            res.status(400).send("No bookmakers avaiable!")
        }
        res.status(200).send(bookmakers)
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occurred!")
    }
})

//Post a new avaiable bookmakers
router.post("/post-new-bookmaker", async (req, res) => {
    try {
        const exist = await cashbackBookmakerModel.findOne({name: req.body.name})
        console.log(exist)
        if(exist != null) {
            res.status(400).send("This bookmaker already exist!")
        }else{
            const newBookmaker = new cashbackBookmakerModel(req.body)
            await newBookmaker.save()
            res.status(200).send("Saved!")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occurred!")
    }
})

//Delete a bookmaker
router.delete("/delete-bookmaker", async (req, res) => {
    try {
        const exist = await cashbackBookmakerModel.findOne({_id: req.body._id})
        if(!exist) res.status(404).send("Not found!")
        await cashbackBookmakerModel.findByIdAndDelete(exist._id)
        res.status(200).send("Deleted!")
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occurred!")
    }
})




module.exports = router