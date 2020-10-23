import React from "react";
import HomeAppBar from "./HomeAppBar";
import { Typography } from "@material-ui/core";
import { useMediaQuery } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { use100vh } from "react-div-100vh";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";

const Header = () => {
  const height = use100vh();
  const useStyle = makeStyles((theme) => ({
    title: {
      margin: "20px 0 20px 0",
      fontFamily: "Courier Prime, monospace",
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

  return (
    <div>
      <HomeAppBar />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {
            scale: 0.8,
            opacity: 0,
          },
          visible: {
            scale: 1,
            opacity: 1,
            transition: {
              duration: 0.6,
            },
          },
        }}
        style={{
          minHeight: height - 64,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "black",
          alignItems: "center",
        }}
      >
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
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://bit.ly/clister"
        >
          <motion.img
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
      </motion.div>
    </div>
  );
};

export default Header;
