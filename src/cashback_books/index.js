const express = require("express")
const router = express.Router()
const cashbackBookmakerModel = require("./schema")
const mongoose = require("mongoose").set('useFindAndModify', false)
const { jwt } = require("../middlewares/auth")

//Fetch current avaiable cashback books
router.get("/get-bookmakers", jwt, async (req, res) => {
    try {
        const bookmakers = await cashbackBookmakerModel.find({
            userID: req.user._id
        })
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
router.post("/post-new-bookmaker", jwt, async (req, res) => {
    try {
        // Checks if exists a user already have the bookmaker
        const exist = await cashbackBookmakerModel.findOne({
            userID: req.user._id,
            name: req.body.data.bookmakerName
        })
        if(exist != null) {
            res.status(400).send("This bookmaker already exist!")
        }else{
            const newBookmaker = new cashbackBookmakerModel({
                ...req.body.data,
                userID: req.user._id
            })
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
router.put("/modify-bookmaker", jwt, async (req, res) => {
    try {
        await cashbackBookmakerModel.findByIdAndUpdate({
            _id: req.body.data._id
        },
        {
            name: req.body.data.name,
            cashback: req.body.data.cashback
        })
        res.status(200).send("Modified!")
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occurred!")
    }
})

//Delete a bookmaker
router.delete("/delete-bookmaker", jwt, async (req, res) => {
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