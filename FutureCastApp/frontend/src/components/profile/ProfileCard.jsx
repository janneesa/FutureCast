import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Card from "../Card";
import FollowModal from "./FollowModal";

import useToast from "../../hooks/useToast";

const ProfileCard = ({ profile }) => {
  const { user, setUser } = useContext(UserContext);
  const [profileFollowers, setProfileFollowers] = useState(
    profile.followers || []
  );
  const [profileFollowing, setProfileFollowing] = useState(
    profile.following || []
  );
  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);
  const [isFollowing, setIsFollowing] = useState(
    user.following.includes(profile._id)
  );
  const navigate = useNavigate();
  const { showErrorToast, showSuccessToast } = useToast();
  const isOwnProfile = user._id === profile._id;

  // Update isFollowing when user or profile changes
  useEffect(() => {
    setIsFollowing(user.following.includes(profile._id));
  }, [user, profile]);

  // Sync profileFollowers and profileFollowing when profile changes
  useEffect(() => {
    setProfileFollowers(profile.followers || []);
    setProfileFollowing(profile.following || []);
  }, [profile]);

  const toggleFollow = async () => {
    const token = user.token;

    try {
      const newFollowingState = !isFollowing;
      const userUpdateUrl = `/api/users/${user._id}`;
      const profileUpdateUrl = `/api/users/${profile._id}`;

      // Prepare request bodies
      const updatedUserFollowing = newFollowingState
        ? [...user.following, profile._id]
        : user.following.filter((id) => id !== profile._id);

      const updatedProfileFollowers = newFollowingState
        ? [...profileFollowers, user._id]
        : profileFollowers.filter((id) => id !== user._id);

      // Make API calls simultaneously with token authentication
      const [userResponse, profileResponse] = await Promise.all([
        fetch(userUpdateUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token here
          },
          body: JSON.stringify({ following: updatedUserFollowing }),
        }),
        fetch(profileUpdateUrl, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token here
          },
          body: JSON.stringify({ followers: updatedProfileFollowers }),
        }),
      ]);

      // Check responses
      if (!userResponse.ok) {
        const userError = await userResponse.json();
        showErrorToast(userError.message || "Unknown error");
        throw new Error(
          `User update failed: ${userError.message || "Unknown error"}`
        );
      }

      if (!profileResponse.ok) {
        const profileError = await profileResponse.json();
        showErrorToast(profileError.message || "Unknown error");
        throw new Error(
          `Profile update failed: ${profileError.message || "Unknown error"}`
        );
      }

      // Parse responses
      const updatedUser = await userResponse.json();
      const updatedProfile = await profileResponse.json();

      // Update states
      setUser({ ...updatedUser, token });
      setProfileFollowers(updatedProfile.followers);
      setIsFollowing(newFollowingState);

      // Show success message
      showSuccessToast(
        newFollowingState
          ? `You are now following ${profile.name}.`
          : `You have unfollowed ${profile.name}.`
      );
    } catch (error) {
      console.error(`Error toggling follow: ${error.message}`);
      showErrorToast(`An error occurred: ${error.message}`);
    }
  };

  return (
    <Card>
      <div className="card-content flex flex-col items-center p-4">
        {/* Profile Image */}
        <img
          src={profile.avatar}
          alt={`${profile.name}'s avatar`}
          className="w-24 h-24 rounded-full mb-4"
        />
        {/* Name and Username */}
        <h2 className="text-2xl font-bold">{profile.name}</h2>
        <p className="text-muted-foreground">@{profile.username}</p>
        <p className="text-center mt-4">{profile.bio}</p>

        {/* Stats */}
        <div className="flex justify-between w-full mt-6">
          {[
            {
              label: "Followers",
              value: profileFollowers.length,
              onClick: () => setIsFollowersModalOpen(true),
            },
            {
              label: "Following",
              value: profileFollowing.length,
              onClick: () => setIsFollowingModalOpen(true),
            },
            { label: "Predictions", value: profile.predictions.length },
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
          list={profileFollowers}
          onClose={() => setIsFollowersModalOpen(false)}
        />
      )}
      {isFollowingModalOpen && (
        <FollowModal
          list={profileFollowing}
          onClose={() => setIsFollowingModalOpen(false)}
        />
      )}
    </Card>
  );
};

export default ProfileCard;
