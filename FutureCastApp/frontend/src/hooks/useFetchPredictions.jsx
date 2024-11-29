import { useState, useEffect } from "react";

const useFetchPredictions = (userId) => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchPredictions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4000/api/predictions/${userId}`
        );
        if (!response.ok) throw new Error("Failed to fetch predictions");
        const data = await response.json();
        setPredictions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [userId]);

  return { predictions, loading, error };
};

export default useFetchPredictions;
