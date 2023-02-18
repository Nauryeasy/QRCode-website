import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";

// navbar: [
//     {title: '...', link: './...'},
//     {title: '...', link: './...'},
//     ...
// ]

const Header = ({ navbar }) => {
    return (
        <div className={classes.header}>
            <div className={classes.container}>
                <ul className={classes.navbarList}>
                    {navbar.map((elem) => (
                        <li key={elem.title} className={classes.navbarItem}>
                            <NavLink to={elem.link}>{elem.title}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Header;
