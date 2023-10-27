import React from "react";
import classes from "./Footer.module.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const Footer = () => {
  return (
    <div className={classes.FooterWrapper}>
      <div className={classes.Footer}>
        <div className={classes.bio}>
          <h3>About Me</h3>
          <p className="grey-text text-lighten-4">
            Hello! I am a self driven developer with a passion for problem
            solving and software development. Feel free to contact me regarding
            any questions you may have about me or any projects I can help out
            with.
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
              <a
                className="white-text"
                href="https://www.youtube.com/channel/UCyyo9pq7jcUaXzF7FngMqkg"
              >
                <span className="fa fa-youtube" />
              </a>
            </li>
            <li>
              <a
                className="white-text"
                href="https://www.youtube.com/channel/UCyyo9pq7jcUaXzF7FngMqkg"
              >
                <span className="fa fa-youtube" />
              </a>
            </li>
            <li>
              <a
                className="white-text"
                href="https://www.youtube.com/channel/UCyyo9pq7jcUaXzF7FngMqkg"
              >
                <span className="fa fa-youtube" />
              </a>
            </li>
            <li>
              <a
                className="white-text"
                href="https://www.youtube.com/channel/UCyyo9pq7jcUaXzF7FngMqkg"
              >
                <span className="fa fa-youtube" />
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
      <div className={classes.Legal}>
        <p>
          {"©2023 caringvegan.com | "}
          <a href="/privacy">Privacy Policy</a>
          {" | "}
          <a href="/terms">Terms of Service</a>
        </p>
      </div>
    </div>
  );
};

Footer.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLogged: PropTypes.bool,
};
export default Footer;
