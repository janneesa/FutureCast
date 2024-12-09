import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
import useToast from "../hooks/useToast";
import Prediction from "./Prediction";
import PredictionInput from "./PredictionInput";
import Loading from "./Loading";

function Home() {
  const { user } = useContext(UserContext);
  const { showErrorToast } = useToast();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/predictions");
      if (!response.ok) {
        showErrorToast("Failed to fetch predictions");
        return;
      }
      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
    } finally {
      setLoading(false);
    }
  };

  const addPrediction = (newPrediction) => {
    setPredictions([...predictions, newPrediction]);
  };

  const sortedPredictions = predictions.sort(
    (a, b) => new Date(a.lastVoteDate) - new Date(b.lastVoteDate)
  );

  if (loading) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <PredictionInput
        addPrediction={addPrediction}
        fetchPredictions={fetchPredictions}
      />
      {sortedPredictions.map((prediction, index) => (
        <Prediction key={`${prediction.id}-${index}`} {...prediction} />
      ))}
    </div>
  );
}

export default Home;
