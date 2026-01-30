import { useEffect, useState } from "react";

interface QueryProps<T> {
  dependencies?: unknown[];
  queryFn: () => Promise<T>;
}

export function useQuery<T>({ queryFn, dependencies }: QueryProps<T>) {
  const [fetch, setFetch] = useState<{
    isLoading: boolean;
    data?: T;
    isError: boolean;
    error: string;
  }>({ isError: false, isLoading: true, error: "" });

  const refreshData = (data: T) => {
    setFetch((prev) => ({ ...prev, data }));
  };
  const fetchData = async () => {
    try {
      setFetch({
        isLoading: true,
        isError: false,
        error: "",
        data: undefined,
      });
      const data = await queryFn();
      setFetch({ isLoading: false, data, isError: false, error: "" });
    } catch (error: unknown) {
      setFetch({ isLoading: false, isError: true, error: String(error) });
    }
  };
  useEffect(() => {
    fetchData();
  }, [...(dependencies || [])]);

  return {
    ...fetch,
    refreshData,
    refetch: fetchData,
  };
}
