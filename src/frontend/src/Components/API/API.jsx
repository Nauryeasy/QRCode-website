import React from "react";
import classes from "./API.module.css";

const API = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.module}>
                <div className={classes.title}>title</div>
                <div className={classes.body}>
                    <div className={classes.subtitle}></div>
                    <div className={classes.json}>json</div>
                </div>
            </div>
        </div>
    );
};

export default API;
