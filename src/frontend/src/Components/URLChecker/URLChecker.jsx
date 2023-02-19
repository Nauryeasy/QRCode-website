import React, { useState, useEffect } from "react";
import classes from "./URLChecker.module.css";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../UI/LoadingScreen/LoadingScreen";
import { postUrl } from "../../utils/http";

// Страница с загрузкой URL
const URLChecker = ({setReviewsState}) => {
    const navigate = useNavigate();

    // Инпут с URL
    const [input, setInput] = useState("");

    // Состояние, показывающее валидность введенного URL
    const [isValidUrl, setIsValidUrl] = useState(true);

    // Экран загрузки
    const [isLoading, setIsLoading] = useState(false);

    // Если URL валидный
    function checkIsValidUrl(url) {
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
        setIsLoading(false);

        if (!res.data)
            return NotificationManager.error(
                "Пустой ответ ¯_(ツ)_/¯",
                "Ошибка",
            );
        // Если какого-то параметра анализа нет
        if (
            res.data.statistic === undefined ||
            res.data.reviews === undefined ||
            res.data.count_reviews === undefined
        )
            return NotificationManager.error("Некорректный ответ", "Ошибка");

        const statistic = res.data.statistic;
        const reviews = res.data.reviews;
        const count_reviews = res.data.count_reviews;

        // Перекинуть пользователя на страницу с результатами анализа
        navigate(
            "/URLResult?statistic=" +
                JSON.stringify(statistic) +
                "&reviews=" +
                JSON.stringify(reviews) +
                "&count_reviews=" +
                JSON.stringify(count_reviews) +
                "&url=" +
                JSON.stringify(input),
        );
    }

    // При ошибке во время отправления запроса
    function onError(err) {
        setIsLoading(false);
        NotificationManager.error(String(err), "Ошибка");
    }

    // При нажатии на кнопку отправления
    function onSendURL() {
        if (input === "" || !checkIsValidUrl(input))
            return NotificationManager.error("Неправильный URL", "Ошибка");
        setIsLoading(true);
        postUrl(input, onOk, onError);
    }

    // Перед тем, как проверить валидность URL в инпуте, подождать 200мс после окончания набора
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (checkIsValidUrl(input) || input === "") {
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
                    onClick={onSendURL}>
                    {isValidUrl ? "➤" : "✕"}
                </button>
            </div>
            {isLoading && <LoadingScreen></LoadingScreen>}
        </div>
    );
};

export default URLChecker;
