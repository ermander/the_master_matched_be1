const { Schema, model } = require("mongoose")

const MatchesSchema = new Schema(
    {
        bet_status : {
            type: Boolean,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        sportType: {
            type: String,
            required: false
        },
        event: {
            type: String,
            required: true
        },
        tournament: {
            type: String,
            required: false
        },
        market: {
            type: String,
            required: true
        },
        // method means if a match is lay and back or lay and lay
        method: {
            type: String,
            required: true
        },
        bookmaker_one: {
            type: String,
            required: false
        },
        bookmaker_one_holder: {
            type: String,
            required: false
        },
        bookmaker_two: {
            type: String,
            required: false
        },
        bookmaker_two_holder: {
            type: String,
            required: false
        },
        bookmaker_three: {
            type: String,
            required: false
        },
        bookmaker_three_holder: {
            type: String,
            required: false
        },
        stake_lay_one: {
            type: Number,
            required: false
        },
        stake_lay_one_type: {
            type: Number,
            required: true
        },
        odd_lay_one: {
            type: Number,
            required: false
        },
        risk_lay_one: {
            type: Number,
            required: false
        },
        stake_lay_two: {
            type: Number,
            required: false
        },
        stake_lay_two_type: {
            type: Number,
            required: true
        },
        odd_lay_two: {
            type: Number,
            required: false
        },        
        risk_lay_two: {
            type: Number,
            required: false
        },
        stake_lay_three: {
            type: Number,
            required: false
        },
        stake_lay_three_type: {
            type: Number,
            required: true
        },
        odd_lay_three: {
            type: Number,
            required: false
        },
        risk_lay_three: {
            type: Number,
            required: false
        },
        stake_back: {
            type: Number,
            required: false
        },
        stake_back_type: {
            type: Number,
            required: true
        },
        odd_back: {
            type: Number,
            required: false
        },
        risk_back: {
            type: Number,
            required: false
        },
        odd_one_status: {
            type: String,
            required: true
        },
        odd_two_status: {
            type: String,
            required: true
        },
        odd_three_status: {
            type: String,
            required: true
        },
        back_status: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const MatchesModel = model("matches", MatchesSchema)
module.exports = MatchesModel