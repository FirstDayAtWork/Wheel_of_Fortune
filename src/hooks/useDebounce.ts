"use client";

import { useEffect, useState } from "react";

export default function useDebounce<T>(value: T, delay = 500): T {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(id);
  }, [delay, value]);

  return debounceValue;
}
