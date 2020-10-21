import React, { useContext, useEffect } from "react";
import { Paper } from "@material-ui/core";
import Header from "../components/Header";
import FeaturesSection from "../components/FeaturesSection";
import FeaturesSection2 from "../components/FeatureSection2";
import { ThemeContext } from "../context/ThemeProvider";
import FeaturesSection3 from "../components/FeatureSection3";
import Footer from "../components/Footer";
import EndSection from "../components/EndSection";

const HomePage = () => {
  const currentTheme = useContext(ThemeContext);
  useEffect(() => {
    currentTheme.setTheme("dark");
  });
  return (
    <Paper style={{ backgroundColor: "black" }}>
      <Header />
      <FeaturesSection />
      <FeaturesSection2 />
      <FeaturesSection3 />
      <EndSection />
      <Footer />
    </Paper>
  );
};

export default HomePage;
