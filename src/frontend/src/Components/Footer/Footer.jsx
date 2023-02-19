import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.footer}>
                <div className={classes.contacts}>
                    <b>Made by:</b>
                    <span>Plusnin Alexander (FrontEnd)</span>
                    <span>Ilin Kirill (BackEnd)</span>
                    <span>Karavaev Ivan (BackEnd)</span>
                </div>

                <div className={classes.telegramBot}>Telegram Bot</div>

                <div className={classes.stack}>
                    <span>Django</span> (Python), <span>SQLite</span>,{" "}
                    <span>React</span> (JS)
                </div>
            </div>
        </div>
    );
};

export default Footer;
