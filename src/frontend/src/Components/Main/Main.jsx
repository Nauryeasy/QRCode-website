import React, { useContext, useEffect } from "react";
import { isLoadingContext } from "../../context";
import classes from "./Main.module.css";
import qrcodeimg from "../../assets/img/qrcode.png";
import { Link } from "react-router-dom";
const Main = () => {
    return (
        <div className={classes.wrapper}>
            <div>
                <p>
                    URLChecker - инструмент, который поможет определить
                    небезопасные сайты.
                </p>
                <img src="https://img.freepik.com/free-vector/cute-hacker-operating-laptop-cartoon-vector-icon-illustration-people-technology-icon-isolated-flat_138676-7079.jpg?w=2000" />
            </div>
            <div>
                <img src="https://soldimarketing.ru/upload/article/url-kak-sozdat-pravilnyy-adres/url%20saita.jpg"></img>
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
                <img src={qrcodeimg} />
            </div>
            <div>
                <img src="https://media.istockphoto.com/id/1154463857/ru/%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F/%D0%BD%D0%B0%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BA%D0%B8-%D0%B3%D0%B0%D0%B5%D1%87%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BA%D0%BB%D1%8E%D1%87%D0%B0-%D0%BD%D0%B0%D0%B1%D1%80%D0%BE%D1%81%D0%BA%D0%B8-%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%B2-%D0%BD%D0%B5%D0%BE%D0%BD%D0%BE%D0%B2%D0%BE%D0%BC-%D1%81%D1%82%D0%B8%D0%BB%D0%B5-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D1%8B-%D0%B8%D0%BB%D0%BB%D1%8E%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D0%B8-%D1%80%D0%B5%D0%BC%D0%BE%D0%BD%D1%82%D0%B0.jpg?s=612x612&w=0&k=20&c=Om8zEjy2hGyIUHkintGrtR7XqsBVuKMb_YIonebNCSg=" />
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
