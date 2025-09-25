"use client";

import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const value = window.localStorage.getItem(key);

      if (value) {
        try {
          const parsed = JSON.parse(value) as T;
          setStoredValue(parsed);
        } catch (error) {
          console.log(error);
          setStoredValue(initialValue);
        }
      } else {
        setStoredValue(initialValue);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && storedValue) {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    }
  }, [storedValue]);

  return [storedValue as T, setStoredValue] as const;
};
