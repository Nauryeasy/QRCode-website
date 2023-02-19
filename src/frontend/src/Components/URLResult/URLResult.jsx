import React, { useEffect, useState } from "react";
import Pagination from "../../UI/Pagination/Pagination";
import Comments from "../../UI/Pagination/Pagination";
import ReviewPane from "../../UI/ReviewPane/ReviewPane";
import StatisticPane from "../../UI/StatisticPane/StatisticPane";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import classes from "./URLResult.module.css";
const URLResult = () => {
    const params = new URLSearchParams(document.location.search);
    const statistic = JSON.parse(params.get("statistic"));
    const reviews = JSON.parse(params.get("reviews"));
    const count_reviews = JSON.parse(params.get("count_reviews"));
    const url = JSON.parse(params.get("url"));

    const [email, setEmail] = useState("");
    const [text, setText] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [reviewsState, setReviewsState] = useState(reviews);

    function checkIsValidEmail(email) {
        const expression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
        const regex = new RegExp(expression);

        if (email.match(regex)) {
            return true;
        } else {
            return false;
        }
    }
    function onOk(res) {
        setReviewsState([...reviewsState, { email: email, comment: text }]);
        setText("");
        setEmail("");
        NotificationManager.success("Ваш отзыв был добавлен", "Успех");
    }

    function onError(err) {
        NotificationManager.error(String(err), "Ошибка");
    }

    function addReview(url, email, text) {
        if (email === "" || !checkIsValidEmail(email))
            return NotificationManager.error("Неправильный EMAIL", "Ошибка");
        if (text.length > 100)
            return NotificationManager.error(
                "Слишком большой текст (макс. 100 символов)",
                "Ошибка",
            );
        if (text.length == 0)
            return NotificationManager.error("Пустое сообщение", "Ошибка");
        axios
            .post(
                process.env.REACT_APP_QR_ADD_REVIEWS,
                {
                    url: url,
                    email: email,
                    review: text,
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
            if (email === "" || checkIsValidEmail(email)) {
                setIsValidEmail(true);
            } else {
                setIsValidEmail(false);
            }
        }, 200);
        return () => clearTimeout(timeOutId);
    }, [email]);
    return (
        <div className={classes.wrapper}>
            <div className={classes.statisticsWrapper}>
                <h2>{url}</h2>
                <StatisticPane
                    isGood={!statistic.redirect}
                    name={
                        statistic.redirect
                            ? "Перенаправление на другой домен"
                            : "Перенаправления нет"
                    }></StatisticPane>
                <StatisticPane
                    isGood={statistic.https}
                    name={
                        statistic.https ? "Поддержка HTTPS" : "Нет HTTPS"
                    }></StatisticPane>
                <StatisticPane
                    isGood={statistic.ssl}
                    name={
                        statistic.ssl ? "Наличие SSL" : "Нет SSL"
                    }></StatisticPane>
                <StatisticPane
                    isGood={!statistic.suspicious}
                    name={
                        statistic.suspicious
                            ? "Похож на другой популярный сайт"
                            : "Не похож на другие популярные домены"
                    }></StatisticPane>
                <StatisticPane
                    isGood={!statistic.suspicious_js}
                    name={
                        statistic.suspicious_js
                            ? "Есть подозрительный JavaScript"
                            : "Нет подозрительного JavaScript"
                    }></StatisticPane>
                <StatisticPane
                    isGood={!statistic.Long_level}
                    name={
                        statistic.Long_level
                            ? "Слишком много доменных уровней"
                            : "Нормальное кол-во доменных уровней"
                    }></StatisticPane>
                <StatisticPane
                    isGood={!statistic.Unreadability}
                    name={
                        statistic.Unreadability ? "Плохо читаемый" : "Читаемый"
                    }></StatisticPane>
            </div>
            <div className={classes.reviewsWrapper}>
                <div className={classes.reviewsTitle}>
                    Отзывы людей об этом URL (всего: {count_reviews}):
                </div>
                {reviewsState.length !== 0 ? (
                    <Pagination data={reviewsState} />
                ) : (
                    <div className={classes.noreviews}>Пока отзывов нет</div>
                )}
                <div className={classes.sendOurReviewWrapper}>
                    <div className={classes.ourReviewTitle}>
                        Оставьте свой отзыв:
                    </div>

                    <input
                        data-invalidemail={!isValidEmail}
                        onChange={(e) => {
                            if (email === "") setIsValidEmail(false);
                            setEmail(e.target.value);
                        }}
                        placeholder="example@gmail.com"
                        className={classes.emailInput}
                        value={email}></input>
                    <div className={classes.sendOurReviewAreaWrapper}>
                        <textarea
                            className={classes.sendOurReviewArea}
                            placeholder={"Крутой сайт!"}
                            value={text}
                            onChange={(e) =>
                                setText(e.target.value)
                            }></textarea>
                        <div
                            className={
                                text.length >= 100
                                    ? classes.wordsLength + " " + classes.over
                                    : classes.wordsLength
                            }>
                            {text.length}/100
                        </div>
                    </div>

                    <button
                        className={classes.sendOurReview}
                        disabled={!text.length >= 100 || !isValidEmail}
                        onClick={() => addReview(url, email, text)}>
                        Отправить
                    </button>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default URLResult;

// {
//   "statistic": {
//     'redirect': True/False,
//     'https': True/False,
//     'ssl': True/False,
//     'suspicious': True/False,
//     'suspicious_js': True/False,
//     'Long level': True/False,
//     'Unreadability': True/False
//   },
//   "reviews": {
//     x словарей вида
//     "id(Считается от 0)": {
//       "email": 'jfgdkjfdkljkdfjg@gmailic.hui',
//       'comment': 'text commentaria'
//     }
//   },
//   "count_reviews": x
// }

// {
//     "count_reviews": x,
//     "reviews":
//     x словарей вида
//     "id(Считается от 0)": {
//         "email": 'jfgdkjfdkljkdfjg@gmailic.hui',
//         'comment': 'text commentaria'
//       }
//   }
