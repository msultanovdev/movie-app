import axios, { CancelTokenSource } from "axios";
import { useEffect, useState, useCallback } from "react";
import { useDeepCompareMemoize } from "use-deep-compare-effect";

type FetchParams = {
  [key: string]: string;
};

type FetchType = {
  url: string;
  params?: FetchParams;
  isRequestNeed?: boolean;
};

export const useFetchData = <T>({
  url,
  params,
  isRequestNeed = true,
}: FetchType) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const memoizedParams = useDeepCompareMemoize(params);
  const fetchData = useCallback(
    async (cancelToken?: CancelTokenSource) => {
      if (!isRequestNeed) {
        setData(null);
        return;
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
