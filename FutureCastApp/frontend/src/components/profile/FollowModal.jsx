import React, { useState, useEffect } from "react";
import Card from "../Card";
import Loading from "../Loading";
import { useNavigate } from "react-router-dom";

const FollowModal = ({ list = [], onClose }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user profiles
  useEffect(() => {
    const fetchUserProfiles = async () => {
      setIsLoading(true); // Show loading state
      try {
        const userProfiles = await Promise.all(
          list.map(async (id) => {
            const response = await fetch(`/api/users/${id}`, {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            });
            if (response.ok) return response.json();
            console.error(`Failed to fetch user with id: ${id}`);
            return null; // Handle fetch failure
          })
        );
        setUsers(userProfiles.filter(Boolean)); // Filter out null values
      } catch (error) {
        console.error(`Error fetching users: ${error.message}`);
      } finally {
        setIsLoading(false); // Hide loading state
      }
    };

    if (list.length > 0) fetchUserProfiles();
  }, [list]);

  const handleClick = (id) => {
    onClose();
    navigate(`/app/profile/${id}`);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <Card>
        <div className="p-4">
          {/* Close Button */}
          <button className="button-secondary ml-auto" onClick={onClose}>
            Close
          </button>

          {/* Loading Indicator */}
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <Loading />
            </div>
          ) : users.length > 0 ? (
            /* User List */
            users.map((user) => (
              <div
                key={user.id}
                className="flex items-center my-4 cursor-pointer"
                onClick={() => handleClick(user.id)}
              >
                <img
                  src={user.avatar}
                  alt={`${user.username}'s avatar`}
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="font-semibold">{user.username}</h3>
                  <p>Prediction Score: {user.predictionScore}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground mt-4">
              No users found.
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default FollowModal;
