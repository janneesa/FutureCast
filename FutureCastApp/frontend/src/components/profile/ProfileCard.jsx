import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Card from "../Card";

/**
 * ProfileCard component renders a user's profile card with actions to follow/unfollow or edit the profile.
 *
 * @param {Object} props - Component props
 * @param {Object} props.user - User data to display in the profile card
 */
const ProfileCard = ({ user }) => {
  const { user: currentUser, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const isOwnProfile = currentUser._id === user._id;
  const [isFollowing, setIsFollowing] = useState(
    currentUser.following.includes(user._id)
  );

  // Navigate to profile editing page
  const handleEditProfile = () => navigate("/app/settings");

  /**
   * Helper to update followers/following lists in the backend.
   * @param {string} targetUserId - The ID of the user to follow/unfollow.
   * @param {string} listName - The list to update ('followers' or 'following').
   * @param {Array<string>} updatedList - The updated list of user IDs.
   */
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

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Failed to update ${listName}: ${errorData.message}`);
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating ${listName}: ${error.message}`);
      return null;
    }
  };

  // Follow the user
  const handleFollow = async () => {
    const newFollowers = [...user.followers, currentUser._id];
    const updatedUser = await updateUserList(
      user._id,
      "followers",
      newFollowers
    );

    if (updatedUser) {
      setIsFollowing(true);
      const newFollowing = [...currentUser.following, user._id];
      const updatedCurrentUser = await updateUserList(
        currentUser._id,
        "following",
        newFollowing
      );

      if (updatedCurrentUser) setUser(updatedCurrentUser);
    }
  };

  const handleUnfollow = async () => {
    const newFollowers = user.followers.filter(
      (followerId) => followerId !== currentUser._id
    );
    const updatedUser = await updateUserList(
      user._id,
      "followers",
      newFollowers
    );

    if (updatedUser) {
      setIsFollowing(false);
      const newFollowing = currentUser.following.filter(
        (followingId) => followingId !== user._id
      );
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
          src={user?.avatar}
          alt={`${user?.name}'s avatar`}
          className="w-24 h-24 rounded-full mb-4"
        />

        {/* Name and Username */}
        <h2 className="text-2xl font-bold">{user?.name}</h2>
        <p className="text-muted-foreground">@{user?.username}</p>
        <p className="text-center mt-4">{user?.bio}</p>

        {/* Stats */}
        <div className="flex justify-between w-full mt-6">
          {[
            { label: "Followers", value: user?.followers.length },
            { label: "Following", value: user?.following.length },
            { label: "Predictions", value: user?.predictions.length },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
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
    </Card>
  );
};

export default ProfileCard;
