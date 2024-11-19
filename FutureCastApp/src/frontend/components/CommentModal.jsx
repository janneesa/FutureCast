import React from 'react';

function CommentModal({ isOpen, onClose, comments }) {
  if (!isOpen) return null;

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
            <div key={comment.id} className='border-b pb-2'>
              <p className='text-primaryText text-xl font-bold self-center'>
                {comment.username}
              </p>
              <p className='text-primaryText my-2'>{comment.comment}</p>
              <p className='text-sm text-gray-500'>
                {comment.likes.length} likes
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommentModal;
