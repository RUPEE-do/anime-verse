import { useState, useEffect, useCallback } from 'react';

const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // We memoize the fetch logic so it doesn't cause infinite loops
  const executeFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  return { data, loading, error, refetch: executeFetch };
};

export default useFetch;
