import React, { useState } from "react";
import { ImageUploader } from "../../UI/ImageUploader/ImageUploader";
import classes from "./QRChecker.module.css";
import { NotificationManager } from "react-notifications";
import axios from "axios";
const QRChecker = () => {
    const [images, setImages] = useState([]);
    function onOk(res) {
        NotificationManager.success("Запросы был отправлен", "Успех");
        console.log(res);
    }
    function onError(err) {
        NotificationManager.error(String(err), "Ошибка");
        console.log(err);
    }
    function onAcceptImage() {
        console.log(images);
        const formData = new FormData();
        formData.append("image", images[0].data_url);
        axios
            .post(process.env.REACT_APP_QR_SEND_ADDRESS, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
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
                onImageOk={onAcceptImage}></ImageUploader>
        </div>
    );
};

export default QRChecker;
