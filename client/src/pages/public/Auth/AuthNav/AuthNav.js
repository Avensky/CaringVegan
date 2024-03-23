import React from "react";
import classes from "./AuthNav.module.css";
import { NavLink } from "react-router-dom";
import PropStyles from "prop-types";

const AuthNav = (props) => {
  let unselected, login, register;

  // selected = [classes.AuthToggle, classes.AuthSelected].join(' ');
  unselected = classes.AuthToggle;
  // console.log('props style',props.style );
  const k = props.style;
  switch (k) {
    case "signup":
      {
        register = [classes.AuthToggle, classes.AuthSelected].join(" ");
        login = unselected;
      }
      break;
    case "login":
      {
        register = unselected;
        login = [classes.AuthToggle, classes.AuthSelected].join(" ");
      }
      break;
    case "forgot-password":
      {
        register = unselected;
        login = [classes.AuthToggle, classes.AuthSelected].join(" ");
      }
      break;
    default: {
      register = unselected;
      login = unselected;
    }
  }
  return (
    <div className={classes.AuthNav}>
      <NavLink to="/login" className={login}>
        <h1 className="pointer">
          <span className="fa fa-sign-in pointer" /> LOGIN
        </h1>
      </NavLink>
      <NavLink to="/signup" className={register}>
        <h1 className="pointer">
          <span className="fa fa-user" /> REGISTER
        </h1>
      </NavLink>
    </div>
  );
};

AuthNav.propTypes = {
  style: PropStyles.string,
};

export default AuthNav;
