import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchData = <T>(url: string) => {
  const [data, setData] = useState<T>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get<T>(url);
      setData(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err?.message ?? "Something went wrong...");
      } else {
        console.log(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, isLoading };
};
