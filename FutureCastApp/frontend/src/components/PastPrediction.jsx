import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../components/context/UserContext';
import Card from './Card';
import CommentModal from './CommentModal';

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
  const [predictionComments, setPredictionComments] = useState(comments);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      if (trueVotes?.includes(user.id)) {
        setUserVote('true');
      } else if (falseVotes?.includes(user.id)) {
        setUserVote('false');
      }
    }
  }, [user, trueVotes, falseVotes]);

  const handleAddComment = (newComment) => {
    setPredictionComments([...predictionComments, newComment._id]);
  };

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

  const formattedLastVoteDate = new Date(lastVoteDate).toLocaleDateString();

  const truePercentage =
    (trueVoteCount / (trueVoteCount + falseVoteCount)) * 100 || 0;

  const cardStyle =
    truePercentage > 50
      ? 'border-2 border-green-500 dark:border-green-700 rounded-lg'
      : 'border-2 border-red-500 dark:border-red-700 rounded-lg';

  return (
    <Card>
      <div className={`card-content ${cardStyle}`}>
        <div className='flex items-center justify-between'>
          <div className='flex items-center cursor-pointer'>
            <img
              src={avatar}
              alt={username}
              className='h-12 w-12 rounded-full mr-2'
            />
            <p className='text-primaryText text-xl font-bold self-center'>
              {username}
            </p>
          </div>
          <div className='flex items-center text-sm text-secondaryText dark:text-darkSecondaryText'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='size-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
              />
            </svg>
            <span className='ml-2'>
              Prediction end date: {formattedLastVoteDate}
            </span>
          </div>
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
              userVote === 'true' ? 'button-agree' : 'button-neutral'
            }`}
            onClick={() => handleVote('true')}
            disabled={userId === user.id}
          >
            True
          </button>
          <button
            className={`button-secondary ${
              userVote === 'false' ? 'button-disagree' : 'button-neutral'
            }`}
            onClick={() => handleVote('false')}
            disabled={userId === user.id}
          >
            False
          </button>
        </div>
        <div>
          <button
            className='button-ghost flex'
            onClick={() => setIsModalOpen(true)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-5 w-5 mr-4 self-center'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.4 0-4.8.2-7.2.6-1.584.233-2.707 1.626-2.707 3.228v6.932z'
              />
            </svg>
            {predictionComments.length} Comments
          </button>
        </div>
      </div>
      <CommentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialComments={predictionComments}
        predictionId={id}
        onAddComment={handleAddComment}
      />
    </Card>
  );
}

export default PastPrediction;
