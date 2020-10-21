import React from "react";
import HomeAppBar from "./HomeAppBar";
import { Button, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { use100vh } from "react-div-100vh";
import Typewriter from "typewriter-effect";

const Header = () => {
  const height = use100vh();
  const useStyle = makeStyles((theme) => ({
    title: {
      margin: "20px 0 20px 0",

      [theme.breakpoints.down("md")]: {
        fontSize: "1.8em",
      },
    },
    image: {
      [theme.breakpoints.down("md")]: {
        maxWidth: "80%",
      },
      [theme.breakpoints.up("sm")]: {
        maxWidth: "90%",
      },
      [theme.breakpoints.up("lg")]: {
        maxWidth: "900px",
      },
    },
  }));
  const classes = useStyle();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const history = useHistory();

  return (
    <div
      style={{
        minHeight: height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "black",
        alignItems: "center",
      }}
    >
      <HomeAppBar />
      <Typography className={classes.title} variant="h3" align="center">
        <Typewriter
          options={{
            strings: ["Stay Organized", "Be Productive"],
            autoStart: true,
            loop: true,
          }}
        />
        <br />
        with{" "}
        <span style={{ color: "teal" }}>
          <strong>CLister</strong>
        </span>
      </Typography>
      <a target="_blank" rel="noopener noreferrer" href="http://bit.ly/clister">
        <img
          style={{ maxWidth: "150px" }}
          src={
            "https://res.cloudinary.com/gauravthakur/image/upload/v1603292095/google-play-badge_1_lwucjl.png"
          }
          alt={"clister play store"}
        />
      </a>

      <img
        className={classes.image}
        style={{ margin: "0 auto" }}
        src={
          !matches
            ? "https://res.cloudinary.com/gauravthakur/image/upload/v1600922671/mobileclister_ztraac.png"
            : "https://res.cloudinary.com/gauravthakur/image/upload/v1600920131/impdesk1_ulzt3r.png"
        }
        alt="add item"
      />
    </div>
  );
};

export default Header;
