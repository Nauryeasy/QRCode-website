import React, { useState, useEffect, useContext } from "react";
import classes from "./URLChecker.module.css";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { isLoadingContext } from "../../context";
import { Navigate, useNavigate } from "react-router-dom";
import LoadingScreen from "../../UI/LoadingScreen/LoadingScreen";
const URLChecker = () => {
    const navigate = useNavigate();

    const [input, setInput] = useState("");
    const [isValidUrl, setIsValidUrl] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
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
        console.log(res.data);
        setIsLoading(false);
        if (!res.data)
            return NotificationManager.error(
                "Пустой ответ ¯_(ツ)_/¯",
                "Ошибка",
            );
        const statistic = res.data.statistic;
        const reviews = res.data.reviews;
        const count_reviews = res.data.count_reviews;
        navigate(
            "/URLResult?statistic=" +
                statistic +
                "&reviews=" +
                reviews +
                "&count_reviews=" +
                count_reviews,
        );
    }
    function onError(err) {
        setIsLoading(false);
        NotificationManager.error(String(err), "Ошибка");
    }
    function onAcceptURL() {
        if (!isValidURL || input === "")
            return NotificationManager.error("Пустой URL", "Ошибка");
        setIsLoading(true);
        axios
            .post(
                process.env.REACT_APP_URL_SEND_ADDRESS,
                {
                    url: input,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                },
            )
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
            {isLoading && <LoadingScreen></LoadingScreen>}
        </div>
    );
};

export default URLChecker;
