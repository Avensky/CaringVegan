import React from "react";
import classes from "./Navbar.module.css";
import Logo from "../../UI/Logo/Logo";
//import SidebarToggle from '../Sidebar/SidebarToggle/SidebarToggle';
import { NavLink } from "react-router-dom";
import NavItem from "./NavItem/NavItem";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import CartBar from '../CartBar/CartBar';

const Navbar = (props) => {
  // const linkDisabled = (e) => { e.preventDefault(); };

  return (
    <div className={classes.dropdown}>
      <div className={classes.NavbarWrapper}>
        {/* Mobile Sidebar */}
        <div className={[classes.Navbar, classes.Mobile].join(" ")}>
          <div className={classes.NavItems}>
            <FontAwesomeIcon
              icon="fa-solid fa-bars"
              onClick={props.sidebarToggleClicked}
              className={classes.Bars}
            >
              Bars
            </FontAwesomeIcon>
          </div>
          <div className={classes.NavItems} onClick={props.closeCartbar}>
            <NavLink to="/shop" exact="true" className={classes.LogoWrapper}>
              <Logo height="80%" />
              <div className={classes.LogoText}>AVENSKY</div>
            </NavLink>
          </div>
          <div className={classes.NavItems}>
            {!props.user ? (
              <NavItem
                to="/login"
                exact="true"
                className="mobile-login"
                onClick={props.closeCartbar}
              >
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </NavItem>
            ) : (
              <div className={classes.NavItemWrapper} onClick={props.logout}>
                <div className={[classes.NavItem, "mobile-logout"].join(" ")}>
                  LOGOUT
                </div>
              </div>
            )}

            <div className={classes.Cart} onClick={props.cartbarToggleClicked}>
              <div className={classes.TotalItems}>
                {props.totalItems > 0 ? props.totalItems : null}
              </div>
              <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
            </div>
          </div>
        </div>
        {/* Desktop Navbar */}
        <div className={[classes.Navbar, classes.Desktop].join(" ")}>
          <div className={classes.NavItems} onClick={props.closeCartbar}>
            <FontAwesomeIcon
              icon="fa-solid fa-bars"
              onClick={props.sidebarToggleClicked}
              className={classes.Bars}
            />
            <NavLink to="/home" exact="true">
              <div className={classes.LogoWrapper}>
                <Logo height="80%" />
                <div className={classes.LogoText}>AVENSKY</div>
              </div>
            </NavLink>
            <div className={classes.dropdownButton}>
              <NavLink
                to="/shop"
                exact="true"
                onClick={props.closeCartbar}
                className={(navData) =>
                  navData.isActive
                    ? [classes.active, classes.dropdownLink].join(" ")
                    : classes.dropdownLink
                }
              >
                Shop
              </NavLink>
            </div>

            {/*
                        <NavItem to="/about"    exact='true' onClick={props.closeCartbar}>About</NavItem>
                        <NavItem to="/recipes"  exact='true' onClick={props.closeCartbar}>Recipes</NavItem> 
                        */}
          </div>
          <div className={classes.NavItems}>
            {/* <NavItem to="/support" exact='true' onClick={props.closeCartbar}>Support</NavItem>
                        {props.user != null 
                            ? <NavItem to="/profile">Profile</NavItem> 
                            : null} */}
            {!props.user ? (
              <NavItem
                to="/login"
                exact="true"
                className="desktop-login"
                onClick={props.closeCartbar}
              >
                <FontAwesomeIcon icon="fa-solid fa-user" />
              </NavItem>
            ) : (
              <div className={classes.NavItemWrapper} onClick={props.logout}>
                <div className={[classes.NavItem, "desktop-logout"].join(" ")}>
                  LOGOUT
                </div>
              </div>
            )}
            {/*                 
                        <NavItem to="/search" exact='true' onClick={props.closeCartbar}>
                            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
                        </NavItem> */}

            <NavItem
              exact="true"
              onClick={props.cartbarToggleClicked}
              className={["none cart"].join(" ")}
            >
              <div className={classes.TotalItems}>
                {props.totalItems > 0 ? props.totalItems : null}
              </div>
              <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
            </NavItem>
          </div>
        </div>
      </div>
      <div className={classes.dropdownContent}></div>
    </div>
  );
};

Navbar.propTypes = {
  sidebarToggleClicked: PropTypes.func,
  cartbarToggleClicked: PropTypes.func,
  closeCartbar: PropTypes.func,
  user: PropTypes.any,
  totalItems: PropTypes.number,
  logout: PropTypes.func,
  cart: PropTypes.array,
  checkout: PropTypes.func,
};

export default Navbar;
