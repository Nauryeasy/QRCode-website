import React, { useContext, useState } from "react";
import { ErrorsContext } from "../../context";
import classes from "./Errors.module.css";
const Errors = ({ text }) => {
    const context = useContext(ErrorsContext);
    return <div>{context.text}
    <button onClick={() => context = [...context, '1']}></button></div>;
};

export default Errors;
