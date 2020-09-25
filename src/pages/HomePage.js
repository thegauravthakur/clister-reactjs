import React, {useContext, useEffect} from "react";
import {Paper} from "@material-ui/core";
import Header from "../components/Header";
import FeaturesSection from "../components/FeaturesSection";
import {ThemeContext} from "../context/ThemeProvider";

const HomePage = () => {
    const currentTheme = useContext(ThemeContext);
    useEffect(() => {
        currentTheme.setTheme('dark');
    })
    return (
        <Paper style={{backgroundColor: 'black'}}>
            <Header/>
            <FeaturesSection/>
        </Paper>
    );
};

export default HomePage;
