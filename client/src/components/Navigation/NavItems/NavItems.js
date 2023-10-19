import React from "react";
import classes from "./NavItems.module.css";
import NavItem from "./NavItem/NavItem";
import { NavLink } from "react-router-dom";
import Logo from "../../UI/Logo/Logo";

const navItems = (props) => (
  <div className={classes.Desktop}>
    <NavLink to="/home" className={classes.LogoWrapper}>
      <div className={classes.Logo}>
        <Logo />
      </div>
    </NavLink>
    <ul className={classes.NavItems}>
      <NavItem link="/home" myClass="LogoName" exact>
        CaringVegan
      </NavItem>
      <NavItem link="/shop" exact>
        Shop
      </NavItem>
      {props.isAuthenticated != null ? (
        <NavItem link="/profile">Profile</NavItem>
      ) : null}
      {props.isAuthenticated != null ? (
        <NavItem link="/orders">Orders</NavItem>
      ) : null}
      <NavItem link="/cart">
        <span
          className={[
            "fa",
            classes.fa,
            "fa-shopping-cart",
            classes.inline,
          ].join(" ")}
        />
        {props.totalItems ? (
          <p className={classes.inline}>({props.totalItems})</p>
        ) : null}
      </NavItem>
      {!props.isAuthenticated ? (
        <>
          <NavItem link="/login">Sign in</NavItem>
          <NavItem link="/register">Sign up</NavItem>
        </>
      ) : (
        <div className={classes.NavItem}>
          <a href="/api/logout">Logout</a>
        </div>
      )}
    </ul>
  </div>
);

export default navItems;
