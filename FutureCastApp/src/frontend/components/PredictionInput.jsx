import React, { useState } from 'react';
import { mockData } from '../data/MockData';

function PredictionInput({ addPrediction }) {
  const [predictionText, setPredictionText] = useState('');
  const [lastVoteDate, setLastVoteDate] = useState('');

  const handlePostPrediction = () => {
    const newPrediction = {
      id: mockData.predictions.length + 1,
      userId: 1,
      username: 'username', // Replace with actual username if available
      prediction: predictionText,
      agrees: [],
      disagrees: [],
      comments: 0,
      lastVoteDate: lastVoteDate,
      avatar:
        'https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b', // Replace with actual avatar if available
    };

    addPrediction(newPrediction);
    setPredictionText('');
    setLastVoteDate('');
  };

  return (
    <div className='w-full max-w-lg p-4 bg-white shadow-lg rounded-lg mb-4'>
      <textarea
        value={predictionText}
        onChange={(e) => setPredictionText(e.target.value)}
        placeholder='Enter your prediction'
        className='w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <input
        type='date'
        value={lastVoteDate}
        onChange={(e) => setLastVoteDate(e.target.value)}
        className='w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <button
        onClick={handlePostPrediction}
        className='w-full p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
      >
        Post Prediction
      </button>
    </div>
  );
}

export default PredictionInput;
