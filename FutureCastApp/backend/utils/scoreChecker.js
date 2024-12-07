const scoreChecker = (user) => {
  let score = 0;
  const predictions = user.predictions.length;
  const successfulPredictions = user.successfulPredictions.length;
  score += predictions + successfulPredictions * 10;
  return score;
};

module.exports = scoreChecker;
