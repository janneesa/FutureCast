import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../components/context/UserContext';
import Card from './Card';

function PastPrediction({
  id,
  username,
  userId,
  avatar,
  lastVoteDate,
  prediction,
  trueVotes,
  falseVotes,
  comments,
  category,
}) {
  const { user } = useContext(UserContext);
  const [userVote, setUserVote] = useState(null);
  const [trueVoteCount, setTrueVoteCount] = useState(trueVotes?.length || 0);
  const [falseVoteCount, setFalseVoteCount] = useState(falseVotes?.length || 0);

  useEffect(() => {
    if (user) {
      if (trueVotes?.includes(user.id)) {
        setUserVote('true');
      } else if (falseVotes?.includes(user.id)) {
        setUserVote('false');
      }
    }
  }, [user, trueVotes, falseVotes]);

  const handleVote = async (type) => {
    if (!user) return;

    try {
      const response = await fetch(`/api/predictions/${id}/finalVote`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          voteType: userVote === type ? null : type,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to vote on prediction');
      }

      const updatedPrediction = await response.json();

      // Update vote counts
      if (userVote === type) {
        // Remove vote
        if (type === 'true') {
          setTrueVoteCount((prev) => prev - 1);
        } else {
          setFalseVoteCount((prev) => prev - 1);
        }
        setUserVote(null);
      } else {
        // Add/change vote
        if (type === 'true') {
          setTrueVoteCount((prev) => prev + 1);
          if (userVote === 'false') {
            setFalseVoteCount((prev) => prev - 1);
          }
        } else {
          setFalseVoteCount((prev) => prev + 1);
          if (userVote === 'true') {
            setTrueVoteCount((prev) => prev - 1);
          }
        }
        setUserVote(type);
      }
    } catch (error) {
      console.error('Error voting on prediction:', error);
    }
  };

  return (
    <Card>
      <div className='card-content'>
        <div className='flex items-center'>
          <img src={avatar} alt={username} className='h-12 w-12 rounded-full' />
          <p className='text-primaryText text-xl font-bold ml-4'>{username}</p>
        </div>
        <p className='text-primaryText my-2'>{prediction}</p>
        {/* Vote counts */}
        <div className='flex justify-between mb-4'>
          <p>{trueVoteCount} True</p>
          <p>{falseVoteCount} False</p>
        </div>
        {/* Vote buttons */}
        <div className='flex justify-between mt-4'>
          <button
            className={`button-secondary ${
              userVote === 'true' ? 'button-true' : 'button-neutral'
            }`}
            onClick={() => handleVote('true')}
          >
            True
          </button>
          <button
            className={`button-secondary ${
              userVote === 'false' ? 'button-false' : 'button-neutral'
            }`}
            onClick={() => handleVote('false')}
          >
            False
          </button>
        </div>
      </div>
    </Card>
  );
}

export default PastPrediction;
