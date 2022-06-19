import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export const useFetchData = (url = 'https://jsonplaceholder.typicode.com/todos') => {
  const [loading, setIsLoading] = useState(false);
  const [data, setData] = useState(undefined);

  const [error, setError] = useState(undefined);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await axios.get(url);

      if (!result.data) {
        setError({ message: 'Request returned no response' });
        return;
      }

      setData(result.data);
    } catch (e) {
      //TODO: clear console
      console.log(e);
      setError(e);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (!url) return;

    //fetch data
    fetchData();
  }, [fetchData, url]);

  return {
    loading,
    data,
    error,
  };
};
