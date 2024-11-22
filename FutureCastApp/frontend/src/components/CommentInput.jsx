import React, { useState } from "react";

function CommentInput({ predictionId, onAddComment, user }) {
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  const handleAddComment = () => {
    if (!commentText) {
      setError("Comment cannot be empty.");
      return;
    }

    const newComment = {
      id: Date.now(), // Temporary solution to id without having to access the MockData
      username: user.username,
      userId: user.id,
      comment: commentText,
      likes: [],
      predictionId: predictionId,
    };

    onAddComment(newComment);
    setCommentText("");
    setError("");
  };

  return (
    <div className="mt-4">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        className="input w-full resize-none"
      />
      <button onClick={handleAddComment} className="button mt-2">
        Post Comment
      </button>
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}

export default CommentInput;
