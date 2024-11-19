import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { mockData } from "../../data/MockData";
import { useNavigate } from "react-router-dom";
import ProfileCard from "./ProfileCard";
import ScoreCard from "./ScoreCard";
import ContentCard from "./ContentCard";
import Loading from "../Loading";

function Profile({ profile }) {
  const { user } = useContext(UserContext);
  const [predictions, setPredictions] = useState([]);

  // Call backend that fetches users predictions.
  const fetchPredictions = async (userId) => {
    const fetchedPredictions = mockData.predictions;
    const userPredictions = fetchedPredictions.filter(
      (prediction) => prediction.userId === userId
    );
    setPredictions(userPredictions);
  };

  useEffect(() => {
    if (profile) {
      fetchPredictions(profile.id);
    } else if (user) {
      fetchPredictions(user.id);
    }
  }, [profile, user]);

  if (!user && !profile) {
    return <Loading />; // Fallback UI while user data is being loaded
  }

  const displayedProfile = profile || user;

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col gap-8 justify-center items-center">
            {/* Profile Card */}
            <ProfileCard user={displayedProfile} />

            {/* Stats */}
            <ScoreCard user={displayedProfile} />
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
