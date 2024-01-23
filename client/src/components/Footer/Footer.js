import React from "react";
import classes from "./Footer.module.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  return (
    <div className={classes.FooterWrapper}>
      <div className={classes.Footer}>
        <div className={classes.bio}>
          <h3>About Us</h3>
          <p className="grey-text text-lighten-4">
            Welcome to project Caring Vegan. Our mission is to spread awereness
            about cruelty free products and reducing the human impact on our
            planet.
          </p>
        </div>
        <div className={classes.connect}>
          {/* <h3 className="white-text">Categories</h3> */}
          <div className={classes.NavLinks}>
            <div className={classes.NavLinkWrapper}>
              <NavLink to="/home" className={classes.NavLink} exact="true">
                SUPPORT
              </NavLink>
              <div className={classes.NavLinkDrawer}>+</div>
            </div>
            <div className={classes.NavLinkWrapper}>
              <NavLink to="/home" className={classes.NavLink} exact="true">
                OFFERS
              </NavLink>
              <div className={classes.NavLinkDrawer}>+</div>
            </div>
            <div className={classes.NavLinkWrapper}>
              <NavLink to="/home" className={classes.NavLink} exact="true">
                ABOUT US
              </NavLink>
              <div className={classes.NavLinkDrawer}>+</div>
            </div>
          </div>
        </div>
        <div className={classes.projects}>
          <h3 className="white-text">FOLLOW US</h3>
          <div className={classes.Social}>
            <li>
              <a className="white-text">
                <FontAwesomeIcon icon="fa-brands fa-facebook" />
              </a>
            </li>
            <li>
              <a className="white-text">
                <FontAwesomeIcon icon="fa-brands fa-instagram" />
              </a>
            </li>
            <li>
              <a className="white-text">
                <FontAwesomeIcon icon="fa-brands fa-tiktok" />
              </a>
            </li>
            <li>
              <a className="white-text">
                <FontAwesomeIcon icon="fa-brands fa-youtube" />
              </a>
            </li>
          </div>
          <ul className={classes.Contact}>
            <li>
              <span className="fa fa-envelope" />
              support@avensky.com
            </li>
            <li>
              <span className="fa fa-map-pin" />
              San Diego, California, United States of America.
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.legalWrapper}>
        <div className={classes.legal}>
          {"©2023 caringvegan.com | "}
          <a>Privacy Policy</a>
          {" | "}
          <a>Terms of Service</a>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLogged: PropTypes.bool,
};
export default Footer;
