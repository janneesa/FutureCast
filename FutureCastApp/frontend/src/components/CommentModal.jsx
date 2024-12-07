import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

function CommentModal({
  isOpen,
  onClose,
  initialComments,
  predictionId,
  onAddComment,
}) {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState(initialComments || []);

  useEffect(() => {
    setComments(initialComments || []);
  }, [initialComments]);

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [isOpen]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`/api/predictions/${predictionId}`);
      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  if (!isOpen) return null;

  const handleLike = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/comments/${commentId}/like`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: user._id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to like comment");
      }

      const updatedComment = await response.json();

      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === commentId ? updatedComment : comment
        )
      );
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  const handleAddComment = async (newComment) => {
    await onAddComment(newComment);
    fetchComments();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card dark:bg-darkCard rounded-lg shadow-lg p-4 w-full max-w-lg max-h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2>Comments</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4">
          {comments.map((comment) => (
            <Comment
              key={comment.id || Math.random()}
              comment={comment}
              onLike={handleLike}
            />
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
