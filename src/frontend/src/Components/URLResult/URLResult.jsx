import React, { useEffect, useState } from "react";
import Pagination from "../../UI/Pagination/Pagination";
import Comments from "../../UI/Pagination/Pagination";
import ReviewPane from "../../UI/ReviewPane/ReviewPane";
import StatisticPane from "../../UI/StatisticPane/StatisticPane";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import classes from "./URLResult.module.css";
import { postReview } from "../../utils/http";
import SendReviewPanel from "../../UI/SendReviewPanel/SendReviewPanel";
import useSendReviewPanel from "../../hooks/useSendReviewPanel";

// Страница с результатами анализа URL
const URLResult = () => {
    // Параметры
    const params = new URLSearchParams(document.location.search);
    const statistic = JSON.parse(params.get("statistic"));
    const reviews = JSON.parse(params.get("reviews"));
    const url = JSON.parse(params.get("url"));

    const {email, setEmail,text, setText,isValidEmail, setIsValidEmail,reviewsState, setReviewsState} = useSendReviewPanel(reviews);

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
                    Отзывы людей об этом URL (всего:{" "}
                    {reviewsState.length}):
                </div>
                {reviewsState.length !== 0 ? (
                    <Pagination data={reviewsState} />
                ) : (
                    <div className={classes.noreviews}>Пока отзывов нет</div>
                )}
                <SendReviewPanel url={url} SendReviewPanel={SendReviewPanel} />
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
