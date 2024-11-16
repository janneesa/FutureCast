import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import Card from "../Card";

function SearchResult({ avatar, username, predictionScore, id }) {
  const { user } = useContext(UserContext);

  const [ableToFollow, setAbleToFollow] = useState(
    !user.following.includes(id)
  );

  const follow = () => {
    setAbleToFollow(false);
    user.following.push(id);
    console.log(user.following);
  };

  const unfollow = () => {
    setAbleToFollow(true);
    user.following = user.following.filter((userId) => userId !== id);
    console.log(user.following);
  };

  const navigateToProfile = () => {
    // Navigate to user profile
    console.log(`Navigating to ${username}'s profile`);
  };

  return (
    <Card className="card">
      <div className="card-content flex flex-row" onClick={navigateToProfile}>
        <img
          src={avatar}
          alt={`${username}'s avatar`}
          className="w-16 h-16 rounded-full"
        />
        <div className="ml-4">
          <h3 className="font-semibold self-center">{username}</h3>
          <h5>Prediction Score: {predictionScore}</h5>
        </div>
        <div className="self-center ml-auto">
          {ableToFollow ? (
            <button className="button" onClick={follow}>
              Follow
            </button>
          ) : (
            <button className="button button-secondary" onClick={unfollow}>
              Unfollow
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

export default SearchResult;
