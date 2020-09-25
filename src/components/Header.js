import React from "react";
import HomeAppBar from "./HomeAppBar";
import {Button, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useMediaQuery} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import {use100vh} from 'react-div-100vh'
import Typewriter from 'typewriter-effect';

const Header = () => {
    const height = use100vh();
    const useStyle = makeStyles((theme) => ({
        title: {

            margin: '20px 0 20px 0',
            fontFamily: 'Courier Prime, monospace',
            [theme.breakpoints.down('md')]: {
                fontSize: '1.8em'
            },
        },
        image: {

            [theme.breakpoints.down('md')]: {
                maxWidth: '80%',
            },
            [theme.breakpoints.up('sm')]: {
                maxWidth: '90%',
            },
            [theme.breakpoints.up('lg')]: {
                maxWidth: '900px',
            },
        }
    }))
    const classes = useStyle();
    const matches = useMediaQuery(theme => theme.breakpoints.up('sm'));
    // const matches2 = useMediaQuery(theme => theme.breakpoint.up('md'));
    const history = useHistory();

    return (

        <div style={{
            minHeight: height,
            display: "flex",
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: 'black',
            alignItems: 'center'
        }}>
            <HomeAppBar/>
            <Typography className={classes.title} variant='h3' align='center'>
                <Typewriter
                    options={{
                        strings: ['Organize your day', 'Increase your focus',],
                        autoStart: true,
                        loop: true,
                    }}

                />
                <br/>
                with <span style={{color: 'teal'}}><strong>CLister</strong></span>
            </Typography>
            <Button onClick={() => history.push('/login')} variant='outlined'>Get Started</Button>

            <img className={classes.image} style={{margin: '0 auto',}}
                 src={!matches ? 'https://res.cloudinary.com/gauravthakur/image/upload/v1600922671/mobileclister_ztraac.png' : 'https://res.cloudinary.com/gauravthakur/image/upload/v1600920131/impdesk1_ulzt3r.png'}
                 alt='add item'/>

        </div>
    )
}

export default Header;
