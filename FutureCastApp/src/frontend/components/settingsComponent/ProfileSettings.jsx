import Card from "../Card";
import Loading from "../Loading";

import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

import { validateUserName } from "../../validations/RegisterValidation";

function ProfileSettings() {
  const { user, setUser } = useContext(UserContext);

  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setAvatar(user.avatar);
      setName(user.name);
      setUsername(user.username);
      setBio(user.bio);
    }
  }, [user]);

  const changeAvatar = () => {};

  const saveChanges = () => {
    // Check if username has changed
    if (username.toLowerCase() !== user.username.toLowerCase()) {
      const validationError = validateUserName(username);
      if (validationError) {
        setError(validationError);
        return;
      }
    }

    // Check if any field is empty
    if (name === "" || username === "" || bio === "") {
      setError("Please fill all fields");
      return;
    }

    // Save changes
    console.log("Saving changes");
    setUser((u) => ({ ...u, name: name, username: username, bio: bio }));
    setError("");
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
        {error && <p className="text-red-600 mt-4">{error}</p>}
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
