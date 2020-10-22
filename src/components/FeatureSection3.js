import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const FeaturesSection3 = () => {
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
                  True Dark Mode Experience
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  align={"center"}
                  style={{ fontFamily: "Courier Prime, monospace" }}
                >
                  Who don't loves dark mode? With CLister, you get true dark
                  mode experience. You can easily toggle between dark mode and
                  light mode with just one click. If you have any amoled device
                  with you, you gonna love the overall experience it provides.
                </Typography>
              </Grid>
            </Grid>
            <Grid item md xs={12}>
              <img
                className={styles.mobileImage}
                width={"100%"}
                alt={"CLister with sync"}
                src={
                  "https://res.cloudinary.com/gauravthakur/image/upload/v1603289614/undraw_dark_mode_2xam_ajplac.svg"
                }
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2} />
      </Grid>
    </motion.div>
  );
};

export default FeaturesSection3;
