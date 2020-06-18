import React, {
  FC,
  useState,
  createContext,
  useCallback,
  useContext,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import type { Theme } from "@material-ui/core/styles";
import noop from "lodash-es/noop";

import dark from "./dark";
import light from "./light";

export type ThemeIdentifier = "dark" | "light";

interface ThemeContext {
  currentTheme: ThemeIdentifier;
  setLightTheme: () => void;
  setDarkTheme: () => void;
}

const ThemeContext = createContext<ThemeContext>({
  currentTheme: "light",
  setDarkTheme: noop,
  setLightTheme: noop,
});

/**
 * Color scheme preference detection via media query, if possible.
 */
const prefersDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const ThemeProvider: FC = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(prefersDarkMode() ? dark : light);

  const setLightTheme = useCallback(() => {
    setTheme(light);
  }, []);

  const setDarkTheme = useCallback(() => {
    setTheme(dark);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        setLightTheme,
        setDarkTheme,
        currentTheme: theme === dark ? "dark" : "light",
      }}
    >
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export function useThemeContext(): ThemeContext {
  return useContext(ThemeContext);
}
