import React, { useEffect, useState, useContext } from "react";
import ProfileCard from "./ProfileCard";
import ScoreCard from "./ScoreCard";
import ContentCard from "./ContentCard";
import Loading from "../Loading";

import { UserContext } from "../context/UserContext";

import { mockData } from "../../data/MockData";

function Profile() {
  const { user } = useContext(UserContext);
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
    if (user) {
      fetchPredictions();
    }
  }, [user]);

  if (!user) {
    return <Loading></Loading>; // Fallback UI while user data is being loaded
  }

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
          <div className="flex justify-center">
            <ContentCard predictions={predictions} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
