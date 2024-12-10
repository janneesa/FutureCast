import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../components/context/UserContext";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import CommentModal from "./CommentModal";
import useNotifications from "../hooks/useNotifications";

function calculateAgreementPercentage(agrees, disagrees) {
  const total = agrees.length + disagrees.length;
  return total === 0 ? 0 : (agrees.length / total) * 100;
}

function Prediction({
  id,
  username,
  userId,
  avatar,
  lastVoteDate,
  prediction,
  agrees,
  disagrees,
  comments,
  category,
}) {
  const { user } = useContext(UserContext);
  const { addNotification } = useNotifications();
  const [userVote, setUserVote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [predictionComments, setPredictionComments] = useState(comments);
  const [agreementPercentage, setAgreementPercentage] = useState(
    calculateAgreementPercentage(agrees, disagrees)
  );
  const [agreeCount, setAgreeCount] = useState(agrees.length);
  const [disagreeCount, setDisagreeCount] = useState(disagrees.length);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (agrees.includes(user.id)) {
        setUserVote("agrees");
      } else if (disagrees.includes(user.id)) {
        setUserVote("disagrees");
      }
    }
  }, [user, agrees, disagrees]);

  useEffect(() => {
    setAgreementPercentage(calculateAgreementPercentage(agrees, disagrees));
  }, [agrees, disagrees]);

  const handleVote = async (type) => {
    if (!user) return;

    const newAgrees = [...agrees];
    const newDisagrees = [...disagrees];

    if (userVote === type) {
      if (type === "agrees") {
        setAgreeCount((prev) => prev - 1);
      } else {
        setDisagreeCount((prev) => prev - 1);
      }
      setUserVote(null);
    } else {
      if (type === "agrees") {
        setAgreeCount((prev) => prev + 1);
        if (userVote === "disagrees") {
          setDisagreeCount((prev) => prev - 1);
        }
      } else {
        setDisagreeCount((prev) => prev + 1);
        if (userVote === "agrees") {
          setAgreeCount((prev) => prev - 1);
        }
      }
      setUserVote(type);
    }

    setAgreementPercentage(
      calculateAgreementPercentage(
        type === "agrees" ? [...agrees, user.id] : agrees,
        type === "disagrees" ? [...disagrees, user.id] : disagrees
      )
    );

    try {
      const response = await fetch(`/api/predictions/${id}/vote`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          voteType: userVote === type ? null : type,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to vote on prediction");
      }

      const updatedPrediction = await response.json();

      setUserVote(userVote === type ? null : type);
      setPredictionComments(updatedPrediction.comments);
      addNotification(userId, `${user.username} ${type} on "${prediction}"`);
    } catch (error) {
      console.error("Error voting on prediction:", error);
    }
  };

  const handleAddComment = (newComment) => {
    setPredictionComments([...predictionComments, newComment._id]);
  };

  const handleNavigate = () => {
    navigate(`/app/profile/${userId}`);
  };

  if (!user) {
    return null;
  }

  const isVotingDisabled = () => {
    const currentDate = new Date().toISOString().split("T")[0];
    return currentDate > lastVoteDate || userId === user.id;
  };

  const formattedLastVoteDate = new Date(lastVoteDate).toLocaleDateString();

  return (
    <Card>
      <div className="card-content">
        {/* Profile img, Username, Vote Date */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center cursor-pointer"
            onClick={handleNavigate}
          >
            <img
              src={avatar}
              alt={username}
              className="h-12 w-12 rounded-full mr-2"
            />
            <p className="text-primaryText text-xl font-bold self-center">
              {username}
            </p>
          </div>
          <div className="flex items-center text-sm text-secondaryText dark:text-darkSecondaryText">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
              />
            </svg>
            <span className="ml-2 dark:text-darkSecondaryText">
              Vote until: {formattedLastVoteDate}
            </span>
          </div>
        </div>
        {/* Prediction */}
        <div>
          <p className="text-primaryText my-2">{prediction}</p>
        </div>
        {/* Category */}
        {category && (
          <div
            className="flex items-center text-xs mb-2 text-secondaryText dark:text-darkSecondaryText cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            <span className="ml-0 dark:text-darkSecondaryText bg-background dark:bg-darkBackground rounded-full px-2 py-1">
              {category}
            </span>
          </div>
        )}

        {/* Agree vs Disagree */}
        <div className="relative pt-1">
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-background dark:bg-darkSecondaryText">
            <div
              style={{
                width: `${agreementPercentage}%`,
              }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primaryButton"
            ></div>
          </div>
        </div>
        {/* Agree vs Disagree Count */}
        <div className="flex justify-between">
          <p>{agreeCount} Agrees</p>
          <p>{disagreeCount} Disagrees</p>
        </div>
        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <div className="flex space-x-2">
            <button
              className={`button-secondary ${
                userVote === "agrees" ? "button-agree" : "button-neutral"
              }`}
              onClick={() => handleVote("agrees")}
              disabled={isVotingDisabled()}
            >
              Agree
            </button>
            <button
              className={`button-secondary ${
                userVote === "disagrees" ? "button-disagree" : "button-neutral"
              }`}
              onClick={() => handleVote("disagrees")}
              disabled={isVotingDisabled()}
            >
              Disagree
            </button>
          </div>
          <div>
            <button
              className="button-ghost flex"
              onClick={() => setIsModalOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-5 w-5 mr-4 self-center"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.4 0-4.8.2-7.2.6-1.584.233-2.707 1.626-2.707 3.228v6.932z"
                />
              </svg>
              {predictionComments.length} Comments
            </button>
          </div>
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

export default Prediction;
