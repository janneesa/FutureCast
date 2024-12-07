import React, { useState } from "react";

import Prediction from "../Prediction";
import Card from "../Card";

const ContentCard = ({ predictions, badges }) => {
  const [activeTab, setActiveTab] = useState("predictions");

  return (
    <div className="w-full md:max-w-xl lg:max-w-2xl overflow-hidden">
      <div className="flex">
        <button
          className={`button-ghost ${
            activeTab === "predictions" ? "active" : ""
          }`}
          onClick={() => setActiveTab("predictions")}
        >
          Predictions
        </button>
        <button
          className={`button-ghost ${activeTab === "badges" ? "active" : ""}`}
          onClick={() => setActiveTab("badges")}
        >
          Badges
        </button>
      </div>

      {activeTab === "predictions" && (
        <PredictionList predictions={predictions} />
      )}

      {activeTab === "badges" && <BadgeList badges={badges} />}
    </div>
  );
};

const PredictionList = ({ predictions }) => (
  <div id="predictions" className="w-full overflow-hidden">
    <h2 className="card-header text-primaryText dark:text-darkPrimaryText">
      Predictions
    </h2>
    {predictions.map((prediction) => (
      <Prediction
        key={prediction.id}
        id={prediction.id}
        username={prediction.username}
        userId={prediction.userId}
        avatar={prediction.avatar}
        lastVoteDate={prediction.lastVoteDate}
        prediction={prediction.prediction}
        agrees={prediction.agrees}
        disagrees={prediction.disagrees}
        comments={prediction.comments}
      />
    ))}
  </div>
);

const BadgeList = ({ badges }) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div id="badges" className="w-full overflow-hidden">
      <h2 className="card-header text-primaryText dark:text-darkPrimaryText">
        Badges
      </h2>
      {!badges ? (
        <Card>
          <div className="card-content">
            <p>Make predictions to earn badges</p>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="card-content flex flex-wrap gap-2">
            {badges.map((badge) => (
              <div key={badge.name} className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-secondaryText dark:text-darkSecondaryText mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                  />
                </svg>
                <div className="flex flex-col">
                  <p
                    className="mr-2 cursor-pointer"
                    onClick={() => setShowDescription(!showDescription)}
                  >
                    {badge.name}
                  </p>
                  {showDescription && (
                    <p className="italic">{badge.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default ContentCard;
