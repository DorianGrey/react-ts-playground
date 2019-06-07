import { useState, useEffect } from "react";

export const useCurrentDateTime = (updateInterval = 1000) => {
  const [state, setState] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setState(new Date()), updateInterval);

    return () => clearInterval(intervalId);
  }, [updateInterval]);

  return [state];
};
