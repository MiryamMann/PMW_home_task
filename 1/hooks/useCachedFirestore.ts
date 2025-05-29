import { useEffect, useState } from "react";

type Fetcher<T> = () => Promise<T>;

export function useCachedFirestore<T>(
  key: string,
  fetcher: Fetcher<T>,
  maxAgeMs: number
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cachedRaw = localStorage.getItem(key);

    if (cachedRaw) {
      try {
        const cached = JSON.parse(cachedRaw);
        const age = Date.now() - cached.updatedAt;

        if (age < maxAgeMs) {
          setData(cached.data);
          setLoading(false);
        }
      } catch {
        localStorage.removeItem(key);
      }
    }

    // תמיד נביא גרסה עדכנית ברקע
    fetcher().then((fresh) => {
      setData(fresh);
      setLoading(false);
      localStorage.setItem(
        key,
        JSON.stringify({ updatedAt: Date.now(), data: fresh })
      );
    });
  }, [key]);

  return { data, loading };
}
