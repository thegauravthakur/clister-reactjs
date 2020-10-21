import React from "react";
import { Button, Grid, Typography, useTheme } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const EndSection = () => {
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });
  return (
    <Grid justify={"center"} container style={{ marginTop: "100px" }}>
      <Grid item sm={3} />
      <Grid
        spacing={isMobile ? 0 : 2}
        alignItems={"center"}
        item
        sm={6}
        container
        direction={"column"}
      >
        <Grid item>
          <Typography
            align={"center"}
            style={{ fontFamily: "Fredoka One, cursive" }}
            variant={"h4"}
          >
            So, what are you waiting for?
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            align={"center"}
            style={{
              fontFamily: "Courier Prime, monospace",
              margin: isMobile ? "20px 0px 20px 0px" : 0,
            }}
          >
            CLister will make you more organized and productive. You can manage
            all your related tasks in a sections and create different sections
            for different type of chores. Join Us by creating account right now.
            Believe me, it will only take your 30 seconds.
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={() => history.push("/login")} variant="outlined">
            Create Account
          </Button>
        </Grid>
      </Grid>

      <Grid item sm={3} />
    </Grid>
  );
};

export default EndSection;
