import { useState } from "react";

function ContentCard({ predictions }) {
  const [activeTab, setActiveTab] = useState("predictions");

  return (
    <div className="w-full max-w-lg overflow-hidden justify-center items-start">
      <div className="flex mb-2">
        <button
          className="button-ghost"
          onClick={() => setActiveTab("predictions")}
        >
          Predictions
        </button>
        <button className="button-ghost" onClick={() => setActiveTab("badges")}>
          Badges
        </button>
      </div>
      {/* Predictions */}
      {activeTab === "predictions" && (
        <div
          id="predictions"
          className="w-full bg-white shadow-lg rounded-lg overflow-hidden p-4"
        >
          <h2 className="card-header">Predictions</h2>
          {/* Mapping predictions */}
          {predictions.map((prediction) => (
            <div key={prediction.id} className="card-content">
              {/* Prediction */}
              <p className="text-primaryText">{prediction.prediction}</p>
              {/* Vote Until */}
              <div className="flex items-center text-sm text-secondaryText mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>
                <span className="ml-2 text-xs">
                  Vote until: {prediction.lastVoteDate}
                </span>
              </div>
              {/* Agree */}
              <div className="flex mt-1">
                <div className="flex items-center text-sm text-primaryText mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 9l-3 3m0 0l-3-3m3 3V4m0 16v-7"
                    />
                  </svg>
                  <span>{prediction.agrees} Agree</span>
                </div>
                <div className="flex items-center text-sm text-primaryText mt-1 ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4 rotate-180"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 9l-3 3m0 0l-3-3m3 3V4m0 16v-7"
                    />
                  </svg>
                  <span>{prediction.disagrees} Disagree</span>
                </div>
                <div className="flex items-center text-sm text-primaryText mt-1 ml-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v11a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{prediction.comments} Comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Badges */}
      {activeTab === "badges" && (
        <div
          id="badges"
          className="w-full bg-white shadow-lg rounded-lg overflow-hidden p-4"
        >
          <h2 className="card-header">Badges</h2>
        </div>
      )}
    </div>
  );
}
export default ContentCard;
