import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const useAsyncStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState(initialValue);

  useEffect(() => {
    AsyncStorage.getItem(key)
      .then(value => {
        if (value === null) return initialValue;
        return JSON.parse(value);
      })
      .then(setStoredValue)
  }, [key]);

  const setValue = (value: T) => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    AsyncStorage.setItem(key, JSON.stringify(valueToStore));
  }

  return [storedValue, setValue];
}

export default useAsyncStorage
