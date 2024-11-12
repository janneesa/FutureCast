import React from "react";
import Card from "./Card";
import placeholder from "../../assets/react.svg";
import { useEffect } from "react";
import { useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [activeTab, setActiveTab] = useState("predictions");

  const fetchUser = async () => {
    setUser(userTest);
  };

  const fetchPredictions = async () => {
    setPredictions(predictionList);
  };

  useEffect(() => {
    fetchUser();
    fetchPredictions();
  }, []);

  const userTest = {
    name: "John Doe",
    username: "@johndoe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    followers: 150,
    following: 100,
    totalPredictions: 50,
    predictionScore: 85,
    successfulPredictions: 42,
    avatar: placeholder,
  };

  const predictionList = [
    {
      id: 1,
      user: "johndoe",
      avatar:
        "https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b",
      prediction:
        "By 2025, renewable energy will account for 50% of global electricity production.",
      agrees: 120,
      disagrees: 30,
      comments: 15,
      lastVoteDate: "2024-12-31",
    },
    {
      id: 1,
      user: "johndoe",
      avatar:
        "https://preview.redd.it/rwl5o5xm2tv71.jpg?width=640&crop=smart&auto=webp&s=ed06c6952948f95b91e09bdc4988ea1e1fab449b",
      prediction:
        "By 2030, the world will have 1 billion electric vehicles on the road.",
      agrees: 100,
      disagrees: 50,
      comments: 10,
      lastVoteDate: "2029-12-31",
    },
  ];

  return (
    <div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          <div className="flex flex-col gap-8 justify-center items-center">
            <Card>
              <div className="card-content">
                <div className="flex flex-col items-center p-4">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h2 className="text-2xl font-bold">{user?.name}</h2>
                  <p className="text-muted-foreground">{user?.username}</p>
                  <p className="text-center mt-4">{user?.bio}</p>
                  <div className="flex justify-between w-full mt-6">
                    <div className="text-center">
                      <p className="font-bold">{user?.followers}</p>
                      <p className="text-sm text-muted-foreground">Followers</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{user?.following}</p>
                      <p className="text-sm text-muted-foreground">Following</p>
                    </div>
                    <div className="text-center">
                      <p className="font-bold">{user?.totalPredictions}</p>
                      <p className="text-sm text-muted-foreground">
                        Predictions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <Card title="Prediction Score">
              <div className="card-content">
                <div className="flex flex-col items-center pb-4">
                  <p className="text-3xl font-bold mt-2">
                    {user?.predictionScore}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Based on {user?.successfulPredictions} successful
                    predictions out of {user?.totalPredictions} total
                  </p>
                </div>
              </div>
            </Card>
          </div>
          {/* Predictions and Badges */}
          <div className="w-full max-w-lg overflow-hidden justify-center items-start">
            <div className="flex mb-2">
              <button
                className="button-ghost"
                onClick={() => setActiveTab("predictions")}
              >
                Predictions
              </button>
              <button
                className="button-ghost"
                onClick={() => setActiveTab("badges")}
              >
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
                  <div className="card-content">
                    {/* Prediction */}
                    <p className="text-primaryText">{prediction.prediction}</p>
                    {/* Vote Until */}
                    <div className="flex items-center text-sm text-secondaryText mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-4"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
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
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                          />
                        </svg>
                        <span className="ml-1 text-xs">
                          {prediction.agrees} Agree
                        </span>
                      </div>
                      {/* Disagree */}
                      <div className="flex items-center text-sm text-primaryText mt-1 ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                          />
                        </svg>
                        <span className="ml-1 text-xs">
                          {prediction.disagrees} Disagree
                        </span>
                      </div>
                      {/* Comments */}
                      <div className="flex items-center text-sm text-primaryText mt-1 ml-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                          />
                        </svg>

                        <span className="ml-1 text-xs">
                          {prediction.comments} Comments
                        </span>
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
        </div>
      </main>
    </div>
  );
}

export default Profile;
