import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

import Card from "../Card";
import Loading from "../Loading";

import useToast from "../../hooks/useToast";

function ProfileSettings() {
  const { user, setUser } = useContext(UserContext);
  const { showSuccessToast, showErrorToast } = useToast();

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar);
      setName(user.name);
      setUsername(user.username);
      setBio(user.bio);
    }
  }, [user]);

  const changeAvatar = () => {};

  const saveChanges = async () => {
    // Check if any field is empty
    if (name === "" || username === "" || bio === "") {
      showErrorToast("Please fill all fields");
      return;
    }

    // Save changes
    const updatedUser = {
      userId: user._id,
      name: name,
      username: username,
      bio: bio,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/api/users/${user._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      const data = await response.json();

      if (response.ok) {
        showSuccessToast("Settings updated successfully");
        setUser(data);
      } else {
        showErrorToast(data.message);
      }
    } catch (error) {
      showErrorToast("Failed to update settings");
      console.log(error);
    }
  };

  if (!user) {
    return <Loading></Loading>; // Fallback UI while user data is being loaded
  }

  return (
    <Card>
      <div className="card-header">
        <h2>Profile Information</h2>
        <p>Update your profile details here</p>
      </div>
      <div className="card-content">
        {/* Change Avatar */}
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
        {/* Name, Username and Bio */}
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
              type="text"
              id="bio"
              value={bio}
              placeholder={user.bio}
              onChange={(e) => setBio(e.target.value)}
              className="input h-24 resize-none"
            />
          </div>
        </div>
        {/* Save Button */}

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
