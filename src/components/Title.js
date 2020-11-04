import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeContext } from "../context/ThemeProvider";

const Title = ({ listName }) => {
  const data = useContext(ThemeContext);
  const useStyle = makeStyles((theme) => ({
    title: {
      color: data.theme === "dark" ? "white" : "teal",
      margin: "20px 0 20px 0",
      fontFamily: ["Fredoka One", "cursive"],
      [theme.breakpoints.down("md")]: {
        fontSize: "2em",
      },
    },
  }));
  const classes = useStyle();
  return (
    <Typography className={classes.title} align="center" variant="h3">
      {listName}
    </Typography>
  );
};

export default Title;
