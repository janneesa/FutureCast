import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import Comment from './Comment';
import CommentInput from './CommentInput';

function CommentModal({
  isOpen,
  onClose,
  initialComments,
  predictionId,
  onAddComment,
}) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  if (!isOpen) return null;

  const handleLike = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (comment.likes.includes(user.id)) {
            return {
              ...comment,
              likes: comment.likes.filter((userId) => userId !== user.id),
            };
          } else {
            return {
              ...comment,
              likes: [...comment.likes, user.id],
            };
          }
        }
        return comment;
      })
    );
  };

  const handleAddComment = (newComment) => {
    setComments([...comments, newComment]);
    onAddComment(newComment);
  };

  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 w-full max-w-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Comments</h2>
          <button
            onClick={onClose}
            className='text-gray-600 hover:text-gray-900'
          >
            &times;
          </button>
        </div>
        <div className='space-y-4'>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} onLike={handleLike} />
          ))}
        </div>
        <CommentInput
          predictionId={predictionId}
          onAddComment={handleAddComment}
          user={user}
        />
      </div>
    </div>
  );
}

export default CommentModal;
