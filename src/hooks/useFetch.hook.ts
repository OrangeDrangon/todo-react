import { useState, useEffect } from "react";

export function useFetch<T>(
  url: string,
  options?: RequestInit
): IFetchStates<T> {
  const [error, setError] = useState<ResponseError>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<ResponseData<T>>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setData(data);
        } else {
          setError(new Error(response.statusText));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [url, options]);

  return { error, loading, data };
}

export type ResponseError = Error | null;
export type ResponseData<T> = T | null;

export interface IFetchStates<T> {
  error: ResponseError;
  loading: boolean;
  data: ResponseData<T>;
}
