import React from "react";
import { Link } from "react-router-dom";
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
                        <li className={classes.navbarItem}>
                            <Link key={elem.title} to={elem.link}>{elem.title}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Header;
