import React from 'react';
import classes from './StatisticPane.module.css'

const StatisticPane = ({isGood, name, text}) => {
    return (
        <div className={classes.wrapper}>
            <span className={classes.isGood} data-isgood={isGood}>{isGood ? '✓' : '✕'}</span>
            <span className={classes.name}>{name}</span>
        </div>
    );
};

export default StatisticPane;