const { google } = require("googleapis");
const fs = require("fs-extra");
const express = require("express");
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const CLIENT_SECRET = process.env.CLIENT_SECRET;

// Creating the authentication object
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
});

// Create an istance of google drive
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

// Oddsmatcher Odds
router.get("/oddsmatcher", async(req, res) => {
    try {
        // Retrieve the folder
        const response = await drive.files.list({
            q: `"1y5m8t0H450NVJjacV2N6rumAC1L-T_9G" in parents`,
        });

        const oddsFile = response.data.files.filter(
        (oddFile) => oddFile.name === "dutcherOdds1.json"
        )
        const fileID = oddsFile[0].id

        // Get the odds infoes
        const odds = await drive.files.get({
            fileId: fileID,
            mimeType: "application/json",
            alt: "media",
        }).then((response) => response.data)

        let oddsmatcherOdds = []
        oddsmatcherOdds = odds.filter(odd => odd.book_one === "betfair" || odd.book_two === "betfair")
        console.log(oddsmatcherOdds)


        res.status(200).send(odds)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

module.exports = router;
