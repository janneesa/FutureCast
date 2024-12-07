const badgeChecker = (user) => {
  const badges = [];

  // Prediction-Based Badges
  if (user.predictions.length >= 1) {
    badges.push({
      name: "Crystal Ball Novice",
      description: "Made your first prediction. The future awaits!",
    });
  }
  if (user.predictions.length >= 5) {
    badges.push({
      name: "Future Enthusiast",
      description: "Made 5 predictions. You're getting the hang of this!",
    });
  }
  if (user.predictions.length >= 10) {
    badges.push({
      name: "Hunch Hunter",
      description: "Made 10 predictions. Keep following your instincts.",
    });
  }
  if (user.predictions.length >= 50) {
    badges.push({
      name: "Visionary in Training",
      description: "Made 50 predictions. You're on the road to greatness!",
    });
  }
  if (user.predictions.length >= 100) {
    badges.push({
      name: "Soothsayer Extraordinaire",
      description: "Made 100 predictions. The future feels clear to you.",
    });
  }
  if (user.predictions.length >= 500) {
    badges.push({
      name: "Prophecy Master",
      description: "Made 500 predictions. A true master of foresight.",
    });
  }
  if (user.predictions.length >= 1000) {
    badges.push({
      name: "Oracle of the Ages",
      description: "Made 1000 predictions. A legendary figure of prophecy.",
    });
  }

  // Success-Based Badges
  if (user.successfulPredictions.length >= 10) {
    badges.push({
      name: "Bullseye Beginner",
      description: "Achieved 10 successful predictions. A promising start!",
    });
  }
  if (user.successfulPredictions.length >= 50) {
    badges.push({
      name: "Outcome Oracle",
      description: "Achieved 50 successful predictions. Accuracy matters!",
    });
  }
  if (user.successfulPredictions.length >= 100) {
    badges.push({
      name: "Fortune Weaver",
      description: "Achieved 100 successful predictions. Skillful insight!",
    });
  }
  if (user.successfulPredictions.length >= 500) {
    badges.push({
      name: "Probability Prodigy",
      description: "Achieved 500 successful predictions. A master of odds.",
    });
  }
  if (user.successfulPredictions.length >= 1000) {
    badges.push({
      name: "Legendary Seer",
      description: "Achieved 1000 successful predictions. Unmatched foresight.",
    });
  }

  // Follower Milestone Badges
  if (user.followers.length >= 1) {
    badges.push({
      name: "Newcomer",
      description: "Gained your first follower. Welcome to the community!",
    });
  }
  if (user.followers.length >= 10) {
    badges.push({
      name: "Trendsetter",
      description: "Gained 10 followers. You're starting to attract attention.",
    });
  }
  if (user.followers.length >= 50) {
    badges.push({
      name: "Rising Star",
      description: "Gained 50 followers. Your influence is growing.",
    });
  }
  if (user.followers.length >= 100) {
    badges.push({
      name: "Influencer",
      description: "Gained 100 followers. People are paying attention to you.",
    });
  }
  if (user.followers.length >= 500) {
    badges.push({
      name: "Local Celebrity",
      description: "Gained 500 followers. You're famous in your niche!",
    });
  }
  if (user.followers.length >= 1000) {
    badges.push({
      name: "Global Icon",
      description: "Gained 1000 followers. Your reach knows no bounds!",
    });
  }

  // Special Badges
  if (
    user.predictions.length >= 7 &&
    user.predictions.every(
      (p) => p.date >= Date.now() - 7 * 24 * 60 * 60 * 1000
    )
  ) {
    badges.push({
      name: "Consistent Visionary",
      description: "Made predictions every day for a week. Dedication pays!",
    });
  }
  if (
    user.predictions.length >= 30 &&
    user.predictions.every(
      (p) => p.date >= Date.now() - 30 * 24 * 60 * 60 * 1000
    )
  ) {
    badges.push({
      name: "Prediction Marathoner",
      description: "Made predictions every day for a month. An iron will!",
    });
  }

  // Score-Based Badges
  if (user.predictionScore >= 100) {
    badges.push({
      name: "Point Sprinter",
      description: "Reached a prediction score of 100. On your way up!",
    });
  }
  if (user.predictionScore >= 500) {
    badges.push({
      name: "Score Chaser",
      description: "Reached a prediction score of 500. Keep climbing!",
    });
  }
  if (user.predictionScore >= 1000) {
    badges.push({
      name: "Number Sage",
      description: "Reached a prediction score of 1000. Pure expertise!",
    });
  }

  // Milestone Combination Badges
  if (
    user.predictions.length >= 500 &&
    user.successfulPredictions.length >= 500
  ) {
    badges.push({
      name: "Fortune 500",
      description: "Made 500 predictions and 500 successes. Unstoppable!",
    });
  }
  if (user.followers.length >= 1000 && user.following.length >= 500) {
    badges.push({
      name: "Oracle Networker",
      description:
        "Gained 1000 followers and followed 500 people. Well-connected!",
    });
  }
  if (
    user.predictions.length >= 1000 &&
    user.successfulPredictions.length / user.predictions.length >= 0.5
  ) {
    badges.push({
      name: "Divine Predictor",
      description:
        "Made 1000 predictions with at least 50% success rate. Divine skills!",
    });
  }

  return badges;
};

module.exports = badgeChecker;
