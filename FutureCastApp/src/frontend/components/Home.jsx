import React, { useState, useEffect, useContext } from "react";
import { mockData } from "../data/MockData";
import Prediction from "./Prediction";
import PredictionInput from "./PredictionInput";
import Loading from "./Loading";

import { UserContext } from "./context/UserContext";

function Home() {
  const { user } = useContext(UserContext);
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    fetchePredictions();
  }, []);

  const fetchePredictions = async () => {
    // Logic here
    //Mock data
    setPredictions(mockData.predictions);
  };

  const addPrediction = (newPrediction) => {
    setPredictions([...predictions, newPrediction]);
  };

  const sortedPredictions = predictions.sort(
    (a, b) => new Date(a.lastVoteDate) - new Date(b.lastVoteDate)
  );

  if (!user) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <PredictionInput addPrediction={addPrediction} />
      {predictions.map((prediction) => (
        <Prediction key={prediction.id} {...prediction} />
      ))}
    </div>
  );
}
export default Home;
