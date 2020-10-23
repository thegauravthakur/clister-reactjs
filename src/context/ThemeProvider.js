import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export const ThemeContext = React.createContext("dark");
export const MyThemeProvider = ({ children }) => {
  const [pending, setPending] = useState(false);
  const [themeType, setThemeType] = useState("dark");
  useEffect(() => {
    setPending(true);
    const storedTheme = localStorage.currentTheme;
    if (storedTheme === undefined) {
      setThemeType("dark");
      setPending(false);
    } else {
      setThemeType(storedTheme);
      setPending(false);
    }
  }, []);
  if (pending) {
    return (
      <div
        style={{
          backgroundColor: themeType === "dark" ? "black" : "white",
          minHeight: "100vh",
        }}
      >
        <LinearProgress color="secondary" />
      </div>
    );
  }
  return (
    <ThemeContext.Provider
      value={{
        theme: themeType,
        toggle: () => setThemeType(themeType === "dark" ? "light" : "dark"),
        setTheme: (th) => setThemeType(th),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
