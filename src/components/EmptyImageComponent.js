import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import {Typography} from "@material-ui/core";
import {ThemeContext} from "../context/ThemeProvider";

const EmptyImageComponent = () => {
    // const currentTheme = useContext(ThemeContext);
    return (
        <Grid spacing={0}
              container
              direction="column"
              justify="flex-start"
              alignItems="center"
        >
            <Grid item>
                {/*{currentTheme.theme === 'light' ? <img*/}
                {/*        src='https://res-console.cloudinary.com/gauravthakur/thumbnails/transform/v1/image/upload//v1600787980/ZW1wdHlMaWdodF94cnBmNGU=/drilldown'*/}
                {/*        alt='No Tile Found'/> :*/}
                {/*    <img*/}
                {/*        src='https://res-console.cloudinary.com/gauravthakur/thumbnails/transform/v1/image/upload//v1600789033/RW1wdHktYnJvX2RxdmdjaA==/drilldown'*/}
                {/*        alt='no item found'/>}*/}
            </Grid>
            <Grid item>
                <Typography variant='h6'>
                    No item found
                </Typography>
            </Grid>
        </Grid>

    )
}

export default EmptyImageComponent;