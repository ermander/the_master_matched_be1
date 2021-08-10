const checkComplementary = (oddType, history, odds, home, away, bookOne) => {
  
  // if(s for normal markets
  if (oddType === ("1" || "x" || "2")) {
    const oneHistory = history["1"];
    const xHistory = history["x"];
    const twoHistory = history["2"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );

    let one = matches.filter((match) => match.odd_one_type === "1");
    let x = matches.filter((match) => match.odd_one_type === "x");
    let two = matches.filter((match) => match.odd_one_type === "2");
    one = one[0]["odd_one"];
    x = x[0]["odd_one"];
    two = two[0]["odd_one"];
    return {
      oneHistory,
      xHistory,
      twoHistory,
      one,
      x,
      two,
      infoType: "1X2",
    };
  }

  if (oddType === ("goal" || "noGoal")) {
    const goalHistory = history["goal"];
    const noGoalHistory = history["noGoal"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let goal = matches.filter((match) => match.odd_one_type === "goal");
    let noGoal = matches.filter((match) => match.odd_one_type === "no goal");
    goal = goal[0]["odd_one"];
    noGoal = noGoal[0]["odd_one"];

    return {
      goalHistory,
      noGoalHistory,
      goal,
      noGoal,
      infoType: "GG/NG",
    };
  }

  if (oddType === ("U0.5" || "O0.5")) {
    const underHistory = history["U0.5"];
    const overHistory = history["O0.5"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let under = matches.filter((match) => match.odd_one_type === "U0.5");
    let over = matches.filter((match) => match.odd_one_type === "O0.5");
    under = under[0]["odd_one"];
    over = over[0]["odd_one"];

    return {
      underHistory,
      overHistory,
      under,
      over,
      infoType: "U/0",
    };
  }

  if (oddType === ("U1.5" || "O1.5")) {
    const underHistory = history["U1.5"];
    const overHistory = history["O1.5"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let under = matches.filter((match) => match.odd_one_type === "U1.5");
    let over = matches.filter((match) => match.odd_one_type === "O1.5");
    under = under[0]["odd_one"];
    over = over[0]["odd_one"];
    return {
      underHistory,
      overHistory,
      under,
      over,
      infoType: "U/0",
    };
  }

  if (oddType === ("U2.5" || "O2.5")) {
    const underHistory = history["U2.5"];
    const overHistory = history["O2.5"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let under = matches.filter((match) => match.odd_one_type === "U2.5");
    let over = matches.filter((match) => match.odd_one_type === "O2.5");
    under = under[0]["odd_one"];
    over = over[0]["odd_one"];
    return {
      underHistory,
      overHistory,
      under,
      over,
      infoType: "U/0",
    };
  }

  if (oddType === ("U3.5" || "O3.5")) {
    const underHistory = history["U3.5"];
    const overHistory = history["O3.5"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let under = matches.filter((match) => match.odd_one_type === "U3.5");
    let over = matches.filter((match) => match.odd_one_type === "O3.5");
    under = under[0]["odd_one"];
    over = over[0]["odd_one"];
    return {
      underHistory,
      overHistory,
      under,
      over,
      infoType: "U/0",
    };
  }

  // if(s for first time markets
  if (oddType === ("1_t1" || "x_t1" || "2_t1")) {
    const oneHistory = history["1_t1"];
    const xHistory = history["x_t1"];
    const twoHistory = history["2_t1"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let one = matches.filter((match) => match.odd_one_type === "1");
    let x = matches.filter((match) => match.odd_one_type === "x");
    let two = matches.filter((match) => match.odd_one_type === "2");
    one = one[0]["odd_one"];
    x = x[0]["odd_one"];
    two = two[0]["odd_one"];
    return {
      oneHistory,
      xHistory,
      twoHistory,
      one,
      x,
      two,
      infoType: "1X2",
    };
  }

  if (oddType === ("goal_t1" || "noGoal_t1")) {
    const goalHistory = history["goal_t1"];
    const noGoalHistory = history["noGoal_t1"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let goal = matches.filter((match) => match.odd_one_type === "goal_t1");
    let noGoal = matches.filter((match) => match.odd_one_type === "no goal_t1");
    goal = goal[0]["odd_one"];
    noGoal = noGoal[0]["odd_one"];

    return {
      goalHistory,
      noGoalHistory,
      goal,
      noGoal,
      infoType: "GG/NG",
    };
  }

  if (oddType === ("U0.5_t1" || "O0.5_t1")) {
    const underHistory = history["U0.5_t1"];
    const overHistory = history["O0.5_t1"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let under = matches.filter((match) => match.odd_one_type === "U0.5_t1");
    let over = matches.filter((match) => match.odd_one_type === "O0.5_t1");
    under = under[0]["odd_one"];
    over = over[0]["odd_one"];
    return {
      underHistory,
      overHistory,
      under,
      over,
      infoType: "U/0",
    };
  }

  if (oddType === ("U1.5_t1" || "O1.5_t1")) {
    const underHistory = history["U1.5_t1"];
    const overHistory = history["O1.5_t1"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let under = matches.filter((match) => match.odd_one_type === "U1.5_t1");
    let over = matches.filter((match) => match.odd_one_type === "O1.5_t1");
    under = under[0]["odd_one"];
    over = over[0]["odd_one"];
    return {
      underHistory,
      overHistory,
      under,
      over,
      infoType: "U/0",
    };
  }

  if (oddType === ("U2.5_t1" || "O2.5_t1")) {
    const underHistory = history["U2.5_t1"];
    const overHistory = history["O2.5_t1"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let under = matches.filter((match) => match.odd_one_type === "U2.5_t1");
    let over = matches.filter((match) => match.odd_one_type === "O2.5_t1");
    under = under[0]["odd_one"];
    over = over[0]["odd_one"];
    return {
      underHistory,
      overHistory,
      under,
      over,
      infoType: "U/0",
    };
  }

  if (oddType === ("U3.5_t1" || "O3.5_t1")) {
    const underHistory = history["U3.5_t1"];
    const overHistory = history["O3.5_t1"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let under = matches.filter((match) => match.odd_one_type === "U3.5_t1");
    let over = matches.filter((match) => match.odd_one_type === "O3.5_t1");
    under = under[0]["odd_one"];
    over = over[0]["odd_one"];
    return {
      underHistory,
      overHistory,
      under,
      over,
      infoType: "U/0",
    };
  }
  // if(s for second time markets
  if (oddType === ("1_t2" || "x_t2" || "2_t2")) {
    const oneHistory = history["1_t2"];
    const xHistory = history["x_t2"];
    const twoHistory = history["2_t2"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let one = matches.filter((match) => match.odd_one_type === "1_t2");
    let x = matches.filter((match) => match.odd_one_type === "x_t2");
    let two = matches.filter((match) => match.odd_one_type === "2_t2");
    one = one[0]["odd_one"];
    x = x[0]["odd_one"];
    two = two[0]["odd_one"];
    return {
      oneHistory,
      xHistory,
      twoHistory,
      one,
      x,
      two,
      infoType: "1X2",
    };
  }

  if (oddType === ("goal_t2" || "noGoal_t2")) {
    const goalHistory = history["goal_t2"];
    const noGoalHistory = history["noGoal_t2"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let goal = matches.filter((match) => match.odd_one_type === "goal_t2");
    let noGoal = matches.filter((match) => match.odd_one_type === "no goal_t2");
    goal = goal[0]["odd_one"];
    noGoal = noGoal[0]["odd_one"];
    return {
      goalHistory,
      noGoalHistory,
      goal,
      noGoal,
      infoType: "GG/NG",
    };
  }

  if (oddType === ("U0.5_t2" || "O0.5_t2")) {
    const underHistory = history["U0.5_t2"];
    const overHistory = history["O0.5_t2"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let under = matches.filter((match) => match.odd_one_type === "U0.5_t2");
    let over = matches.filter((match) => match.odd_one_type === "O0.5_t2");
    under = under[0]["odd_one"];
    over = over[0]["odd_one"];
    return {
      underHistory,
      overHistory,
      under,
      over,
      infoType: "U/0",
    };
  }

  if (oddType === ("U1.5_t2" || "O1.5_t2")) {
    const underHistory = history["U1.5_t2"];
    const overHistory = history["O1.5_t2"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let under = matches.filter((match) => match.odd_one_type === "U1.5_t2");
    let over = matches.filter((match) => match.odd_one_type === "O1.5_t2");
    under = under[0]["odd_one"];
    over = over[0]["odd_one"];
    return {
      underHistory,
      overHistory,
      under,
      over,
      infoType: "U/0",
    };
  }

  if (oddType === ("U2.5_t2" || "O2.5_t2")) {
    const underHistory = history["U2.5_t2"];
    const overHistory = history["O2.5_t2"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let under = matches.filter((match) => match.odd_one_type === "U2.5_t2");
    let over = matches.filter((match) => match.odd_one_type === "O2.5_t2");
    under = under[0]["odd_one"];
    over = over[0]["odd_one"];
    return {
      underHistory,
      overHistory,
      under,
      over,
      infoType: "U/0",
    };
  }
  if (oddType === ("U3.5_t2" || "O3.5_t2")) {
    const underHistory = history["U3.5_t2"];
    const overHistory = history["O3.5_t2"];
    const matches = odds.filter(
      (odd) =>
        odd.home === home && odd.away === away && odd.book_one === bookOne
    );
    let under = matches.filter((match) => match.odd_one_type === "U3.5_t2");
    let over = matches.filter((match) => match.odd_one_type === "O3.5_t2");
    under = under[0]["odd_one"];
    over = over[0]["odd_one"];
    return {
      underHistory,
      overHistory,
      under,
      over,
      infoType: "U/0",
    };
  }
};

module.exports = { checkComplementary }