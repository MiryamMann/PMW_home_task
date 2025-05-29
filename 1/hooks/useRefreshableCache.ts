import { useEffect, useState } from "react";

type Fetcher<T> = () => Promise<T>;

export function useRefreshableCache<T>(
  key: string,
  fetcher: Fetcher<T>,
  maxAgeMs: number,
  refreshToken?: number
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    const cachedRaw = localStorage.getItem(key);
    let shouldFetch = true;

    if (cachedRaw) {
      try {
        const cached = JSON.parse(cachedRaw);
        const age = Date.now() - cached.updatedAt;

        if (age < maxAgeMs) {
          setData(cached.data);
          setLoading(false);
          shouldFetch = false;
        } else {
          setIsStale(true);
        }
      } catch {
        localStorage.removeItem(key);
      }
    }

    if (shouldFetch || refreshToken) {
      fetcher()
        .then((fresh) => {
          setData(fresh);
          localStorage.setItem(key, JSON.stringify({
            updatedAt: Date.now(),
            data: fresh
          }));
        })
        .catch((err) => {
          console.error("❌ useRefreshableCache error:", err);
        })
        .finally(() => setLoading(false));
    }
  }, [key, refreshToken]);

  return { data, loading, isStale };
}
