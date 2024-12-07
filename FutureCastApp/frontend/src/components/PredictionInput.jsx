import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../components/context/UserContext";

import useToast from "../hooks/useToast";
import useSettings from "../hooks/useSettings";

import Card from "./Card";

function PredictionInput({ addPrediction }) {
  const { user } = useContext(UserContext);
  const { showErrorToast, showSuccessToast } = useToast();
  const { updateSettings, error, okMessage } = useSettings();
  const [predictionText, setPredictionText] = useState("");
  const [category, setCategory] = useState("");
  const [lastVoteDate, setLastVoteDate] = useState("");

  useEffect(() => {
    if (okMessage) {
      showSuccessToast("Prediction posted successfully");
    }
    if (error) {
      showErrorToast(error);
    }
  }, [error, okMessage]);

  const addPredictionToUser = async (newPrediction) => {
    if (!user || !user.id) return;

    try {
      // Get current user predictions
      const userResponse = await fetch(
        `http://localhost:4000/api/users/${user.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`, // Include the token here
          },
        }
      );

      if (!userResponse.ok) {
        showErrorToast("Failed to fetch user predictions");
        throw new Error("Failed to fetch user predictions");
      }
      const userData = await userResponse.json();
      const currentPredictions = userData.predictions || [];

      const updatedUser = {
        ...user,
        predictions: [...currentPredictions, newPrediction.id],
      };

      // Update user with new prediction
      await updateSettings(updatedUser);
    } catch (error) {
      console.error("Error updating user predictions:", error);
    }
  };

  const handlePostPrediction = async () => {
    if (!predictionText || !lastVoteDate) {
      showErrorToast("Please fill in all fields");
      return;
    }

    console.log("Current user:", user);

    if (!user || !user.id) {
      showErrorToast("Please log in to post a prediction");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/predictions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          userId: user.id.toString(),
          username: user.username,
          prediction: predictionText,
          agrees: [],
          disagrees: [],
          lastVoteDate: lastVoteDate,
          avatar: user.avatar,
          comments: [],
          category: category,
        }),
      });

      if (!response.ok) {
        showErrorToast("Failed to create prediction");
        throw new Error("Failed to create prediction");
      }

      const newPrediction = await response.json();
      addPrediction(newPrediction);
      await addPredictionToUser(newPrediction);
      setPredictionText("");
      setCategory("");
      setLastVoteDate("");
    } catch (error) {
      console.error("Error creating prediction:", error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <Card>
      <div className="card-header">
        <h2>Post a new prediction</h2>
        <p>Write and post your prediction about the future</p>
      </div>
      <div className="card-content">
        <label htmlFor="prediction">Prediction</label>
        <textarea
          id="prediction"
          value={predictionText}
          onChange={(e) => setPredictionText(e.target.value)}
          placeholder="I predict that..."
          className="input w-full resize-none"
        />
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input w-full"
        >
          <option value="">Select a category</option>
          <option value="Technology">Technology</option>
          <option value="Science">Science</option>
          <option value="Politics">Politics</option>
          <option value="Sports">Sports</option>
          <option value="Entertainment">Entertainment</option>
        </select>
        <label htmlFor="lastVoteDay">Vote until</label>
        <input
          id="lastVoteDay"
          type="date"
          value={lastVoteDate}
          onChange={(e) => setLastVoteDate(e.target.value)}
          className="input w-full"
          min={today}
        />
        <div className="mt-4">
          <button onClick={handlePostPrediction} className="button">
            Post Prediction
          </button>
        </div>
      </div>
    </Card>
  );
}

export default PredictionInput;
