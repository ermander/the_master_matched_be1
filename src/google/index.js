const { google } = require("googleapis");
const fs = require("fs-extra");
const express = require("express");
const router = express.Router();

const CLIENT_ID =
  process.env.CLIENT_ID ||
  "380825532247-ms7fb2sics98gidpja5mkolkoec9feor.apps.googleusercontent.com";
const CLIENT_SECRET = process.env.CLIENT_SECRET || "NCxvcASUE08q3XKS8ZLx62XA";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =
  process.env.REFRESH_TOKEN ||
  "1//045X-6GF7CmNZCgYIARAAGAQSNwF-L9IrIevpGhMTLyGYXUidmkGlJ-Nnz-ykeBknFcLmSJwGvGFF_abPfsCOi5j4lCqIwyI9GPg";

// Creating the authentication object
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: REFRESH_TOKEN,
  access_token:
    "ya29.a0AfH6SMCWK6YFTGWwIpMrW6OrHutBX2Uu6CQQP8Xp-WTvrOd_JjXNvhX17ZPIrUNLrAKuXxhjPW395fXqQypcrpYbIK2ZX5MuEDeHLPyG6hadkLuwWUuZ3xRN2mRq_2kcLxjL5Ud942aglooqVpH5g7rl50vS",
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
    res.status(200).send(odds);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;