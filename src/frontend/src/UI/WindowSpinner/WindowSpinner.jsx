import React from "react";
import Spinner from "../Spinner/Spinner";
import { CSSTransition } from "react-transition-group";
import classes from "./WindowSpinner.module.css";
const WindowSpinner = ({ isLoading }) => {
    console.log(isLoading);
    return (
        <CSSTransition
            in={isLoading}
            timeout={200}
            classNames={{
                enterActive: classes.windowSpinnerEnter,
                enterDone: classes.windowSpinnerEnterActive,
                exitActive: classes.windowSpinnerExit,
                exitDone: classes.windowSpinnerExitActive,
            }}
            unmountOnExit>
            <div className={classes.windowSpinner}>
                <Spinner />
            </div>
        </CSSTransition>
    );
};

export default WindowSpinner;
