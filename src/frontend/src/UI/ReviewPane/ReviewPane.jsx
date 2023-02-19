import React from "react";
import classes from "./ReviewPane.module.css";
import ShowMoreText from "react-show-more-text";

const ReviewPane = ({ email, message }) => {
    return (
        <div className={classes.wrapper}>
            <span className={classes.email}>{email}</span>
            <ShowMoreText
                lines={5}
                className={classes.message}
                more="[Далее]"
                less="[Спрятать]"
                anchorClass={classes.moreLessButtons}
                truncatedEndingComponent={"... "}>
                {message}
            </ShowMoreText>
        </div>
    );
};

export default ReviewPane;
