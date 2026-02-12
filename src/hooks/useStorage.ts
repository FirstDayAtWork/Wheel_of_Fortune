import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { getLSData, removeLSData, setLSData } from "../utils/local-storage";

export function useStorage<T>(
  initValue: T,
  key: string,
): [T, Dispatch<SetStateAction<T>>, (key: string) => void] {
  const getItem: T = getLSData(key) ?? initValue;
  const [value, setValue] = useState(getItem);

  useEffect(() => {
    setLSData(key, value);
  }, [value, key]);

  return [value, setValue, removeLSData];
}
