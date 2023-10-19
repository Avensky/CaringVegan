import React from "react";
import { NavLink } from "react-router-dom";
import myClasses from "./NavItem.module.css";
// import classes from '../../../pages/Pages.module.scss';

const navigationItem = (props) => (
  <li className={myClasses.NavItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={myClasses.active}
      className={props.myClass}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
