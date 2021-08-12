const { google } = require("googleapis");
const fs = require("fs-extra");
const express = require("express");
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const CLIENT_SECRET = process.env.CLIENT_SECRET

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

// Dutcher Odds
router.get("/dutcher-odds", async (req, res) => {
  try {
    // Retrieve the folder
    const response = await drive.files.list({
      q: `"1y5m8t0H450NVJjacV2N6rumAC1L-T_9G" in parents`,
    });

    // Filter the json file with the odds
    const rawOdds = response.data.files.filter(
      (odd) => odd.name === "dutcherOdds.json"
    );
    const fileID = rawOdds[0].id;

    // Get the odds infoes
    const odds = await drive.files
      .get({
        fileId: fileID,
        mimeType: "application/json",
        alt: "media",
      })
      .then((response) => response.data);
    res.status(200).send(odds);
  } catch (error) {
    console.log(error);
  }
});

// Trimatcher Odds
router.get("/trimatcher-odds", async (req, res) => {
  try {
    // Retrieve the folder
    const response = await drive.files.list({
      q: `"1y5m8t0H450NVJjacV2N6rumAC1L-T_9G" in parents`,
    });

    // Filter the json file with the odds
    const rawOdds = response.data.files.filter(
      (odd) => odd.name === "trimatcherOdds.json"
    );
    const fileID = rawOdds[0].id;

    // Get the odds infoes
    const odds = await drive.files
      .get({
        fileId: fileID,
        mimeType: "application/json",
        alt: "media",
      })
      .then((response) => response.data);
    odds = odds.map((odd) => {
      odd.book_one = odd.book_one.toLowerCase()
      odd.book_two = odd.book_two.toLowerCase()
      odd.book_three = odd.book_three.toLowerCase()
    })
    res.status(200).send(odds);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
