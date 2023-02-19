import React, { useEffect } from "react";
import classes from "./Container.module.css";
const Container = ({ children }) => {
    return <div className={classes.container}>{children}</div>;
};

export default Container;
