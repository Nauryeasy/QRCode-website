import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
import logo from "../../assets/img/logo/logoColor.svg";
import { slide as Menu } from "react-burger-menu";
import "./Burger.css";
// navbar: [
//     {title: '...', link: './...'},
//     {title: '...', link: './...'},
//     ...
// ]

const Header = ({ navbar, onChange, setIsLoading }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className={classes.header}>
            <div className={classes.container}>
                <ul className={classes.navbarList}>
                    <li
                        className={
                            classes.navbarItem + " " + classes.navbarLogo
                        }>
                        <NavLink to="./main">
                            <img src={logo} />
                        </NavLink>
                    </li>
                    {navbar.map((elem) => (
                        <li
                            key={elem.title}
                            onClick={() => {
                                window.scrollTo({
                                    top: 0,
                                    behavior: "smooth",
                                });
                            }}
                            className={classes.navbarItem}>
                            <NavLink to={elem.link}>{elem.title}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={classes.burgerWrapper}>
                <Menu
                    onClose={() => setMenuOpen(false)}
                    onOpen={() => setMenuOpen(true)}
                    isOpen={menuOpen}
                    right
                    overlayClassName="bm-custom-overlay">
                    <ul className={classes.burgerNavbarList}>
                        {navbar.map((elem) => (
                            <li
                                key={elem.title}
                                onClick={() => {
                                    setMenuOpen(false);
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    });
                                }}
                                className={classes.burgerNavbarItem}>
                                <NavLink to={elem.link}>{elem.title}</NavLink>
                            </li>
                        ))}
                    </ul>
                </Menu>
            </div>
        </div>
    );
};

export default Header;
