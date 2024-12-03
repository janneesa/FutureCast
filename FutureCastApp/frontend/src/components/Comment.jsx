import React, { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';

function Comment({ comment, onLike }) {
  const { user } = useContext(UserContext);

  if (!comment || !comment.likes) {
    return null;
  }

  const handleLike = () => {
    onLike(comment.id);
  };

  return (
    <div className='border-b pb-2'>
      <p className='text-primaryText dark:text-darkPrimaryText text-xl font-bold self-center'>
        {comment.username}
      </p>
      <p className='text-primaryText my-2'>{comment.comment}</p>
      <div className='flex items-center text-sm text-gray-500'>
        <span>{comment.likes.length} likes</span>
        <button
          className={`ml-2 ${
            comment.likes.includes(user.id) ? 'text-red-500' : 'text-green-500'
          }`}
          onClick={handleLike}
        >
          {comment.likes.includes(user.id) ? 'Unlike' : 'Like'}
        </button>
      </div>
    </div>
  );
}

export default Comment;
