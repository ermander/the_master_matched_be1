const express = require("express")
const { findById } = require("./schema")
const router = express.Router()
const cashbackBookmakerModel = require("./schema")
const mongoose = require("mongoose")
mongoose.set('useFindAndModify', false)

//Fetch current avaiable cashback books
router.get("/get-bookmakers", async (req, res) => {
    try {
        const bookmakers = await cashbackBookmakerModel.find()
        if(!bookmakers) {
            res.status(400).send("No bookmakers avaiable!")
            console.log("ok")
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
            console.log(newBookmaker)
            res.status(200).send("Saved!")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occurred!")
    }
})

// PUT (Modify) a a bookmaker
router.put("/modify-bookmaker", async (req, res) => {
    try {
        await cashbackBookmakerModel.findByIdAndUpdate({
            _id: req.body._id
        },
        {
            name: req.body.name,
            cashback: req.body.cashback
        })
        const prova = await cashbackBookmakerModel.findById({_id: req.body._id})
        console.log(prova)
        res.status(200).send("Modified!")
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