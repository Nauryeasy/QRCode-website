import React, { useState } from "react";
import { ImageUploader } from "../../UI/ImageUploader/ImageUploader";
import classes from "./QRChecker.module.css";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../UI/LoadingScreen/LoadingScreen";
const QRChecker = () => {
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    function onOk(res) {
        const url = res.data.url;
        axios
            .post(
                process.env.REACT_APP_URL_SEND_ADDRESS,
                {
                    url: url,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                },
            )
            .then((res) => {
                setIsLoading(false);
                if (!res.data)
                    return NotificationManager.error("Пустой ответ", "Ошибка");
                console.log(url);
                const statistic = res.data.statistic;
                const reviews = res.data.reviews;
                const count_reviews = res.data.count_reviews;
                const file = images[0].data_url;
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
                        JSON.stringify(file)
                );
            })
            .catch((error) => {
                onError(error);
            });
        // {
        //     "url": "Ссылка"
        //   }
    }
    function onError(err) {
        setIsLoading(false);
        NotificationManager.error(String(err), "Ошибка");
    }
    function onAcceptImage() {
        const file = images[0].data_url;
        setIsLoading(true);
        axios
            .post(
                process.env.REACT_APP_QR_SEND_ADDRESS,
                {
                    image: file,
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

    return (
        <div className={classes.wrapper}>
            <ImageUploader
                images={images}
                setImages={setImages}
                onImageOk={onAcceptImage}
                className={classes.imageUploader}></ImageUploader>
            {isLoading && <LoadingScreen></LoadingScreen>}
        </div>
    );
};

export default QRChecker;
