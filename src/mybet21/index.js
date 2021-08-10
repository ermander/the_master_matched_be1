const express = require("express");
const router = express.Router();

// Functions
const { fetchOdds } = require("./functions/fetchOdds");
const { fetchHistory } = require("./functions/fetchHistory");
const { setComplementaryData } = require("./functions/setComplementaryData");

// Oddsmatcher Odds
router.get("/oddsmatcher", async (req, res) => {
  try {
    // Fetching odds data and odds history data
    let odds = await fetchOdds();
    let history = await fetchHistory();

    // Adding adding history info to the odds
    odds = setComplementaryData(odds, history);

    // Deleting odds without data, nation or tournament
    odds = odds.filter((odd) => odd.start_date !== undefined);
    odds = odds.filter((odd) => odd.nation !== undefined);
    odds = odds.filter((odd) => odd.tournament !== undefined);

    odds = odds.map((odd) => {
      const bet = 100;
      const commission = 0.05;
      const layStake =
        (parseFloat(odd.odd_one) * bet) /
        (parseFloat(odd.odd_two) - commission);
      const rawRating = (1 - commission) * layStake;
      const rating = rawRating.toFixed(2);
      delete odd.roi;
      return {
        ...odd,
        tableRoi: rating + "%",
        roi: rating,
      };
    });
    odds.sort((a, b) => {
      return b.roi - a.roi;
    });
    odds = odds.slice(0, 500);
    console.log(odds.length);
    res.status(200).send(odds);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

router.post("/prova", async (req, res) => {
  try {
    const options = req.body;
    console.log(options);
    // Fetching odds data and odds history data
    let odds = await fetchOdds();
    let history = await fetchHistory();

    // Adding adding history info to the odds
    odds = setComplementaryData(odds, history);

    // Deleting odds without data, nation or tournament
    odds = odds.filter((odd) => odd.start_date !== undefined);
    odds = odds.filter((odd) => odd.nation !== undefined);
    odds = odds.filter((odd) => odd.tournament !== undefined);

    let filteredOdds = [];
    // Filtering by market
    // ALL TIME MARKETS
    if (options.allMarkets) {
      let oneXTwo = odds.filter((odd) => odd.market === "1X2");
      let underOver = odds.filter((odd) => odd.market === "U/O");
      let goalNogoal = odds.filter((odd) => odd.market === "GG/NG");
      filteredOdds = filteredOdds
        .concat(oneXTwo)
        .concat(underOver)
        .concat(goalNogoal);
    } else {
      if (options.oneXTwo) {
        let addOdds = odds.filter((odd) => odd.market === "1X2");
        filteredOdds = filteredOdds.concat(addOdds);
      }
      if (options.underOver) {
        let addOdds = odds.filter((odd) => odd.market === "U/O");
        filteredOdds = filteredOdds.concat(addOdds);
      }
      if (options.goalNogoal) {
        let addOdds = odds.filter((odd) => odd.market === "GG/NG");
        filteredOdds = filteredOdds.concat(addOdds);
      }
    }
    // FIRST TIME MARKETS
    if (options.allMarketsFirstTime) {
      let oneXTwo = odds.filter((odd) => odd.market === "1X2_t1");
      let underOver = odds.filter((odd) => odd.market === "U/O_t1");
      let goalNogoal = odds.filter((odd) => odd.market === "GG/NG_t1");
      filteredOdds = filteredOdds
        .concat(oneXTwo)
        .concat(underOver)
        .concat(goalNogoal);
    } else {
      if (options.oneXTwoFirstTime) {
        let addOdds = odds.filter((odd) => odd.market === "1X2_t1");
        filteredOdds = filteredOdds.concat(addOdds);
      }
      if (options.underOverFirstTime) {
        let addOdds = odds.filter((odd) => odd.market === "U/O_t1");
        filteredOdds = filteredOdds.concat(addOdds);
      }
      if (options.goalNogoalFirstTime) {
        let addOdds = odds.filter((odd) => odd.market === "GG/NG_t1");
        filteredOdds = filteredOdds.concat(addOdds);
      }
    }
    // SECOND TIME MARKETS
    if (options.allMarketsSecondTime) {
      let oneXTwo = odds.filter((odd) => odd.market === "1X2_t2");
      let underOver = odds.filter((odd) => odd.market === "U/O_t2");
      let goalNogoal = odds.filter((odd) => odd.market === "GG/NG_t2");
      filteredOdds = filteredOdds
        .concat(oneXTwo)
        .concat(underOver)
        .concat(goalNogoal);
    } else {
      if (options.oneXTwoSecondTime) {
        let addOdds = odds.filter((odd) => odd.market === "1X2_t2");
        filteredOdds = filteredOdds.concat(addOdds);
      }
      if (options.underOverSecondTime) {
        let addOdds = odds.filter((odd) => odd.market === "U/O_t2");
        filteredOdds = filteredOdds.concat(addOdds);
      }
      if (options.goalNogoalSecondTime) {
        let addOdds = odds.filter((odd) => odd.market === "GG/NG_t2");
        filteredOdds = filteredOdds.concat(addOdds);
      }
    }
    if (
      options.allMarkets === undefined ||
      options.allMarketsFirstTime === undefined ||
      options.allMarketsSecondTime === undefined
    ) {
      filteredOdds = filteredOdds.concat(odds);
    }

    // Filtering by Min and Max odd
    if (options.minOdd) {
      filteredOdds = filteredOdds.filter(
        (odd) => parseFloat(odd.odd_one) >= options.minOdd
      );
    }
    if (options.maxOdd) {
      filteredOdds = filteredOdds.filter(
        (odd) => parseFloat(odd.odd_one) <= options.maxOdd
      );
    }

    // Filtering by first bookmaker
    if (options.firstBookmaker !== "Bookmakers") {
      if (options.firstBookmaker === "MacaoWin") {
        filteredOdds = filteredOdds.filter((odd) => odd.book_one === "macao");
      }
      if (options.firstBookmaker === "SirPlay") {
        filteredOdds = filteredOdds.filter((odd) => odd.book_one === "sirplay");
      }
    }
    filteredOdds = filteredOdds.map((odd) => {
      const bet = 100;
      const commission = 0.05;
      const layStake =
        (parseFloat(odd.odd_one) * bet) /
        (parseFloat(odd.odd_two) - commission);
      const rawRating = (1 - commission) * layStake;
      const rating = rawRating.toFixed(2);
      delete odd.roi;
      return {
        ...odd,
        tableRoi: rating + "%",
        roi: rating,
      };
    });
    filteredOdds.sort((a, b) => {
      return b.roi - a.roi;
    });
    filteredOdds = filteredOdds.slice(0, 500);
    console.log(filteredOdds.length);
    res.status(200).send(filteredOdds);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
