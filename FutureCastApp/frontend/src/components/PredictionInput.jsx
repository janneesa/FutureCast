import React, { useState, useContext } from 'react';
import Card from './Card';
import { UserContext } from '../components/context/UserContext';

function PredictionInput({ addPrediction }) {
  const { user, setUser } = useContext(UserContext);
  const [predictionText, setPredictionText] = useState('');
  const [lastVoteDate, setLastVoteDate] = useState('');
  const [error, setError] = useState('');

  const addPredictionToUser = async (newPrediction) => {
    if (!user || !user.id) return;

    try {
      // Get current user predictions
      const userResponse = await fetch(
        `http://localhost:4000/api/users/${user.id}`
      );
      const userData = await userResponse.json();
      const currentPredictions = userData.predictions || [];

      // Update user with new prediction
      const response = await fetch(
        `http://localhost:4000/api/users/${user.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            predictions: [...currentPredictions, newPrediction.id], // Use _id from MongoDB
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update user predictions');
      }

      const updatedUser = await response.json();
      setUser(updatedUser); // Update local user state with full user object
    } catch (error) {
      console.error('Error updating user predictions:', error);
      setError('Failed to update user predictions');
    }
  };

  const handlePostPrediction = async () => {
    if (!predictionText || !lastVoteDate) {
      setError('Both fields are required.');
      return;
    }

    console.log('Current user:', user);

    if (!user || !user.id) {
      setError('User not authenticated');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/predictions`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
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
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create prediction');
      }

      const newPrediction = await response.json();
      addPrediction(newPrediction);
      await addPredictionToUser(newPrediction);
      setPredictionText('');
      setLastVoteDate('');
      setError('');
    } catch (error) {
      setError('Failed to create prediction: ' + error.message);
      console.error('Error creating prediction:', error);
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Card>
      <div className='card-header'>
        <h2>Post a new prediction</h2>
        <p>Write and post your prediction about the future</p>
      </div>
      <div className='card-content'>
        <label htmlFor='prediction'>Prediction</label>
        <textarea
          id='prediction'
          value={predictionText}
          onChange={(e) => setPredictionText(e.target.value)}
          placeholder='I predict that...'
          className='input w-full resize-none'
        />
        <label htmlFor='lastVoteDay'>Vote until</label>
        <input
          id='lastVoteDay'
          type='date'
          value={lastVoteDate}
          onChange={(e) => setLastVoteDate(e.target.value)}
          className='input w-full'
          min={today}
        />
        <div className='mt-4'>
          <button onClick={handlePostPrediction} className='button'>
            Post Prediction
          </button>
          {error && <p className='text-red-600 m-4'>{error}</p>}
        </div>
      </div>
    </Card>
  );
}

export default PredictionInput;
