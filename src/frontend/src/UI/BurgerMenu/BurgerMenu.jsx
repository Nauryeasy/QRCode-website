import React from "react";
import classes from "./BurgerMenu.module.css";
import "./Burger.css";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";

const BurgerMenu = ({ navbar, menuOpen, setMenuOpen, onMenuItemClick }) => {
    return (
        <div className={classes.burgerWrapper}>
            <Menu
                onClose={() => setMenuOpen(false)}
                onOpen={() => setMenuOpen(true)}
                isOpen={menuOpen}
                right
                overlayClassName="bm-custom-overlay">
                <ul className={classes.burgerNavbarList}>
                    {/* Разворачивание пунктов меню */}
                    {navbar.map((elem) => (
                        <li
                            key={elem.title}
                            onClick={onMenuItemClick}
                            className={classes.burgerNavbarItem}>
                            <NavLink to={elem.link}>{elem.title}</NavLink>
                        </li>
                    ))}
                </ul>
            </Menu>
        </div>
    );
};

export default BurgerMenu;
