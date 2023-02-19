import React, { useEffect } from "react";
import classes from "./SendReviewPanel.module.css";
import { NotificationManager } from "react-notifications";
import { postReview } from "../../utils/http";

const SendReviewPanel = ({ url, StatesSendReviewPanel }) => {
    const {
        email,
        setEmail,
        text,
        setText,
        isValidEmail,
        setIsValidEmail,
        reviewsState,
        setReviewsState,
    } = StatesSendReviewPanel;
    

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

    function onOk(res) {
        setReviewsState([...reviewsState, { email: email, comment: text }]);
        setText("");
        setEmail("");
        NotificationManager.success("Ваш отзыв был добавлен", "Успех");
    }

    function onError(err) {
        NotificationManager.error('Что-то пошло не так', "Ошибка");
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
        postReview(url, email, text, onOk, onError);
    }

    function checkIsValidEmail(email) {
        const expression = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
        const regex = new RegExp(expression);

        if (email.match(regex)) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <div className={classes.sendOurReviewWrapper}>
            <div className={classes.ourReviewTitle}>Оставьте свой отзыв:</div>

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
                    onChange={(e) => setText(e.target.value)}></textarea>
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
    );
};

export default SendReviewPanel;
