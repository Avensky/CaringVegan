import React from "react";
import classes from "./Navigate.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Navigate = (props) => {
  return (
    <div className={classes.NavigateWrapper}>
      <NavLink to={props.to} className={classes.left}>
        <span className={classes.back}>
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </span>
        <span className={classes.back}>{"Products"}</span>
      </NavLink>
      <div className={classes.right}>
        {props.id ? <span className={classes.id}>{props.id}</span> : null}
      </div>
    </div>
  );
};

Navigate.propTypes = {
  id: PropTypes.string,
  to: PropTypes.string,
};

export default Navigate;
