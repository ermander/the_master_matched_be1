const { checkComplementary } = require("./checkComplementary");

const setComplementaryData = (odds, history) => {
  try {
    odds = odds.map((odd) => {
      const rawInfo = history.filter(
        (info) => info.univoca === `${odd.home}${odd.away}${odd.book_one}`
      );

      if (rawInfo !== undefined) {
        let data = rawInfo[0][odd.odd_one_type];
        data === undefined ? (data = "Non Disponibile") : (data = data);
        let complementaryData = checkComplementary(
          odd.odd_one_type,
          rawInfo[0],
          odds,
          odd.home,
          odd.away,
          odd.book_one
        );
        delete odd.historyInfo;
        return {
          ...odd,
          complementaryData: complementaryData,
        };
      } else {
        return {
          ...odd,
          complementaryData: undefined,
        };
      }
    });
    return odds
  } catch (error) {
    console.log(error);
  }
};

module.exports = { setComplementaryData };
