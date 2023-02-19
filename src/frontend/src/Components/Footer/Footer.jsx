import React from "react";
import classes from "./Footer.module.css";

// Футер
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

                <a target="_blank" href="https://t.me/phone_defender_bot" className={classes.telegramBot}>Telegram Bot</a>
                
                <div className={classes.stack}>
                    <span>Django</span> (Python), <span>SQLite</span>,{" "}
                    <span>React</span> (JS)
                </div>
            </div>
        </div>
    );
};

export default Footer;
