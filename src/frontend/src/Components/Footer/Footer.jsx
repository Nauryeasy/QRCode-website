import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={classes.wrapper}>
            <div className={classes.footer}>
                <div className={classes.contacts}>
                    <b>Made by:</b>
                    <span>Alexander Plusnin (FrontEnd)</span>
                    <span>Kirill asdasd (BackEnd)</span>
                    <span>Ivan asdasd (BackEnd)</span>
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
