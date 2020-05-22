import { useState, useEffect } from "react";

type CurrentDateTimeHook = (updateInterval?: number) => [Date];

export const useCurrentDateTime: CurrentDateTimeHook = (
  updateInterval = 1000
) => {
  const [state, setState] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setState(new Date()), updateInterval);

    return () => clearInterval(intervalId);
  }, [updateInterval]);

  return [state];
};
