import React from "react";
import ImageUploading from "react-images-uploading";
import classes from "./ImageUploader.module.css";
export function ImageUploader({ images, setImages, onImageOk }) {
    const maxNumber = 69;

    const onChange = (imageList, addUpdateIndex) => {
        setImages(imageList);
    };

    return (
        <div className={classes.wrapper}>
            <ImageUploading
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url">
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                }) => (
                    // write your building UI
                    <>
                        {imageList.length === 0 ? (
                            <button
                                onClick={onImageUpload}
                                className={classes.add}
                                {...dragProps}>
                                {isDragging ? (
                                    <span>Отпустите</span>
                                ) : (
                                    <span className={classes.text}>
                                        Перетащите фото с QR-кодом в эту область
                                        или нажмите на нее, чтобы выбрать
                                        самостоятельно
                                    </span>
                                )}
                            </button>
                        ) : null}
                        {imageList.map((image, index) => (
                            <div key={index} className={classes.imageWrapper}>
                                <img
                                    src={image["data_url"]}
                                    alt=""
                                    className={classes.image}
                                />
                                <div className={classes.imageButtonsWrapper}>
                                    <button
                                        className={classes.imageUpdate}
                                        onClick={() => onImageUpdate(index)}>
                                        Обновить
                                    </button>
                                    <button
                                        className={classes.imageRemove}
                                        onClick={() => onImageRemove(index)}>
                                        Удалить
                                    </button>
                                    <button
                                        className={classes.imageOk}
                                        onClick={() => {
                                            onImageOk();
                                            onImageRemove(index);
                                        }}>
                                        Проверить
                                    </button>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </ImageUploading>
        </div>
    );
}
