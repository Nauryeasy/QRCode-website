import React from "react";
import classes from "./Container.module.css";

// Контейнер для содержимого страниц. Ограничивает его ширину.
const Container = ({ children }) => {
    return <div className={classes.container}>{children}</div>;
};

export default Container;
