import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Card from "../Card";
import Loading from "../Loading";
import useToast from "../../hooks/useToast";
import useSettings from "../../hooks/useSettings";

function ProfileSettings() {
  const { user } = useContext(UserContext); // Access user from the useSettings hook
  const { updateSettings, error, okMessage } = useSettings(); // For updating settings
  const { showSuccessToast, showErrorToast } = useToast();

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  // Populate user details into state
  useEffect(() => {
    if (user) {
      setAvatar(user.avatar || "");
      setName(user.name || "");
      setUsername(user.username || "");
      setBio(user.bio || "");
    }
  }, [user]);

  const changeAvatar = () => {
    // Logic for changing avatar (to be implemented as needed)
  };

  const saveChanges = () => {
    if (name.trim() === "" || username.trim() === "" || bio.trim() === "") {
      showErrorToast("Please fill all fields");
      return;
    }

    const updatedData = {
      userId: user._id,
      name,
      username,
      bio,
    };

    updateSettings(updatedData); // Call the hook to update settings
  };

  useEffect(() => {
    if (okMessage) {
      showSuccessToast(okMessage);
    }
  }, [okMessage]);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  if (!user) {
    return <Loading />; // Show loading indicator while user data is unavailable
  }

  return (
    <Card>
      <div className="card-header">
        <h2>Profile Information</h2>
        <p>Update your profile details here</p>
      </div>
      <div className="card-content">
        {/* Avatar Section */}
        <div className="flex items-center justify-evenly">
          <img
            src={avatar}
            alt={name}
            className="w-24 h-24 rounded-full mb-4"
          />
          <div>
            <button className="button" onClick={changeAvatar}>
              Change Avatar
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder={user.name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              placeholder={user.username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={bio}
              placeholder={user.bio}
              onChange={(e) => setBio(e.target.value)}
              className="input h-24 resize-none"
            />
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="mt-4 w-32">
          <button className="button" onClick={saveChanges}>
            Save Changes
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ProfileSettings;
