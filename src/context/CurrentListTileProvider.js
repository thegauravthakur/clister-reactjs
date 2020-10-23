import React, { useContext, useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ThemeContext } from "./ThemeProvider";

export const CurrentListTileContext = React.createContext("");
export const CustomListTileProvider = ({ children }) => {
  const [pending, setPending] = useState(false);
  const [title, setTitle] = useState("");
  const data = useContext(ThemeContext);
  useEffect(() => {
    setPending(true);
    const listName = localStorage.listName;
    if (listName === undefined) {
      setTitle("default");
      setPending(false);
    } else {
      setTitle(listName);
      setPending(false);
    }
  }, []);
  if (pending) {
    return (
      <div
        style={{
          backgroundColor: data.theme === "dark" ? "black" : "white",
          minHeight: "100vh",
        }}
      >
        <LinearProgress color="secondary" />
      </div>
    );
  }
  return (
    <CurrentListTileContext.Provider
      value={{
        title: title,
        toggle: (data) => setTitle(data),
      }}
    >
      {children}
    </CurrentListTileContext.Provider>
  );
};
