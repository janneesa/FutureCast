import { useState, useEffect } from "react";

const useFetchPredictions = (userId) => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchPredictions = async (userId) => {
      setLoading(true);
      try {
        const response = await fetch(`/api/predictions/byUserId/${userId}`);
        if (!response.ok) {
          const data = await response.json();
          setError(data.error);
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

    fetchPredictions(userId);
  }, [userId]);

  return { predictions, loading, error };
};

export default useFetchPredictions;
