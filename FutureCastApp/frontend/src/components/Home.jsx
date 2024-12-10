import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./context/UserContext";
import useToast from "../hooks/useToast";
import PastPrediction from "./PastPrediction";
import Prediction from "./Prediction";
import PredictionInput from "./PredictionInput";
import Loading from "./Loading";

function Home() {
  const { user } = useContext(UserContext);
  const { showErrorToast } = useToast();
  const [predictions, setPredictions] = useState([]);
  const [followingPredictions, setFollowingPredictions] = useState([]);
  const [pastPredictions, setPastPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("active");

  useEffect(() => {
    if (tab === "active") {
      fetchPredictions();
    } else if (tab === "following") {
      fetchFollowingPredictions();
    } else if (tab === "past") {
      fetchPastPredictions();
    }
  }, [tab]);

  const fetchPredictions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/predictions/active");
      if (!response.ok) {
        showErrorToast("Failed to fetch predictions");
        return;
      }
      const data = await response.json();
      setPredictions(data);
    } catch (error) {
      console.error("Failed to fetch predictions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowingPredictions = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/predictions/following/${user.id}`);
      if (!response.ok) {
        showErrorToast("Failed to fetch following predictions");
        return;
      }
      const data = await response.json();
      setFollowingPredictions(data);
    } catch (error) {
      console.error("Failed to fetch following predictions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPastPredictions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/predictions/past");
      if (!response.ok) {
        showErrorToast("Failed to fetch past predictions");
        return;
      }
      const data = await response.json();
      setPastPredictions(data);
    } catch (error) {
      console.error("Failed to fetch past predictions:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const addPrediction = (newPrediction) => {
    setPredictions([...predictions, newPrediction]);
  };

  if (loading) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 flex flex-col gap-4 items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col gap-4 items-center">
      <div className="flex max-w-lg w-full">
        <button
          className={`w-full p-2 rounded transition text-center ${
            tab === "active"
              ? "bg-primaryButton dark:bg-darkPrimaryButton text-white dark:text-darkPrimaryText"
              : "text-primaryText dark:text-darkPrimaryText"
          }`}
          onClick={() => setTab("active")}
        >
          Discover
        </button>
        <button
          className={`w-full p-2 rounded transition text-center ${
            tab === "following"
              ? "bg-primaryButton dark:bg-darkPrimaryButton text-white dark:text-darkPrimaryText"
              : "text-primaryText dark:text-darkPrimaryText"
          }`}
          onClick={() => setTab("following")}
        >
          Your Feed
        </button>
        <button
          className={`w-full p-2 rounded transition text-center ${
            tab === "filter"
              ? "bg-primaryButton dark:bg-darkPrimaryButton text-white dark:text-darkPrimaryText"
              : "text-primaryText dark:text-darkPrimaryText"
          }`}
          onClick={() => setTab("filter")}
        >
          Filter
        </button>
        <button
          className={`w-full p-2 rounded transition text-center ${
            tab === "past"
              ? "bg-primaryButton dark:bg-darkPrimaryButton text-white dark:text-darkPrimaryText"
              : "text-primaryText dark:text-darkPrimaryText"
          }`}
          onClick={() => setTab("past")}
        >
          Past
        </button>
      </div>
      {(tab === "active" || tab === "following") && (
        <PredictionInput addPrediction={addPrediction} />
      )}
      {tab === "active" && (
        <>
          {predictions.map((prediction, index) => (
            <Prediction key={`${prediction.id}-${index}`} {...prediction} />
          ))}
        </>
      )}
      {tab === "following" && (
        <>
          {followingPredictions.map((prediction, index) => (
            <Prediction key={`${prediction.id}-${index}`} {...prediction} />
          ))}
        </>
      )}
      {tab === "past" &&
        pastPredictions.map((prediction, index) => (
          <PastPrediction key={`${prediction.id}-${index}`} {...prediction} />
        ))}
      {tab === "filter" && <div>coming up</div>}
    </div>
  );
}

export default Home;
