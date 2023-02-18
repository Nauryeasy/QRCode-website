import React, { useState } from "react";
import { ImageUploader } from "../../UI/ImageUploader/ImageUploader";
import classes from "./QRChecker.module.css";

const QRChecker = () => {
    const [images, setImages] = useState([]);
    return (
        <div className={classes.wrapper}>
            <ImageUploader
                images={images}
                setImages={setImages}
                onImageOk={() => console.log("asd")}></ImageUploader>
        </div>
    );
};

export default QRChecker;
