import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Card from "../Card";
import FollowModal from "./FollowModal";

const ProfileCard = ({ user }) => {
  const { user: currentUser, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = currentUser._id === user._id;

  useEffect(() => {
    setIsFollowing(currentUser.following.includes(user._id));
  }, [user]);

  // Helper to update followers/following in backend
  const updateUserList = async (targetUserId, listName, updatedList) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/users/${targetUserId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ [listName]: updatedList }),
        }
      );
      if (!response.ok) throw new Error(await response.text());
      return response.json();
    } catch (error) {
      console.error(`Error updating ${listName}: ${error.message}`);
      return null;
    }
  };

  const toggleFollow = async () => {
    const newFollowers = isFollowing
      ? user.followers.filter((id) => id !== currentUser._id)
      : [...user.followers, currentUser._id];
    const updatedUser = await updateUserList(
      user._id,
      "followers",
      newFollowers
    );

    if (updatedUser) {
      setIsFollowing(!isFollowing);
      const newFollowing = isFollowing
        ? currentUser.following.filter((id) => id !== user._id)
        : [...currentUser.following, user._id];
      const updatedCurrentUser = await updateUserList(
        currentUser._id,
        "following",
        newFollowing
      );

      if (updatedCurrentUser) setUser(updatedCurrentUser);
    }
  };

  return (
    <Card>
      <div className="card-content flex flex-col items-center p-4">
        {/* Profile Image */}
        <img
          src={user.avatar}
          alt={`${user.name}'s avatar`}
          className="w-24 h-24 rounded-full mb-4"
        />
        {/* Name and Username */}
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-muted-foreground">@{user.username}</p>
        <p className="text-center mt-4">{user.bio}</p>

        {/* Stats */}
        <div className="flex justify-between w-full mt-6">
          {[
            {
              label: "Followers",
              value: user.followers.length,
              onClick: () => setIsFollowersModalOpen(true),
            },
            {
              label: "Following",
              value: user.following.length,
              onClick: () => setIsFollowingModalOpen(true),
            },
            { label: "Predictions", value: user.predictions.length },
          ].map(({ label, value, onClick }, index) => (
            <div
              key={index}
              className="text-center cursor-pointer"
              onClick={onClick}
            >
              <p className="font-bold">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {isOwnProfile ? (
          <button
            className="button mt-4"
            onClick={() => navigate("/app/settings")}
          >
            Edit Profile
          </button>
        ) : (
          <button
            className={`button mt-4 ${isFollowing ? "button-secondary" : ""}`}
            onClick={toggleFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        )}
      </div>

      {/* Modals */}
      {isFollowersModalOpen && (
        <FollowModal
          list={user.followers}
          onClose={() => setIsFollowersModalOpen(false)}
        />
      )}
      {isFollowingModalOpen && (
        <FollowModal
          list={user.following}
          onClose={() => setIsFollowingModalOpen(false)}
        />
      )}
    </Card>
  );
};

export default ProfileCard;
