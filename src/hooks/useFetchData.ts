import axios, { CancelTokenSource } from "axios";
import { useEffect, useState, useCallback, useMemo } from "react";

type FetchParams = {
  [key: string]: string;
};

type FetchType = {
  url: string;
  params: FetchParams;
};

export const useFetchData = <T>({ url, params }: FetchType) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);
  const fetchData = useCallback(
    async (cancelToken?: CancelTokenSource) => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get<T>(url, {
          cancelToken: cancelToken?.token,
          params: params,
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
    [url, memoizedParams]
  );

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    fetchData(cancelToken);
    return () => cancelToken.cancel();
  }, [fetchData]);

  const refetch = () => fetchData();

  return { data, error, isLoading, refetch };
};
