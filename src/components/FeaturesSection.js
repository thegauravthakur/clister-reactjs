import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const FeaturesSection = () => {
  const useStyle = makeStyles((theme) => ({
    mobileImage: {
      [theme.breakpoints.down("md")]: {
        maxHeight: "200px",
      },
    },
  }));
  const styles = useStyle();
  return (
    <div>
      <Grid container style={{ marginTop: "100px" }}>
        <Grid item md={2} />
        <Grid item md={8}>
          <Grid container>
            <Grid
              direction={"column"}
              item
              container
              md
              xs={12}
              justify={"space-evenly"}
            >
              <Grid item>
                <Typography
                  align={"center"}
                  style={{ fontFamily: "Fredoka One, cursive" }}
                  variant={"h4"}
                >
                  Write Once, Sync Everywhere
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  align={"center"}
                  style={{ fontFamily: "Courier Prime, monospace" }}
                >
                  With CLister, you can access your account on any device. For
                  Android device, we have an application. CLister also have a
                  progressive web app which you can access on any device and
                  install it as native application
                </Typography>
              </Grid>
            </Grid>
            <Grid item md xs={12}>
              <img
                className={styles.mobileImage}
                width={"100%"}
                alt={"CLister with sync"}
                src={
                  "https://res.cloudinary.com/gauravthakur/image/upload/v1603286386/undraw_file_sync_ot38_iftbtv.svg"
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2} />
      </Grid>
    </div>
  );
};

export default FeaturesSection;
