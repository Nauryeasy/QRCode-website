import React from "react";
import classes from "./Container.module.css";
const Container = ({ children, ...other }) => {
    return <div className={classes.container} {...other}>{children}</div>;
};

export default Container;
