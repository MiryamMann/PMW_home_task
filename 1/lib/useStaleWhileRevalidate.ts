import { useEffect, useState } from "react";

type Fetcher<T> = () => Promise<T>;

export function useStaleWhileRevalidate<T>(
  key: string,
  fetcher: Fetcher<T>,
  maxAgeMs: number
) {
  const [data, setData] = useState<T | null>(null);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    const cachedRaw = localStorage.getItem(key);

    if (cachedRaw) {
      const cached = JSON.parse(cachedRaw);
      const isValid = Date.now() - cached.updatedAt < maxAgeMs;

      setData(cached.data);

      if (!isValid) setIsStale(true);
    } else {
      setIsStale(true);
    }

    if (isStale) {
      fetcher().then((freshData) => {
        setData(freshData);
        localStorage.setItem(
          key,
          JSON.stringify({ updatedAt: Date.now(), data: freshData })
        );
        setIsStale(false);
      });
    }
  }, [key, fetcher, maxAgeMs, isStale]);

  return { data, isStale };
}
