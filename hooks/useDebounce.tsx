import { useState, useEffect } from "react";

export const useDebounce = <T,>(searchFilter: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(searchFilter);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchFilter);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchFilter, delay]);

  return debouncedValue;
};
