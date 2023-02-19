import React, { useEffect, useState } from "react";
import Pagination from "../../UI/Pagination/Pagination";
import Comments from "../../UI/Pagination/Pagination";
import ReviewPane from "../../UI/ReviewPane/ReviewPane";
import StatisticPane from "../../UI/StatisticPane/StatisticPane";
import classes from "./URLResult.module.css";
const URLResult = ({ statistic, reviews, count_reviews }) => {
    statistic = {
        redirect: true,
        https: false,
        ssl: false,
        suspicious: true,
        suspicious_js: false,
        "Long level": true,
        Unreadability: true,
    };

    reviews = [
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment:
                "text 11111111111111111111111111111111111111111111111111121222222222222222222222222222222222222222222commentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "text commentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "text commentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "text commentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "text commentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "text commentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "text commentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "text commentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "text commentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "text commentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "text commentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "text commentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "aatext commentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "text com123mentaria",
        },
        {
            email: "jfgdkjfdkljkdfjg@gmailic.hui",
            comment: "text commezxcntaria",
        },
    ];

    const [ourReview, setOurReview] = useState("");

    return (
        <div className={classes.wrapper}>
            <div className={classes.statisticsWrapper}>
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
                    Отзывы людей об этом URL:
                </div>
                <Pagination data={reviews} />
                <div className={classes.sendOurReviewWrapper}>
                    <div className={classes.ourReviewTitle}>
                        Оставьте свой отзыв:
                    </div>
                    <textarea
                        className={classes.sendOurReviewArea}
                        placeholder={"Крутой сайт!"}
                        value={ourReview}
                        onChange={(e) => setOurReview(e.target.value)}></textarea>
                    <button className={classes.sendOurReview}>Отправить</button>
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
