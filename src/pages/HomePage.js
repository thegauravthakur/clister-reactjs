import React, { useContext, useEffect } from "react";
import { createMuiTheme, Paper, ThemeProvider } from "@material-ui/core";
import Header from "../components/Header";
import FeaturesSection from "../components/FeaturesSection";
import FeaturesSection2 from "../components/FeatureSection2";
import { ThemeContext } from "../context/ThemeProvider";
import FeaturesSection3 from "../components/FeatureSection3";
import Footer from "../components/Footer";
import EndSection from "../components/EndSection";

const HomePage = () => {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ backgroundColor: "black" }}>
        <Header />
        <FeaturesSection />
        <FeaturesSection2 />
        <FeaturesSection3 />
        <EndSection />
        <Footer />
      </Paper>
    </ThemeProvider>
  );
};

export default HomePage;
