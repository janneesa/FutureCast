import React, { useEffect } from "react";
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
  const {
    profile,
    error: profileError,
    loading: isLoadingProfile,
  } = useFetchProfile(userId);
  const {
    predictions,
    error: predictionsError,
    loading: isLoadingPredictions,
  } = useFetchPredictions(userId);
  const { showErrorToast } = useToast();

  useEffect(() => {
    if (profileError) {
      showErrorToast(profileError);
    }
    if (predictionsError) {
      showErrorToast(predictionsError);
    }
  }, [profileError, predictionsError]);

  if (!profile) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center">
        <Loading />
      </div>
    );
  }

  if (isLoadingProfile || isLoadingPredictions) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col gap-8 items-center">
            <ProfileCard profile={profile} />
            <ScoreCard user={profile} />
          </div>
          <div className="flex justify-center">
            <ContentCard predictions={predictions} badges={profile.badges} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyProfile;
