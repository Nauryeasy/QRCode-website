import React from "react";
import classes from "./Navbar.module.css";
import logo from "../../assets/img/logo/logoColor.svg";
import { NavLink } from "react-router-dom";

const Navbar = ({ navbar }) => {
    return (
        <ul className={classes.navbarList}>
            <li className={classes.navbarItem + " " + classes.navbarLogo}>
                <NavLink to="./main">
                    <img src={logo} alt="" />
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
    );
};

export default Navbar;
