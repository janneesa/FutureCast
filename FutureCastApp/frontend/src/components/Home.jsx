import React, { useState, useEffect, useContext } from 'react';
import Prediction from './Prediction';
import PredictionInput from './PredictionInput';
import Loading from './Loading';
import { UserContext } from './context/UserContext';

function Home() {
  const { user } = useContext(UserContext);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/predictions');
      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
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
      <div className='p-4 flex flex-col gap-4 items-center'>
        <Loading />
      </div>
    );
  }

  if (!user) {
    return (
      <div className='p-4 flex flex-col gap-4 items-center'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='p-4 flex flex-col gap-4 items-center'>
      <PredictionInput addPrediction={addPrediction} />
      {sortedPredictions.map((prediction, index) => (
        <Prediction key={`${prediction.id}-${index}`} {...prediction} />
      ))}
    </div>
  );
}

export default Home;
