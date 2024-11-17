import React, { useState } from 'react';
import { mockData } from '../data/MockData';
import Prediction from './Prediction';
import PredictionInput from './PredictionInput';

function Home() {
  const [predictions, setPredictions] = useState(mockData.predictions);

  const addPrediction = (newPrediction) => {
    setPredictions([...predictions, newPrediction]);
  };

  return (
    <div className='p-4 flex flex-col gap-4 items-center'>
      <PredictionInput addPrediction={addPrediction} />
      {predictions.map((prediction) => (
        <Prediction key={prediction.id} {...prediction} />
      ))}
    </div>
  );
}
export default Home;
