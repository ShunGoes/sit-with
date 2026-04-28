import { useEffect, useState } from "react";

/**
 * A custom hook that debounces a value.
 * 
 * @param input The input value to debounce.
 * @param time The delay time in milliseconds.
 * @returns The debounced value.
 */
export function useDebounce<T>(input: T, time: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(input);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    return () => {
      clearTimeout(handler);
    };
  }, [input, time]);

  return debouncedValue;
}
