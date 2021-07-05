const { google } = require("googleapis");
const fs = require("fs-extra");
const express = require("express");
const router = express.Router();

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
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
router.get("/oddsmatcher", async (req, res) => {
  try {
    // Retrieve the folder
    const response = await drive.files.list({
      q: `"1y5m8t0H450NVJjacV2N6rumAC1L-T_9G" in parents`,
    });

    const oddsFile = response.data.files.filter(
      (oddFile) => oddFile.name === "dutcherOdds1.json"
    );
    const fileID = oddsFile[0].id;

    // Get the odds infoes
    const odds = await drive.files
      .get({
        fileId: fileID,
        mimeType: "application/json",
        alt: "media",
      })
      .then((response) => response.data);

    let oddsmatcherOdds = [];
    oddsmatcherOdds = odds.filter(
      (odd) => odd.book_one === "betfair" || odd.book_two === "betfair"
    );

    res.status(200).send(odds);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.get("/history", async (req, res) => {
  try {
    // Retrieve the folder
    const response = await drive.files.list({
      q: `"1y5m8t0H450NVJjacV2N6rumAC1L-T_9G" in parents`,
    });

    const oddsFile = response.data.files.filter(
      (oddFile) => oddFile.name === "history.json"
    );

    // Get the odds infoes
    const history = await drive.files
      .get({
        fileId: "1J34yAPp_IpiBcY8btpee1K-Do4pTUMgM",
        mimeType: "application/json",
        alt: "media",
      })
      .then((response) => response.data);

    history.map((odd) => {
      // Deleting useless data
      delete odd.quota12
      delete odd.quota_1x
      delete odd.quota_x2
      delete odd.pari
      delete odd.dispari
      delete odd.quota12_t1
      delete odd.quota_1x_t1
      delete odd.quota_x2_t1
      delete odd.pari_t1
      delete odd.dispari_t1
      delete odd.quota12_t2
      delete odd.quota_1x_t2
      delete odd.quota_x2_t2
      delete odd.pari_t2
      delete odd.dispari_t2
      delete odd.o_4_5
      delete odd.o_5_5
      delete odd.u_4_5
      delete odd.u_5_5

      // Changing keys names
      odd["nogoal"] = odd["no goal"];
      delete odd["no goal"];
      // 1X2
      odd["1"] = odd["quota_1"];
      delete odd["quota_1"];
      odd["2"] = odd["quota_2"];
      delete odd["quota_2"];
      odd["x"] = odd["quota_x"];
      // 1X2 first half time
      odd["1_t1"] = odd["quota_1_t1"]
      delete odd["quota_1_t1"]
      odd["x_t1"] = odd["quota_x_t1"]
      delete odd["quota_x_t1"]
      odd["2_t1"] = odd["quota_2_t1"]
      delete odd["quota_2_t1"]
      // 1X2 second half time
      odd["1_t2"] = odd["quota_1_t2"]
      delete odd["quota_1_t2"]
      odd["x_t2"] = odd["quota_x_t2"]
      delete odd["quota_x_t2"]
      odd["2_t2"] = odd["quota_2_t2"]
      delete odd["quota_2_t2"]
      // Under/Over final time
      delete odd["quota_x"];
      odd["U0.5"] = odd["u_0_5"]
      delete odd["u_0_5"]
      odd["O0.5"] = odd["o_0_5"]
      delete odd["o_0_5"]
      odd["U1.5"] = odd["u_1_5"]
      delete odd["u_1_5"]
      odd["O1.5"] = odd["o_1_5"]
      delete odd["o_1_5"]
      odd["U2.5"] = odd["u_2_5"]
      delete odd["u_2_5"]
      odd["O2.5"] = odd["o_2_5"]
      delete odd["o_2_5"]
      odd["U3.5"]  = odd["u_3_5"]
      delete odd["u_3_5"]      
      odd["O3.5"]  = odd["o_3_5"]
      delete odd["o_3_5"]
      // Under/Over first half time
      odd["U0.5_t1"] = odd["u_0_5_t1"]
      delete odd["u_0_5_t1"]      
      odd["O0.5_t1"] = odd["o_0_5_t1"]
      delete odd["o_0_5_t1"]
      odd["U1.5_t1"] = odd["u_1_5_t1"]
      delete odd["u_1_5_t1"]      
      odd["O1.5_t1"] = odd["o_1_5_t1"]
      delete odd["o_1_5_t1"]
      odd["U2.5_t1"] = odd["u_2_5_t1"]
      delete odd["u_2_5_t1"]      
      odd["O2.5_t1"] = odd["o_2_5_t1"]
      delete odd["o_2_5_t1"]
      odd["U3.5_t1"] = odd["u_3_5_t1"]
      delete odd["u_3_5_t1"]      
      odd["O3.5_t1"] = odd["o_3_5_t1"]
      delete odd["o_3_5_t1"]
      // Under/Over second half time
      odd["U0.5_t2"] = odd["u_0_5_t2"]
      delete odd["u_0_5_t2"]      
      odd["O0.5_t2"] = odd["o_0_5_t2"]
      delete odd["o_0_5_t2"]
      odd["U1.5_t2"] = odd["u_1_5_t2"]
      delete odd["u_1_5_t2"]      
      odd["O1.5_t2"] = odd["o_1_5_t2"]
      delete odd["o_1_5_t2"]
      odd["U2.5_t2"] = odd["u_2_5_t2"]
      delete odd["u_2_5_t2"]      
      odd["O2.5_t2"] = odd["o_2_5_t2"]
      delete odd["o_2_5_t2"]
      odd["U3.5_t2"] = odd["u_3_5_t2"]
      delete odd["u_3_5_t2"]      
      odd["O3.5_t2"] = odd["o_3_5_t2"]
      delete odd["o_3_5_t2"]
    });

    const prova = history.filter(odd => odd.univoca === "Fc ShkendijaNs Murasirplay")
    res.status(200).send(prova);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
// 1J34yAPp_IpiBcY8btpee1K-Do4pTUMgM
module.exports = router;