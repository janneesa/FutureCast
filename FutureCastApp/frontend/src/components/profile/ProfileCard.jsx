import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Card from "../Card";
import FollowModal from "./FollowModal";

import useToast from "../../hooks/useToast";
import useNotifications from "../../hooks/useNotifications";

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
    user.following.includes(profile.id)
  );
  const navigate = useNavigate();
  const { showPromiseToast } = useToast();
  const { addNotification } = useNotifications();
  const isOwnProfile = user.id === profile.id;

  // Update isFollowing when user or profile changes
  useEffect(() => {
    setIsFollowing(user.following.includes(profile.id));
  }, [user, profile]);

  // Sync profileFollowers and profileFollowing when profile changes
  useEffect(() => {
    setProfileFollowers(profile.followers || []);
    setProfileFollowing(profile.following || []);
  }, [profile]);

  const toggleFollow = async () => {
    const token = user.token;

    const toggleFollowPromise = new Promise(async (resolve, reject) => {
      try {
        const newFollowingState = !isFollowing;
        const userUpdateUrl = `/api/users/${user.id}`;
        const profileUpdateUrl = `/api/users/${profile.id}`;

        // Prepare request bodies
        const updatedUserFollowing = newFollowingState
          ? [...user.following, profile.id]
          : user.following.filter((id) => id !== profile.id);

        const updatedProfileFollowers = newFollowingState
          ? [...profileFollowers, user.id]
          : profileFollowers.filter((id) => id !== user.id);

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
        if (!userResponse.ok || !profileResponse.ok) {
          const userError = !userResponse.ok ? await userResponse.json() : null;
          const profileError = !profileResponse.ok
            ? await profileResponse.json()
            : null;

          const errorMessage =
            userError?.message ||
            profileError?.message ||
            "Unknown error occurred.";
          reject(new Error(errorMessage));
          return;
        }

        // Parse responses
        const updatedUser = await userResponse.json();
        const updatedProfile = await profileResponse.json();

        // Update states
        setUser({ ...updatedUser, token });
        setProfileFollowers(updatedProfile.followers);
        setIsFollowing(newFollowingState);

        resolve(
          newFollowingState
            ? `You are now following ${profile.name}.`
            : `You have unfollowed ${profile.name}.`
        );

        // Add notification to profile
        await addNotification(
          profile.id,
          `${user.username} ${
            newFollowingState ? "started following" : "unfollowed"
          } you.`
        );
      } catch (error) {
        reject(new Error(`Error toggling follow: ${error.message}`));
      }
    });

    // Display promise toast
    showPromiseToast(toggleFollowPromise, {
      loading: "Updating follow status...",
      success: (message) => message,
      error: (error) => error.message,
    });
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
