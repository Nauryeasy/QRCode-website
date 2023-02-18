import React, { useState, useEffect } from "react";
import classes from "./URLChecker.module.css";
import { NotificationManager } from "react-notifications";
import axios from "axios";
const URLChecker = () => {
    const [input, setInput] = useState("");
    const [isValidUrl, setIsValidUrl] = useState(true);
    function isValidURL(url) {
        const expression =
            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        const regex = new RegExp(expression);

        if (url.match(regex)) {
            return true;
        } else {
            return false;
        }
    }
    function onOk(res) {
        NotificationManager.success('Запросы был отправлен', "Успех");
        console.log(res);
    }
    function onError(err) {
        NotificationManager.error(String(err), "Ошибка");
        console.log(err);
    }
    function onAcceptURL() {
        if (!isValidURL || input === '') return NotificationManager.error('nt',"Пиздец ты умный");
        console.log(input)
        axios
            .post(process.env.REACT_APP_URL_SEND_ADDRESS, {
                url: input,
            })
            .then((response) => {
                onOk(response);
            })
            .catch((error) => {
                onError(error);
            });
    }

    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (isValidURL(input) || input === "") {
                setIsValidUrl(true);
            } else {
                setIsValidUrl(false);
            }
        }, 200);
        return () => clearTimeout(timeOutId);
    }, [input]);

    return (
        <div className={classes.wrapper}>
            <span className={classes.text}>
                Введите URL сайта, чтобы его проверить
            </span>
            <div className={classes.inputWrapper}>
                <input
                    className={classes.input}
                    value={input}
                    placeholder="https://google.com/"
                    onChange={(e) => {
                        if (input === "") setIsValidUrl(false);
                        setInput(e.target.value);
                    }}
                    data-invalidurl={!isValidUrl}></input>
                <button
                    disabled={!isValidUrl}
                    className={classes.inputAccept}
                    onClick={onAcceptURL}>
                    {isValidUrl ? "➤" : "✕"}
                </button>
            </div>
        </div>
    );
};

export default URLChecker;
