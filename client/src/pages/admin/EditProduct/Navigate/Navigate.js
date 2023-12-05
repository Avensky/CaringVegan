import React from "react";
import classes from "./Navigate.module.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Navigate = (props) => {
  return (
    <div className={classes.NavigateWrapper}>
      <NavLink to="/stripe-catalog" className={classes.left}>
        <span className={classes.back}>
          <FontAwesomeIcon icon="fa-solid fa-arrow-left" />
        </span>
        <span className={classes.back}>{"Products"}</span>
      </NavLink>
      <div className={classes.right}>
        {props.item ? (
          <span className={classes.id}>{props.item.id}</span>
        ) : null}
      </div>
    </div>
  );
};

Navigate.propTypes = {
  item: PropTypes.object,
};

export default Navigate;
