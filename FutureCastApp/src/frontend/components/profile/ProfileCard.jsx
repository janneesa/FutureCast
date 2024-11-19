import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Card from "../Card";

function ProfileCard({ user }) {
  const { user: currentUser, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const isOwnProfile = currentUser.id === user.id;
  const [isFollowing, setIsFollowing] = useState(
    currentUser.following.includes(user.id)
  );

  const handleEditProfile = () => {
    navigate("/app/settings");
  };

  const handleFollow = () => {
    setIsFollowing(true);
    setUser((prevUser) => ({
      ...prevUser,
      following: [...prevUser.following, user.id],
    }));
  };

  const handleUnfollow = () => {
    setIsFollowing(false);
    setUser((prevUser) => ({
      ...prevUser,
      following: prevUser.following.filter((id) => id !== user.id),
    }));
  };

  return (
    <Card>
      <div className="card-content">
        <div className="flex flex-col items-center p-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="w-24 h-24 rounded-full mb-4"
          />
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-muted-foreground">{user?.username}</p>
          <p className="text-center mt-4">{user?.bio}</p>
          <div className="flex justify-between w-full mt-6">
            <div className="text-center">
              <p className="font-bold">{user?.followers.length}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user?.following.length}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
            <div className="text-center">
              <p className="font-bold">{user?.predictions.length}</p>
              <p className="text-sm text-muted-foreground">Predictions</p>
            </div>
          </div>
          {isOwnProfile ? (
            <button className="button mt-4" onClick={handleEditProfile}>
              Edit Profile
            </button>
          ) : isFollowing ? (
            <button className="button-secondary mt-4" onClick={handleUnfollow}>
              Unfollow
            </button>
          ) : (
            <button className="button mt-4" onClick={handleFollow}>
              Follow
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}

export default ProfileCard;
