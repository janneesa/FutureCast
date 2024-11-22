import React, { useEffect, useState } from "react";
import ProfileCard from "../profile/ProfileCard";
import ScoreCard from "../profile/ScoreCard";
import ContentCard from "../profile/ContentCard";

import { mockData } from "../../data/MockData";

function ProfileResult({ user }) {
  const [predictions, setPredictions] = useState([]);

  // Call backend that fetches users predictions.
  const fetchPredictions = async () => {
    const fetchedPredictions = mockData.predictions;
    const userPredictions = fetchedPredictions.filter(
      (prediction) => prediction.userId === user.id
    );
    setPredictions(userPredictions);
  };

  useEffect(() => {
    fetchPredictions();
  }, [user]);

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col gap-8 justify-center items-center">
            {/* Profile Card */}
            <ProfileCard user={user} />
            {/* Stats */}
            <ScoreCard user={user} />
          </div>
          {/* Predictions and Badges */}
          <ContentCard predictions={predictions} />
        </div>
      </main>
    </div>
  );
}

export default ProfileResult;
