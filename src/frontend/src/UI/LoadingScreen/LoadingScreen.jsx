import React from 'react';
import Spinner from '../Spinner/Spinner';
import classes from './LoadingScreen.module.css'

const LoadingScreen = () => {

    return (
        <div className={classes.screen}>
            <Spinner/>
        </div>
    );
};

export default LoadingScreen;