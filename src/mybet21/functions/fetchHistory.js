const { google } = require("googleapis");

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

const fetchHistory = async () => {
  try {
    // Get the odds infoes
    console.log("Fetching history");
    const response = await drive.files
      .get({
        fileId: "1J34yAPp_IpiBcY8btpee1K-Do4pTUMgM",
        mimeType: "application/json",
        alt: "media",
      })
      .then((response) => response.data);

    response.map((odd) => {
      // Deleting useless data
      delete odd.quota12;
      delete odd.quota_1x;
      delete odd.quota_x2;
      delete odd.pari;
      delete odd.dispari;
      delete odd.quota12_t1;
      delete odd.quota_1x_t1;
      delete odd.quota_x2_t1;
      delete odd.pari_t1;
      delete odd.dispari_t1;
      delete odd.quota12_t2;
      delete odd.quota_1x_t2;
      delete odd.quota_x2_t2;
      delete odd.pari_t2;
      delete odd.dispari_t2;
      delete odd.o_4_5;
      delete odd.o_5_5;
      delete odd.u_4_5;
      delete odd.u_5_5;

      // Changing keys names
      odd["noGoal"] = odd["nogoal"];
      delete odd["nogoal"];
      // 1X2
      odd["1"] = odd["quota_1"];
      delete odd["quota_1"];
      odd["2"] = odd["quota_2"];
      delete odd["quota_2"];
      odd["x"] = odd["quota_x"];
      // 1X2 first half time
      odd["1_t1"] = odd["quota_1_t1"];
      delete odd["quota_1_t1"];
      odd["x_t1"] = odd["quota_x_t1"];
      delete odd["quota_x_t1"];
      odd["2_t1"] = odd["quota_2_t1"];
      delete odd["quota_2_t1"];
      // 1X2 second half time
      odd["1_t2"] = odd["quota_1_t2"];
      delete odd["quota_1_t2"];
      odd["x_t2"] = odd["quota_x_t2"];
      delete odd["quota_x_t2"];
      odd["2_t2"] = odd["quota_2_t2"];
      delete odd["quota_2_t2"];
      // Under/Over final time
      delete odd["quota_x"];
      odd["U0.5"] = odd["u_0_5"];
      delete odd["u_0_5"];
      odd["O0.5"] = odd["o_0_5"];
      delete odd["o_0_5"];
      odd["U1.5"] = odd["u_1_5"];
      delete odd["u_1_5"];
      odd["O1.5"] = odd["o_1_5"];
      delete odd["o_1_5"];
      odd["U2.5"] = odd["u_2_5"];
      delete odd["u_2_5"];
      odd["O2.5"] = odd["o_2_5"];
      delete odd["o_2_5"];
      odd["U3.5"] = odd["u_3_5"];
      delete odd["u_3_5"];
      odd["O3.5"] = odd["o_3_5"];
      delete odd["o_3_5"];
      // Under/Over first half time
      odd["U0.5_t1"] = odd["u_0_5_t1"];
      delete odd["u_0_5_t1"];
      odd["O0.5_t1"] = odd["o_0_5_t1"];
      delete odd["o_0_5_t1"];
      odd["U1.5_t1"] = odd["u_1_5_t1"];
      delete odd["u_1_5_t1"];
      odd["O1.5_t1"] = odd["o_1_5_t1"];
      delete odd["o_1_5_t1"];
      odd["U2.5_t1"] = odd["u_2_5_t1"];
      delete odd["u_2_5_t1"];
      odd["O2.5_t1"] = odd["o_2_5_t1"];
      delete odd["o_2_5_t1"];
      odd["U3.5_t1"] = odd["u_3_5_t1"];
      delete odd["u_3_5_t1"];
      odd["O3.5_t1"] = odd["o_3_5_t1"];
      delete odd["o_3_5_t1"];
      // Under/Over second half time
      odd["U0.5_t2"] = odd["u_0_5_t2"];
      delete odd["u_0_5_t2"];
      odd["O0.5_t2"] = odd["o_0_5_t2"];
      delete odd["o_0_5_t2"];
      odd["U1.5_t2"] = odd["u_1_5_t2"];
      delete odd["u_1_5_t2"];
      odd["O1.5_t2"] = odd["o_1_5_t2"];
      delete odd["o_1_5_t2"];
      odd["U2.5_t2"] = odd["u_2_5_t2"];
      delete odd["u_2_5_t2"];
      odd["O2.5_t2"] = odd["o_2_5_t2"];
      delete odd["o_2_5_t2"];
      odd["U3.5_t2"] = odd["u_3_5_t2"];
      delete odd["u_3_5_t2"];
      odd["O3.5_t2"] = odd["o_3_5_t2"];
      delete odd["o_3_5_t2"];
      odd["1"] = odd["1"][0];
      odd["x"] = odd["x"][0];
      odd["2"] = odd["2"][0];
      odd["goal"] = odd["goal"][0];
      odd["noGoal"] = odd["noGoal"][0];
      odd["goal_t1"] = odd["goal_t1"][0];
      odd["noGoal_t1"] = odd["nogoal_t1"][0];
      odd["goal_t2"] = odd["goal_t2"][0];
      odd["noGoal_t2"] = odd["nogoal_t2"][0];
      odd["1_t1"] = odd["1_t1"][0];
      odd["x_t1"] = odd["x_t1"][0];
      odd["2_t1"] = odd["2_t1"][0];
      odd["1_t2"] = odd["1_t2"][0];
      odd["x_t2"] = odd["x_t2"][0];
      odd["2_t2"] = odd["2_t2"][0];
      odd["U0.5"] = odd["U0.5"][0];
      odd["O0.5"] = odd["O0.5"][0];
      odd["U1.5"] = odd["U1.5"][0];
      odd["O1.5"] = odd["O1.5"][0];
      odd["U2.5"] = odd["U2.5"][0];
      odd["O2.5"] = odd["O2.5"][0];
      odd["U3.5"] = odd["U3.5"][0];
      odd["O3.5"] = odd["O3.5"][0];
      odd["U0.5_t1"] = odd["U0.5_t1"][0];
      odd["O0.5_t1"] = odd["O0.5_t1"][0];
      odd["U1.5_t1"] = odd["U1.5_t1"][0];
      odd["O1.5_t1"] = odd["O1.5_t1"][0];
      odd["U2.5_t1"] = odd["U2.5_t1"][0];
      odd["O2.5_t1"] = odd["O2.5_t1"][0];
      odd["U3.5_t1"] = odd["U3.5_t1"][0];
      odd["O3.5_t1"] = odd["O3.5_t1"][0];
      odd["U0.5_t2"] = odd["U0.5_t2"][0];
      odd["O0.5_t2"] = odd["O0.5_t2"][0];
      odd["U1.5_t2"] = odd["U1.5_t2"][0];
      odd["O1.5_t2"] = odd["O1.5_t2"][0];
      odd["U2.5_t2"] = odd["U2.5_t2"][0];
      odd["O2.5_t2"] = odd["O2.5_t2"][0];
      odd["U3.5_t2"] = odd["U3.5_t2"][0];
      odd["O3.5_t2"] = odd["O3.5_t2"][0];
      odd["O3.5_t2"] = odd["O3.5_t2"][0];
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { fetchHistory }