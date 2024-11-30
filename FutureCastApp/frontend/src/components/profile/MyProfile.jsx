import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";

import ProfileCard from "./ProfileCard";
import ScoreCard from "./ScoreCard";
import ContentCard from "./ContentCard";
import Loading from "../Loading";

import useFetchProfile from "../../hooks/useFetchProfile";
import useFetchPredictions from "../../hooks/useFetchPredictions";
import useToast from "../../hooks/useToast";

const MyProfile = () => {
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const { profile, error: profileError } = useFetchProfile(userId);
  const { predictions, error: predictionsError } = useFetchPredictions(userId);
  const { showErrorToast } = useToast();

  useEffect(() => {
    if (profileError) {
      showErrorToast(profileError);
    }
    if (predictionsError) {
      showErrorToast(predictionsError);
    }
  }, [profileError, predictionsError]);

  if (!user && !profile) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center">
        <Loading />
      </div>
    );
  }

  const displayedProfile = profile || user;

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col gap-8 justify-center items-center">
            <ProfileCard user={displayedProfile} />
            <ScoreCard user={displayedProfile} />
          </div>
          <div className="flex justify-center">
            <ContentCard predictions={predictions} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfile;
