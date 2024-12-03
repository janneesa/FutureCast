import React, { useState } from 'react';

// components/CommentInput.jsx
function CommentInput({ predictionId, onAddComment, user }) {
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');

  const handleAddComment = async () => {
    if (!commentText) {
      setError('Comment cannot be empty.');
      return;
    }

    if (!user) {
      setError('You must be logged in to comment.');
      return;
    }

    if (!user.id) {
      setError('User ID not found. Please try logging in again.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/predictions/${predictionId}/comments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: user.id,
            username: user.username,
            comment: commentText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to post comment');
      }

      const newComment = await response.json();
      console.log(newComment);
      onAddComment(newComment);
      setCommentText('');
      setError('');
    } catch (error) {
      setError('Failed to add comment');
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className='mt-4'>
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder='Add a comment...'
        className='input w-full resize-none'
      />
      <button onClick={handleAddComment} className='button mt-2'>
        Post Comment
      </button>
      {error && <p className='text-red-600 mt-2'>{error}</p>}
    </div>
  );
}

export default CommentInput;
