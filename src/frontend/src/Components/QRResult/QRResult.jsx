import React from "react";
import { useParams } from "react-router-dom";
import classes from "./QRResult.module.css";

const QRResult = () => {
    const params = new URLSearchParams(document.location.search);
    const url = JSON.parse(params.get("url"));
    const statistic = JSON.parse(params.get("statistic"));
    const reviews = JSON.parse(params.get("reviews"));
    const count_reviews = JSON.parse(params.get("count_reviews"));
};

export default QRResult;
