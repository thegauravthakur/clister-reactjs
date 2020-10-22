import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";

const Footer = () => {
  return (
    <Paper style={{ width: "100%", marginTop: "50px" }}>
      <Typography
        align="center"
        style={{
          fontSize: "1rem",
          lineHeight: 1.5,
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        © 2020 Copyright: <Link>Gaurav Thakur</Link> | Made with
        <span style={{ color: "red", fontSize: "22px" }}>❤</span> in India
      </Typography>
    </Paper>
  );
};

export default Footer;
