import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';

function Comment({ comment, onLike }) {
  const { user } = useContext(UserContext);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment?.likes?.length || 0);

  useEffect(() => {
    const hasLiked = comment?.likes?.some(
      (likeId) => likeId.toString() === user.id.toString()
    );

    setIsLiked(hasLiked);
    setLikeCount(comment?.likes?.length || 0);
  }, [comment, user.id]);

  if (!comment || !comment.likes) {
    return null;
  }

  const handleLike = async () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);

    await onLike(comment._id);
  };

  const formattedDate = new Intl.DateTimeFormat(navigator.language, {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(comment.createdAt));

  return (
    <div className='border-b pb-2'>
      <div className='flex items-center gap-2'>
        <p className='text-primaryText dark:text-darkPrimaryText text-xl font-bold self-center'>
          {comment.username}
        </p>
        <span className='text-secondaryText dark:text-darkSecondaryText text-sm'>
          {formattedDate}
        </span>
      </div>
      <p className='text-primaryText my-2'>{comment.comment}</p>
      <div className='flex items-center text-sm text-gray-500'>
        <span>{likeCount} likes</span>
        <button
          className={`ml-2 ${isLiked ? 'text-red-500' : 'text-green-500'}`}
          onClick={handleLike}
        >
          {isLiked ? 'Unlike' : 'Like'}
        </button>
      </div>
    </div>
  );
}

export default Comment;
