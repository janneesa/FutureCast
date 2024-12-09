import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Card from "../Card";
import Loading from "../Loading";
import useToast from "../../hooks/useToast";
import useSettings from "../../hooks/useSettings";

function ProfileSettings() {
  const { user } = useContext(UserContext); // Access user from context
  const { updateSettings } = useSettings(); // Call updateSettings to save data
  const { showErrorToast } = useToast();

  const [showAvatarInput, setShowAvatarInput] = useState(false);
  const [formData, setFormData] = useState({
    avatar: "",
    name: "",
    username: "",
    bio: "",
  });

  // Populate user details into state on mount
  useEffect(() => {
    if (user) {
      setFormData({
        avatar: user.avatar || "",
        name: user.name || "",
        username: user.username || "",
        bio: user.bio || "",
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (
      !formData.name.trim() ||
      !formData.username.trim() ||
      !formData.bio.trim()
    ) {
      showErrorToast("Please fill all fields");
      return;
    }

    // Call the updateSettings hook
    updateSettings(formData);
  };

  if (!user) {
    return <Loading />; // Show loading while user is unavailable
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
            src={formData.avatar}
            alt={formData.name}
            className="w-24 h-24 rounded-full mb-4"
          />
          <div>
            <button
              className="button"
              onClick={() => setShowAvatarInput(!showAvatarInput)}
            >
              {showAvatarInput ? "Change Profile" : "Change Avatar"}
            </button>
          </div>
        </div>

        {/* Input Fields */}
        {!showAvatarInput ? (
          <>
            {["name", "username", "bio"].map((field) => (
              <div key={field} className="flex flex-col gap-2">
                <label htmlFor={field}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "bio" ? "textarea" : "text"}
                  id={field}
                  value={formData[field]}
                  placeholder={`Enter your ${field}`}
                  onChange={(e) => handleChange(field, e.target.value)}
                  className="input"
                />
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <label htmlFor="avatar">Avatar URL</label>
            <textarea
              id="avatar"
              value={formData.avatar}
              placeholder="Enter Avatar URL"
              onChange={(e) => handleChange("avatar", e.target.value)}
              className="input h-24 resize-none"
            />
          </div>
        )}

        {/* Save Changes Button */}
        <div className="mt-4 w-32">
          <button className="button" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </Card>
  );
}

export default ProfileSettings;
