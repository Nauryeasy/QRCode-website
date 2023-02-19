import React from "react";
import classes from "./API.module.css";
import { prettyPrintJson } from "pretty-print-json";
import "./JSONPrettier.css";

// Страница с API
const API = () => {
    // документация в виде объекта (так удобнее)
    const api = [
        {
            method: "POST",
            url: "/url/",
            title: "Отправить URL на рассмотрение",
            jsonQuery: {
                url: "string",
            },
            jsonResponse: {
                statistic: {
                    redirect: "boolean",
                    https: "boolean",
                    ssl: "boolean",
                    suspicious: "boolean",
                    suspicious_js: "boolean",
                    "Long level": "boolean",
                    Unreadability: "boolean",
                },
                reviews: [
                    {
                        email: "string",
                        comment: "string",
                    },
                    {
                        email: "string",
                        comment: "string",
                    },
                ],
                count_reviews: "int",
            },
            varsExplain: [
                ["url", "URL проверяемого сайта"],
                ["statistic", "Информация о безопасности"],
                ["redirect", "Перенаправление"],
                ["https", "Поддержка HTTPS"],
                ["ssl", "Наличие SSL сертификата"],
                ["suspicious", "Подрожание популярному домену"],
                ["suspicious_js", "Подозрительный JavaScript код"],
                ["Long level", "Слишком длинный"],
                ["Unreadability", "Нечитаемый"],
            ],
        },
        {
            method: "POST",
            url: "/url/",
            title: "Отправить QR-код на рассмотрение",
            jsonQuery: {
                image: "binary (blob)",
            },
            jsonResponse: {
                url: "string",
            },
            varsExplain: [
                ["image", "Передаваемое фото в бинарном виде"],
                ["url", "Расшифрованный URL"],
            ],
        },
    ];

    // опции для jsonPrettier
    const jsonPrettierOptions = { quoteKeys: true, lineNumbers: true };
    let i = 1;
    // документация разворачивается в HTML
    return (
        <div className={classes.wrapper}>
            {api.map((api) => (
                <div className={classes.module}>
                    <div className={classes.title}>{i++}. {api.title}</div>
                    <div className={classes.url}>
                        {api.method} {api.url}
                    </div>
                    <div className={classes.body}>
                        <div className={classes.subtitle}>Запрос</div>
                        <div
                            className={classes.json}
                            dangerouslySetInnerHTML={{
                                __html: prettyPrintJson.toHtml(
                                    api.jsonQuery,
                                    jsonPrettierOptions,
                                ),
                            }}></div>
                        <div className={classes.subtitle}>Ответ</div>
                        <div
                            className={classes.json}
                            dangerouslySetInnerHTML={{
                                __html: prettyPrintJson.toHtml(
                                    api.jsonResponse,
                                    jsonPrettierOptions,
                                ),
                            }}></div>
                    </div>
                    <ul className={classes.varsExplain}>
                        {api.varsExplain.map((elem) => (
                            <li>
                                <span>{elem[0]}</span>-<span>{elem[1]}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default API;
