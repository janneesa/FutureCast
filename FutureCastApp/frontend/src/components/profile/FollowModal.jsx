import React, { useState, useEffect } from "react";
import Card from "../Card";

const FollowModal = ({ list = [], onClose }) => {
  const [users, setUsers] = useState([]);

  // Fetch user profiles
  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const userProfiles = await Promise.all(
          list.map(async (id) => {
            const response = await fetch(
              `http://localhost:4000/api/users/${id}`,
              { method: "GET", headers: { "Content-Type": "application/json" } }
            );
            if (response.ok) return response.json();
            console.error(`Failed to fetch user with id: ${id}`);
            return null;
          })
        );
        setUsers(userProfiles.filter(Boolean));
      } catch (error) {
        console.error(`Error fetching users: ${error.message}`);
      }
    };

    if (list.length > 0) fetchUserProfiles();
  }, [list]);

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <Card>
        <div className="p-4">
          {/* Close Button */}
          <button className="button-secondary ml-auto" onClick={onClose}>
            Close
          </button>

          {/* User List */}
          {users.length > 0 ? (
            users.map((user) => (
              <div key={user.id} className="flex items-center my-4">
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
