import axios, { CancelTokenSource } from "axios";
import { useEffect, useState, useCallback } from "react";

export const useFetchData = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = useCallback(
    async (cancelToken?: CancelTokenSource) => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<T>(url, {
          cancelToken: cancelToken?.token,
        });
        setData(data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          setError(err.message || "Something went wrong...");
        } else {
          setError("An unexpected error occurred");
          console.error(err);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    fetchData(cancelToken);
    return () => cancelToken.cancel();
  }, [fetchData]);

  const refetch = () => fetchData();

  return { data, error, isLoading, refetch };
};
