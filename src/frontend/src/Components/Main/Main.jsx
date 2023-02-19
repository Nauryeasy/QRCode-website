import React from "react";
import classes from "./Main.module.css";
import { Link } from "react-router-dom";

import main1 from "../../assets/img/main/main1.png";
import main2 from "../../assets/img/main/main2.png";
import main3 from "../../assets/img/main/main3.png";
import main4 from "../../assets/img/main/main4.png";

// Главная страница
const Main = () => {
    return (
        <div className={classes.wrapper}>
            <div>
                <p>
                    URLChecker - инструмент, который поможет определить
                    небезопасные сайты.
                </p>
                <img src={main1} alt="" />
            </div>
            <div>
                <img src={main2} alt="" />
                <p>
                    В два клика можно провести анализ какого-то URL и получить
                    результаты.
                </p>
            </div>
            <div>
                <p>
                    Также если URL зашифрован в QR-коде, его можно легко
                    расшифровать.
                </p>
                <img src={main3} alt="" />
            </div>
            <div>
                <img src={main4} alt="" />
                <p>
                    А доступное API позволит другим разработчикам использовать
                    инструментарий нашего сервиса у себя в проектах.
                </p>
            </div>
            <Link
                to="/checkURL"
                className={classes.letsgo}
                onClick={() => {
                    window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    });
                }}>
                Попробуйте сами!
            </Link>
        </div>
    );
};

export default Main;
