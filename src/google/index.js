const { google } = require("googleapis")
const fs = require("fs-extra")
const express = require("express")
const router = express.Router()

const CLIENT_ID = process.env.CLIENT_ID || "380825532247-ms7fb2sics98gidpja5mkolkoec9feor.apps.googleusercontent.com"
const CLIENT_SECRET = process.env.CLIENT_SECRET || "NCxvcASUE08q3XKS8ZLx62XA"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = process.env.REFRESH_TOKEN || "1//04A7RyKt5qrIxCgYIARAAGAQSNwF-L9Ir3slklJ1fT5kJ3-7Dr9wJNaXORfJIlj1JSvtNjOTgnMnPRamS7bGei9QQiM2KBubuq9Y"

// Creating the authentication object
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN, access_token: "ya29.a0AfH6SMCjQY5P82pmlDUNi7pS5xAgfpNOH2CSzCbc0_UMZGBuI6LERLDxX8F-1InWLOyzuCs4rEKjF3hGeczajFrYVz3mvIOH0h_CvRBJyY_hv4nQRGJbyeJuwtDhXhd3LSkD5Oo_zjshfleu6gQgdxoE3lpi"})

// Create an istance of google drive
const drive = google.drive({
    version: "v3",
    auth: oauth2Client
})

// Dutcher Odds
router.get("/dutcher-odds", async (req, res) => {
    try {
        // Retrieve the folder
        const response = await drive.files.list({
            q: `"1y5m8t0H450NVJjacV2N6rumAC1L-T_9G" in parents`
        })

        // Filter the json file with the odds
        const rawOdds = response.data.files.filter( odd => odd.name === "dutcherOdds.json")
        const fileID = rawOdds[0].id

        // Get the odds infoes
        const odds = await drive.files.get({
            fileId: fileID,
            mimeType: "application/json",
            alt: "media"
        }).then(
            response => response.data
        )
        res.status(200).send(odds)
    } catch (error) {
        console.log(error)
    }
})

// Trimatcher Odds
router.get("/trimatcher-odds", async (req, res) => {
    try {
        // Retrieve the folder
        const response = await drive.files.list({
            q: `"1y5m8t0H450NVJjacV2N6rumAC1L-T_9G" in parents`
        })

        // Filter the json file with the odds
        const rawOdds = response.data.files.filter( odd => odd.name === "trimatcherOdds.json")
        const fileID = rawOdds[0].id

        // Get the odds infoes
        const odds = await drive.files.get({
            fileId: fileID,
            mimeType: "application/json",
            alt: "media"
        }).then(
            response => response.data
        )
        res.status(200).send(odds)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router