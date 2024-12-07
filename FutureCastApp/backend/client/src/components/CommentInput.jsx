import React, { useState, useEffect } from "react";

import useToast from "../hooks/useToast";

// components/CommentInput.jsx
function CommentInput({ predictionId, onAddComment, user }) {
  const { showErrorToast } = useToast();
  const [commentText, setCommentText] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  const handleAddComment = async () => {
    if (!commentText) {
      setError("Comment cannot be empty.");
      return;
    }

    if (!user) {
      setError("You must be logged in to comment.");
      return;
    }

    if (!user.id) {
      setError("User ID not found. Please try logging in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/api/predictions/${predictionId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            userId: user.id,
            username: user.username,
            comment: commentText,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      const newComment = await response.json();
      onAddComment(newComment);
      setCommentText("");
      setError("");
    } catch (error) {
      setError("Failed to add comment");
      console.error("Error adding comment:", error);
    }
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
    </div>
  );
}

export default CommentInput;
