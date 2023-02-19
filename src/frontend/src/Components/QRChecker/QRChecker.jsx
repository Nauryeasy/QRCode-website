import React, { useState } from "react";
import { ImageUploader } from "../../UI/ImageUploader/ImageUploader";
import classes from "./QRChecker.module.css";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../UI/LoadingScreen/LoadingScreen";
import { postQR, postUrl } from "../../utils/http";

// Страница с загрузкой QR-кода
const QRChecker = () => {
    const navigate = useNavigate();
    // Массив с загруженными изображениями (но поддерживается загрузка только 1 фото)
    const [images, setImages] = useState([]);
    // Экран загрузки
    const [isLoading, setIsLoading] = useState(false);

    // При успешном принятии анализа URL
    function onGetUrlOk(res, url) {
        setIsLoading(false);
        if (!res.data)
            return NotificationManager.error("Пустой ответ", "Ошибка");

        // Данные анализа
        const statistic = res.data.statistic;
        const reviews = res.data.reviews;
        const count_reviews = res.data.count_reviews;
        const file = images[0].data_url;
        
        // Перекинуть пользователя на страницу, где показываются результаты анализа
        navigate(
            "/URLResult?statistic=" +
                JSON.stringify(statistic) +
                "&reviews=" +
                JSON.stringify(reviews) +
                "&count_reviews=" +
                JSON.stringify(count_reviews) +
                "&url=" +
                JSON.stringify(url) +
                "&image=" +
                JSON.stringify(file),
        );
    }

    // При успешной расшифровке QR-кода
    function onOk(res) {
        const url = res.data.url;
        postUrl(url, onGetUrlOk, onError);
    }

    // При любой ошибке во время отправления запроса
    function onError(err) {
        setIsLoading(false);
        NotificationManager.error(String(err), "Ошибка");
    }
    
    // При нажатии на кнопку "Отправить"
    function onSendImage() {
        const file = images[0].data_url;
        setIsLoading(true);
        postQR(file, onOk, onError)
    }

    return (
        <div className={classes.wrapper}>
            <ImageUploader
                images={images}
                setImages={setImages}
                onImageOk={onSendImage}
                className={classes.imageUploader}></ImageUploader>
            {isLoading && <LoadingScreen></LoadingScreen>}
        </div>
    );
};

export default QRChecker;
