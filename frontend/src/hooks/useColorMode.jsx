import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [storedColorMode, setStoredColorMode] = useLocalStorage(
    "color-theme",
    "light"
  );
  const [colorMode, setColorMode] = useState(storedColorMode);

  // Function to update both state and localStorage
  const updateColorMode = (newMode) => {
    setColorMode(newMode);
    setStoredColorMode(newMode);
  };

  useEffect(() => {
    const className = "dark";
    const htmlElement = window.document.documentElement;

    if (colorMode === "dark") {
      htmlElement.classList.add(className);
    } else {
      htmlElement.classList.remove(className);
    }
  }, [colorMode]);

  useEffect(() => {
    // Sync with localStorage changes
    setColorMode(storedColorMode);
  }, [storedColorMode]);

  return [colorMode, updateColorMode];
};

export default useColorMode;
