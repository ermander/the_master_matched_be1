const express = require("express")
const router = express.Router();

// Useless path for crono jobs
router.get("/active", async(req, res) => {
    try {
        res.status(200).send("OK!")
    } catch (error) {
        console.log(error)
        res.send("An error occurred")
    }
})
module.exports = router;