import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './context/UserContext';

import useToast from '../hooks/useToast';

import PastPrediction from './PastPrediction';
import Prediction from './Prediction';
import PredictionInput from './PredictionInput';
import Loading from './Loading';

function Home() {
  const { user } = useContext(UserContext);
  const { showErrorToast } = useToast();
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pastPredictions, setPastPredictions] = useState([]);
  const [tab, setTab] = useState('active');

  useEffect(() => {
    fetchPredictions();
    fetchPastPredictions();
  }, []);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/predictions/active');
      if (!response.ok) {
        showErrorToast('Failed to fetch predictions');
        return;
      }
      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPastPredictions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/predictions/past');
      if (!response.ok) {
        showErrorToast('Failed to fetch past predictions');
        return;
      }
      const data = await response.json();
      setPastPredictions(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch past predictions:', error.message);
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
      <div className='flex justify-between mt-4'>
        <button className='button-ghost' onClick={() => setTab('active')}>
          Active
        </button>
        {/*
        <button className='button-ghost' onClick={() => setTab('past')}>
          Filtered
        </button>
        <button className='button-ghost' onClick={() => setTab('past')}>
          Trending
        </button>
        */}
        <button className='button-ghost' onClick={() => setTab('past')}>
          Past
        </button>
      </div>
      {tab === 'active' && (
        <>
          <PredictionInput addPrediction={addPrediction} />
          {sortedPredictions.map((prediction, index) => (
            <Prediction key={`${prediction.id}-${index}`} {...prediction} />
          ))}
        </>
      )}
      {tab === 'past' &&
        pastPredictions.map((prediction, index) => (
          <PastPrediction key={`${prediction.id}-${index}`} {...prediction} />
        ))}
    </div>
  );
}

export default Home;
