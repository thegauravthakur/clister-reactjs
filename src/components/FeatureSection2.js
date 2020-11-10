import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FeaturesSection2 = () => {
  const useStyle = makeStyles((theme) => ({
    mobileImage: {
      [theme.breakpoints.down("md")]: {
        maxHeight: "200px",
      },
    },
  }));
  const [ref, inView] = useInView({
    triggerOnce: true,
  });
  const styles = useStyle();
  return (
    <motion.div
      ref={ref}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <Grid container style={{ marginTop: "100px" }}>
        <Grid item md={2} />
        <Grid item md={8}>
          <Grid container>
            <Grid item md xs={12}>
              <img
                className={styles.mobileImage}
                width={"100%"}
                alt={"CLister with sync"}
                src={
                  "https://res.cloudinary.com/gauravthakur/image/upload/v1603288867/undraw_Note_list_re_r4u9_uetkbs.svg"
                }
              />
            </Grid>
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
                  Simple and Straight Forward
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  align={"center"}
                  style={{ fontFamily: "Courier Prime, monospace" }}
                >
                  While building CLister, clean user interface was our one of
                  the main goal. We have build CLister by keeping the Google's
                  Material UI guidelines in mind. CLister is easy to use. Even a
                  5 y/o can use it.
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2} />
      </Grid>
    </motion.div>
  );
};

export default FeaturesSection2;
