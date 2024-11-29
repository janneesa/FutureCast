import React from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../profile/ProfileCard";
import ScoreCard from "../profile/ScoreCard";
import ContentCard from "../profile/ContentCard";
import Loading from "../Loading";

import useFetchProfile from "../../hooks/useFetchProfile";
import useFetchPredictions from "../../hooks/useFetchPredictions";

const SearchProfile = () => {
  const { id } = useParams();
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useFetchProfile(id);
  const {
    predictions,
    loading: predictionsLoading,
    error: predictionsError,
  } = useFetchPredictions(id);

  if (profileLoading || predictionsLoading) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center">
        <Loading />
      </div>
    );
  }

  if (profileError || predictionsError) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center">
        <p className="text-red-500">{profileError || predictionsError}</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center">
        <p className="text-secondaryText">User not found.</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
        <div className="flex flex-col gap-8 justify-center items-center">
          <ProfileCard user={profile} />
          <ScoreCard user={profile} />
        </div>
        <div className="flex justify-center">
          <ContentCard predictions={predictions} />
        </div>
      </div>
    </main>
  );
};

export default SearchProfile;
