const { google } = require("googleapis")
const fs = require("fs-extra")
const express = require("express")
const router = express.Router()

const CLIENT_ID = process.env.CLIENT_ID || "380825532247-ms7fb2sics98gidpja5mkolkoec9feor.apps.googleusercontent.com"
const CLIENT_SECRET = process.env.CLIENT_SECRET || "NCxvcASUE08q3XKS8ZLx62XA"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = process.env.REFRESH_TOKEN || "1//04JKsdIqlPRXxCgYIARAAGAQSNwF-L9IrnJ1SuW1ZMSmNlYfT94eEICYqjwoKOMzM_gmndDMy0eFnOon5Fjy9YQREVCqu1kw6lFs"

// Creating the authentication object
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)

oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

// Create an istance of google drive
const drive = google.drive({
    version: "v3",
    auth: oauth2Client
})

// Dutcher Odds
router.get("/dutcher-odds", async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
})
const dutcherOdds = async (req, res) => {
    try {
        const odds = async () => {
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
            })
            .then(
                response => response.data
            )

            res.status(200).send(odds.data)
        }
        console.log(odds)
    } catch (error) {
        console.log(error)
    }
}

// Downloading json with trimatcher's odds infoes
const trimatcherOdds = async() => {
    try {
        const response = await drive.files.list()
        const files = response.data.files
        const odds = files.filter(file => file.name === "trimatcherOdds")
        return odds
    } catch (error) {
        console.log(error)
        return error
    }
}

dutcherOdds()

module.exports =  { dutcherOdds, trimatcherOdds }