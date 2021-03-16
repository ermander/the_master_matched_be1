const { Schema, model } = require("mongoose")

const cashbackBookmakersSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        cashback: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

const cashbackBookmakerModel = model("cashbackBookmakers", cashbackBookmakersSchema)
module.exports = cashbackBookmakerModel