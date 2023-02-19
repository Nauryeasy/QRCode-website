import React, { useContext, useEffect, useState } from "react";
import { ImageUploader } from "../../UI/ImageUploader/ImageUploader";
import classes from "./QRChecker.module.css";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { isLoadingContext } from "../../context";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "../../UI/LoadingScreen/LoadingScreen";
const QRChecker = () => {
    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    function onOk(res) {
        axios
            .post(
                process.env.REACT_APP_URL_SEND_ADDRESS,
                {
                    url: res.data.url,
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
                    return NotificationManager.error(
                        "Пустой ответ ¯_(ツ)_/¯",
                        "Ошибка",
                    );
                const statistic = res.data.statistic;
                const reviews = res.data.reviews;
                const count_reviews = res.data.count_reviews;
                navigate(
                    "/URLResult?statistic=" +
                        JSON.parse(statistic) +
                        "&reviews=" +
                        JSON.parse(reviews) +
                        "&count_reviews=" +
                        JSON.parse(count_reviews),
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
        navigate("/home");
        NotificationManager.error(String(err), "Ошибка");
        console.log(err);
    }
    function onAcceptImage() {
        console.log(images);
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
