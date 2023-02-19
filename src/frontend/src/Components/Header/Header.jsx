import React, { useState } from "react";
import classes from "./Header.module.css";
import Navbar from "../../UI/Navbar/Navbar";
import BurgerMenu from "../../UI/BurgerMenu/BurgerMenu";

// Хедер
const Header = ({ navbar, onChange, setIsLoading }) => {
    // Стейт открытости меню с бургером для мобильной версии
    const [menuOpen, setMenuOpen] = useState(false);

    // При нажатии на элемент внутри меню
    function onMenuItemClick() {
        setMenuOpen(false);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <div className={classes.header}>
            {/* Навбар десктопной версии */}
            <div className={classes.container}>
                <Navbar navbar={navbar} />
            </div>
            {/* Меню мобильной версии */}
            <BurgerMenu
                navbar={navbar}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
                onMenuItemClick={onMenuItemClick}
            />
        </div>
    );
};

export default Header;
